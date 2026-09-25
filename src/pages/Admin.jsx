import React, { useMemo } from "react";
import { BarChart3, Boxes, DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";

export default function Admin() {
  const { orders } = useApp();
  const sales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const orderItems = orders.reduce((sum, order) => sum + order.items.reduce((n, item) => n + item.quantity, 0), 0);
  const averageOrder = orders.length ? sales / orders.length : 0;
  const topProducts = useMemo(() => {
    const counts = new Map();
    orders.forEach((order) => order.items.forEach((item) => counts.set(item.title, (counts.get(item.title) || 0) + item.quantity)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [orders]);

  const stats = [
    [DollarSign, "Demo sales", `₹${Math.round(sales).toLocaleString("en-IN")}`],
    [ShoppingCart, "Orders", orders.length],
    [Users, "Demo customers", new Set(orders.map((o) => o.customer?.email).filter(Boolean)).size],
    [Boxes, "Catalog products", products.length],
  ];

  return (
    <section className="container section">
      <div className="page-heading"><div><span className="eyebrow">FINAL-YEAR PROJECT</span><h1>ShopSphere Dashboard</h1><p>Interactive admin analytics powered by your local demo orders.</p></div></div>
      <div className="stats">{stats.map(([Icon, label, value]) => <div key={label}><Icon/><small>{label}</small><b>{value}</b></div>)}</div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="card-head"><div><h2>Project metrics</h2><small className="muted">Live from browser localStorage</small></div><TrendingUp/></div>
          <div className="metric-list">
            <div><span>Items sold</span><b>{orderItems}</b></div>
            <div><span>Average order value</span><b>₹{Math.round(averageOrder).toLocaleString("en-IN")}</b></div>
            <div><span>Catalog categories</span><b>{new Set(products.map((p) => p.category)).size}</b></div>
            <div><span>Wishlist-ready products</span><b>{products.filter((p) => p.stock > 0).length}</b></div>
          </div>
        </div>

        <div className="recent">
          <div className="card-head"><h2>Top purchased</h2><BarChart3/></div>
          {topProducts.length ? topProducts.map(([name, count]) => <div className="recent-row" key={name}><span title={name}>{name.slice(0, 25)}</span><b>{count} item{count === 1 ? "" : "s"}</b></div>) : <p className="muted">Place a demo order to populate analytics.</p>}
        </div>
      </div>

      <div className="recent recent-orders-card">
        <div className="card-head"><h2>Recent orders</h2><ShoppingCart/></div>
        {orders.slice(0, 6).map((order) => <div className="recent-row" key={order.id}><span>{order.id}</span><span>{order.customer?.name || "Guest"}</span><b>₹{Math.round(order.total).toLocaleString("en-IN")}</b><span className="status">{order.status}</span></div>)}
        {!orders.length && <p className="muted">Your newly placed demo orders will appear here.</p>}
      </div>
    </section>
  );
}
