import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { items, shippingMethod } = await req.json();

    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey || apiKey === 'sk_test_placeholder') {
      return NextResponse.json(
        { error: 'Stripe non è ancora configurato con una chiave segreta valida.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: '2026-08-26.dahlia',
    });

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Nessun articolo nel carrello.' }, { status: 400 });
    }

    // Live Supabase stock verification & quantity capping
    const validatedLineItems = [];
    let subtotalCents = 0;

    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity, is_visible')
        .eq('id', item.id)
        .single();

      const availableStock = product?.stock_quantity ?? 0;

      if (!product || !product.is_visible || availableStock <= 0) {
        return NextResponse.json(
          { error: `Il capo "${item.name}" non è più disponibile in magazzino.` },
          { status: 400 }
        );
      }

      // Cap quantity to available stock
      const cappedQuantity = Math.min(item.quantity, availableStock);
      const unitAmount = Math.round(item.price * 100);
      subtotalCents += unitAmount * cappedQuantity;

      validatedLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name + (item.selectedSize ? ` (Taglia: ${item.selectedSize})` : ''),
            images: item.image ? [item.image] : [],
            metadata: {
              tagId: item.tagId,
              id: item.id,
            },
          },
          unit_amount: unitAmount,
        },
        quantity: cappedQuantity,
      });
    }

    // Server-side shipping calculation rules
    if (subtotalCents < 15000) { // Under 150,00 €
      const isPickup = shippingMethod === 'pickup';
      const shippingCostCents = isPickup ? 400 : 700; // 4.00 € vs 7.00 €
      const shippingLabel = isPickup 
        ? 'Consegna a Mano (Cosenza e dintorni ≤15km)' 
        : 'Spedizione Standard Espresso (24/48h)';

      validatedLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Spedizione: ${shippingLabel}`,
          },
          unit_amount: shippingCostCents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: validatedLineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
