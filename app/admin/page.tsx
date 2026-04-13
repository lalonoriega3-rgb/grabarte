"use client";

import { useState, useEffect, useCallback } from "react";
import { Order } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  in_progress: "En producción",
  shipped: "Enviado",
  delivered: "Entregado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300",
  paid: "bg-blue-500/20 text-blue-300",
  in_progress: "bg-purple-500/20 text-purple-300",
  shipped: "bg-orange-500/20 text-orange-300",
  delivered: "bg-green-500/20 text-green-300",
};

const STATUS_FLOW = ["pending", "paid", "in_progress", "shipped", "delivered"];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error("Error al cargar pedidos");
      const data = await res.json();
      setOrders(data.orders);
    } catch {
      setError("No se pudieron cargar los pedidos");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated, fetchOrders]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) setAuthenticated(true);
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ orderId, status }),
      });
      if (!res.ok) throw new Error("Error");
      await fetchOrders();
    } catch {
      alert("Error al actualizar el pedido");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-sm space-y-6">
          <h1 className="text-white text-xl font-bold text-center">
            Panel de Administración
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-[#0a0a0a] border border-[#3a3a3a] text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">
            Panel de Pedidos
          </h1>
          <button
            onClick={fetchOrders}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#222] transition-colors"
          >
            Actualizar
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-gray-400 text-center py-20">
            Cargando pedidos...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-gray-400 text-center py-20">
            No hay pedidos todavía.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white font-semibold">
                        #{String(order.id).padStart(4, "0")}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          STATUS_COLORS[order.status] || "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(order.created_at).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {order.customer_name && (
                        <p className="text-gray-300 text-sm">{order.customer_name}</p>
                      )}
                      {order.customer_email && (
                        <p className="text-gray-500 text-sm">{order.customer_email}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      ${(order.total_amount / 100).toFixed(0)} MXN
                    </p>
                    {order.shipping_cost > 0 ? (
                      <p className="text-gray-500 text-xs">
                        Envío: ${(order.shipping_cost / 100).toFixed(0)} MXN
                      </p>
                    ) : (
                      <p className="text-green-400 text-xs">Envío gratis</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm border-t border-[#2a2a2a] pt-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Detalles</p>
                    <p className="text-gray-300">
                      Cubo de cristal {order.include_base ? "+ Base LED" : ""}
                    </p>
                    {order.custom_text && (
                      <p className="text-gray-400 italic mt-1">
                        &ldquo;{order.custom_text}&rdquo;
                      </p>
                    )}
                  </div>
                  {order.image_url && (
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Imagen</p>
                      <a
                        href={order.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Ver imagen del cliente →
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                      Cambiar estado
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {STATUS_FLOW.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          disabled={order.status === s}
                          className={`text-xs px-2 py-1 rounded-md transition-colors ${
                            order.status === s
                              ? "bg-white/10 text-white/40 cursor-default"
                              : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
