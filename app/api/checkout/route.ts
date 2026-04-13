import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { insertOrder } from "@/lib/db";

const PRICE_CUBO = 900;
const PRICE_BASE = 250;
const PRICE_SHIPPING = 99;
const FREE_SHIPPING_THRESHOLD = 999;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      includeBase,
      customText,
      imageUrl,
    }: {
      includeBase: boolean;
      customText: string;
      imageUrl: string;
    } = body;

    const subtotal = PRICE_CUBO + (includeBase ? PRICE_BASE : 0);
    const shippingCost =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : PRICE_SHIPPING;
    const total = subtotal + shippingCost;

    const lineItems: {
      price: string;
      quantity: number;
    }[] = [
      {
        price: process.env.STRIPE_PRICE_CUBO!,
        quantity: 1,
      },
    ];

    if (includeBase) {
      lineItems.push({
        price: process.env.STRIPE_PRICE_BASE_LED!,
        quantity: 1,
      });
    }

    const origin = req.headers.get("origin") || "https://grabarte.shop";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "oxxo"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["MX"],
      },
      phone_number_collection: { enabled: true },
      ...(shippingCost > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    amount: shippingCost * 100,
                    currency: "mxn",
                  },
                  display_name: "Envío estándar",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 8 },
                  },
                },
              },
            ],
          }
        : {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 0, currency: "mxn" },
                  display_name: "Envío gratis",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 8 },
                  },
                },
              },
            ],
          }),
      metadata: {
        custom_text: customText || "",
        image_url: imageUrl || "",
        include_base: String(includeBase),
      },
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#configurador`,
    });

    // Save pending order to DB
    try {
      await insertOrder({
        stripe_session_id: session.id,
        image_url: imageUrl || "",
        custom_text: customText || "",
        include_base: includeBase,
        total_amount: total * 100,
        shipping_cost: shippingCost * 100,
      });
    } catch (dbError) {
      // Non-fatal: log but continue — order is in Stripe
      console.error("DB insert error (non-fatal):", dbError);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Checkout error:", msg);
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
