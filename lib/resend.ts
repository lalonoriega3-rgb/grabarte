import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "placeholder");
  }
  return _resend;
}

interface OrderEmailData {
  customerName?: string;
  customerEmail?: string;
  imageUrl?: string;
  customText?: string;
  includeBase: boolean;
  totalAmount: number;
  shippingCost: number;
  stripeSessionId: string;
  shippingAddress?: Record<string, string>;
}

export async function sendClientConfirmation(order: OrderEmailData) {
  if (!order.customerEmail) return;
  if (!process.env.RESEND_API_KEY) return;

  const total = order.totalAmount / 100;
  const shipping = order.shippingCost > 0 ? `$${order.shippingCost / 100} MXN` : "Gratis";

  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: order.customerEmail,
    subject: "Tu pedido Grabarte está confirmado",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 32px; border-radius: 8px;">
        <h1 style="font-size: 28px; margin-bottom: 8px;">¡Gracias por tu pedido!</h1>
        <p style="color: #aaaaaa;">Tu cubo de cristal personalizado está en camino.</p>

        <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h2 style="font-size: 18px; margin-bottom: 16px;">Resumen de tu pedido</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #aaaaaa;">Cubo de cristal 3D</td>
              <td style="padding: 8px 0; text-align: right;">$900 MXN</td>
            </tr>
            ${order.includeBase ? `<tr><td style="padding: 8px 0; color: #aaaaaa;">Base de madera con luz LED</td><td style="padding: 8px 0; text-align: right;">$250 MXN</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #aaaaaa;">Envío</td>
              <td style="padding: 8px 0; text-align: right;">${shipping}</td>
            </tr>
            <tr style="border-top: 1px solid #333;">
              <td style="padding: 12px 0; font-weight: bold;">Total</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold;">$${total} MXN</td>
            </tr>
          </table>
        </div>

        ${order.customText ? `<p style="color: #aaaaaa;">Texto personalizado: <strong style="color: #ffffff;">"${order.customText}"</strong></p>` : ""}

        <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="font-size: 16px; margin-bottom: 8px;">Tiempo estimado de entrega</h3>
          <p style="color: #aaaaaa; margin: 0;">El 99% de los pedidos salen del taller en 24 horas.<br>Entrega en <strong style="color: #ffffff;">3 a 8 días hábiles</strong>.</p>
        </div>

        <p style="color: #aaaaaa;">¿Tienes preguntas? Escríbenos por <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" style="color: #25D366;">WhatsApp</a>.</p>
        <p style="color: #555555; font-size: 12px; margin-top: 32px;">© 2025 Grabarte. Envíos a toda la República Mexicana.</p>
      </div>
    `,
  });
}

export async function sendTallerNotification(order: OrderEmailData) {
  if (!process.env.RESEND_API_KEY) return;

  const total = order.totalAmount / 100;
  const shipping = order.shippingCost > 0 ? `$${order.shippingCost / 100} MXN` : "Gratis";

  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TALLER_EMAIL!,
    subject: `Nuevo pedido #${order.stripeSessionId.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h1>Nuevo pedido recibido</h1>

        <h2>Datos del cliente</h2>
        <p><strong>Nombre:</strong> ${order.customerName ?? "No disponible"}</p>
        <p><strong>Email:</strong> ${order.customerEmail ?? "No disponible"}</p>
        ${order.shippingAddress ? `<p><strong>Dirección:</strong> ${JSON.stringify(order.shippingAddress)}</p>` : ""}

        <h2>Detalles del pedido</h2>
        <p><strong>Cubo de cristal 3D:</strong> $900 MXN</p>
        ${order.includeBase ? "<p><strong>Base de madera LED:</strong> $250 MXN ✓</p>" : "<p>Sin base LED</p>"}
        <p><strong>Envío:</strong> ${shipping}</p>
        <p><strong>Total:</strong> $${total} MXN</p>

        <h2>Instrucciones de grabado</h2>
        ${order.customText ? `<p><strong>Texto personalizado:</strong> "${order.customText}"</p>` : "<p>Sin texto personalizado</p>"}
        ${order.imageUrl ? `<p><strong>Imagen del cliente:</strong> <a href="${order.imageUrl}">Ver imagen</a></p><br><img src="${order.imageUrl}" style="max-width: 300px;" />` : "<p>Sin imagen</p>"}

        <p style="color: #666; font-size: 12px;">Stripe Session ID: ${order.stripeSessionId}</p>
      </div>
    `,
  });
}
