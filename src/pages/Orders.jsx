import React from "react";
import { PackageCheck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { orders } = useApp();
  return (
    <section className="container section">
      <div className="page-heading"><div><span className="eyebrow">ACCOUNT</span><h1>Your orders</h1><p>Orders are stored locally for this portfolio demo.</p></div><div className="results">{orders.length} orders</div></div>
      {orders.length ? <div className="orders">{orders.map((order) => <article className="order-card" key={order.id}>
        <div className="order-head"><div><b>{order.id}</b><small>{order.date} · {order.customer?.payment || "Demo payment"}</small></div><span className="status">{order.status}</span><strong>₹{Math.round(order.total).toLocaleString("en-IN")}</strong></div>
        <div className="order-customer"><span>Delivering to</span><b>{order.customer?.name || "Guest"}, {order.customer?.city || ""}</b></div>
        <div className="order-products">{order.items.map((item) => <div key={item.id} title={item.title}><img src={item.image} alt={item.title}/><small>×{item.quantity}</small></div>)}</div>
      </article>)}</div> : <div className="empty"><PackageCheck size={46}/><h2>No orders yet</h2><p>Place your first order to see it here.</p><Link className="btn primary" to="/products"><ShoppingBag size={17}/> Start shopping</Link></div>}
    </section>
  );
}
