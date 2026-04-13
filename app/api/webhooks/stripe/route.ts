import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateOrderStatus } from "@/lib/db";
import { sendClientConfirmation, sendTallerNotification } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerData = {
      name: session.customer_details?.name ?? undefined,
      email: session.customer_details?.email ?? undefined,
      phone: session.customer_details?.phone ?? undefined,
      address: session.customer_details?.address
        ? {
            line1: session.customer_details.address.line1 ?? "",
            line2: session.customer_details.address.line2 ?? "",
            city: session.customer_details.address.city ?? "",
            state: session.customer_details.address.state ?? "",
            postal_code: session.customer_details.address.postal_code ?? "",
            country: session.customer_details.address.country ?? "",
          }
        : undefined,
    };

    try {
      await updateOrderStatus(session.id, "paid", customerData);
    } catch (dbError) {
      console.error("DB update error:", dbError);
    }

    const orderData = {
      stripeSessionId: session.id,
      customerName: customerData.name,
      customerEmail: customerData.email,
      imageUrl: session.metadata?.image_url,
      customText: session.metadata?.custom_text,
      includeBase: session.metadata?.include_base === "true",
      totalAmount: session.amount_total ?? 0,
      shippingCost: session.shipping_cost?.amount_total ?? 0,
      shippingAddress: customerData.address,
    };

    await Promise.allSettled([
      sendClientConfirmation(orderData),
      sendTallerNotification(orderData),
    ]);
  }

  return NextResponse.json({ received: true });
}
