import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id requerido" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      metadata: session.metadata ?? {},
    });
  } catch {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }
}
