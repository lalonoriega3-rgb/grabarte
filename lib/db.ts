import { sql } from "@vercel/postgres";

export { sql };

export async function createOrdersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      stripe_session_id TEXT UNIQUE NOT NULL,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      shipping_address JSONB,
      image_url TEXT,
      custom_text TEXT,
      include_base BOOLEAN DEFAULT FALSE,
      total_amount INTEGER NOT NULL,
      shipping_cost INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export interface Order {
  id: number;
  stripe_session_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  shipping_address: Record<string, string> | null;
  image_url: string | null;
  custom_text: string | null;
  include_base: boolean;
  total_amount: number;
  shipping_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function insertOrder(data: {
  stripe_session_id: string;
  image_url: string;
  custom_text: string;
  include_base: boolean;
  total_amount: number;
  shipping_cost: number;
}) {
  await sql`
    INSERT INTO orders (stripe_session_id, image_url, custom_text, include_base, total_amount, shipping_cost, status)
    VALUES (${data.stripe_session_id}, ${data.image_url}, ${data.custom_text}, ${data.include_base}, ${data.total_amount}, ${data.shipping_cost}, 'pending')
    ON CONFLICT (stripe_session_id) DO NOTHING
  `;
}

export async function updateOrderStatus(
  stripeSessionId: string,
  status: string,
  customerData?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: Record<string, string>;
  }
) {
  if (customerData) {
    await sql`
      UPDATE orders
      SET status = ${status},
          customer_name = ${customerData.name ?? null},
          customer_email = ${customerData.email ?? null},
          customer_phone = ${customerData.phone ?? null},
          shipping_address = ${JSON.stringify(customerData.address ?? {})},
          updated_at = NOW()
      WHERE stripe_session_id = ${stripeSessionId}
    `;
  } else {
    await sql`
      UPDATE orders
      SET status = ${status}, updated_at = NOW()
      WHERE stripe_session_id = ${stripeSessionId}
    `;
  }
}

export async function updateOrderStatusById(id: number, status: string) {
  await sql`
    UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${id}
  `;
}

export async function getOrders(): Promise<Order[]> {
  const result = await sql<Order>`
    SELECT * FROM orders ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function getOrderBySessionId(
  sessionId: string
): Promise<Order | null> {
  const result = await sql<Order>`
    SELECT * FROM orders WHERE stripe_session_id = ${sessionId} LIMIT 1
  `;
  return result.rows[0] ?? null;
}
