import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-08-26.dahlia',
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json(
        { error: 'Stripe non è ancora configurato con una chiave segreta valida.' },
        { status: 500 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Nessun articolo nel carrello.' }, { status: 400 });
    }

    // Live Supabase stock verification & quantity capping
    const validatedLineItems = [];

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

      validatedLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
            metadata: {
              tagId: item.tagId,
              id: item.id,
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: cappedQuantity,
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
