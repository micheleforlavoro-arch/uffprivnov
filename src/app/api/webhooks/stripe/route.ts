import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  const apiKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  // Initialize Stripe if API key is present
  const stripe = apiKey ? new Stripe(apiKey, { apiVersion: "2026-08-26.dahlia" }) : null;

  try {
    if (stripe && webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // Direct JSON parsing fallback for local environment / testing
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout payment event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      let itemsToProcess: Array<{ id: string; name: string; quantity: number; tagId?: string }> = [];
      let shippingMethod = session.metadata?.shippingMethod || "standard";
      let shippingCost = parseFloat(session.metadata?.shippingCost || "0");

      // Parse metadata items if passed during checkout session creation
      if (session.metadata?.items) {
        try {
          itemsToProcess = JSON.parse(session.metadata.items);
        } catch (e) {
          console.error("Failed to parse items metadata", e);
        }
      }

      // If Stripe line items are expanded, fall back to line_items API call if available
      if (itemsToProcess.length === 0 && stripe && session.id) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        itemsToProcess = lineItems.data.map((li) => ({
          id: (li.price?.product as string) || li.id,
          name: li.description || "Capo Novum Archive",
          quantity: li.quantity || 1,
        }));
      }

      // SERVER-SIDE STOCK DEDUCTION (Serverless / Database sync)
      for (const item of itemsToProcess) {
        if (!item.id) continue;

        // Fetch current stock
        const { data: product } = await supabase
          .from("products")
          .select("stock_quantity")
          .eq("id", item.id)
          .single();

        if (product) {
          const currentStock = product.stock_quantity ?? 0;
          const updatedStock = Math.max(0, currentStock - item.quantity);

          // Deduct stock in Supabase database
          await supabase
            .from("products")
            .update({ stock_quantity: updatedStock })
            .eq("id", item.id);
        }
      }

      // RECORD ORDER IN SUPABASE "orders" TABLE
      const customerEmail = session.customer_details?.email || session.customer_email || "cliente@novum.store";
      const customerName = session.customer_details?.name || "Cliente Novum";
      const totalAmount = (session.amount_total ?? 0) / 100;

      await supabase.from("orders").insert([
        {
          stripe_session_id: session.id,
          customer_email: customerEmail,
          customer_name: customerName,
          items: itemsToProcess,
          shipping_method: shippingMethod,
          shipping_cost: shippingCost,
          total_amount: totalAmount,
          status: "completed",
        },
      ]);

      console.log(`[Stripe Webhook] Order ${session.id} processed successfully. Stock updated.`);
    } catch (err: any) {
      console.error("[Stripe Webhook Error] Failed to update stock/order:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
