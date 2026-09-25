import React, { useState } from "react";
import { CheckCircle2, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useApp();
  const [done, setDone] = useState(null);
  const [payment, setPayment] = useState("UPI");
  const [form, setForm] = useState({ name: "", address: "", city: "", pin: "", phone: "" });

  if (done) return <div className="container empty"><CheckCircle2 size={60} /><h1>Order placed!</h1><p>Your order <b>{done.id}</b> has been created successfully.</p><p className="muted">Payment method: {payment}</p><Link className="btn primary" to="/orders">View orders</Link></div>;
  if (!cart.length) return <div className="container empty"><h1>No items to checkout</h1><p>Add products to your cart before continuing.</p><Link className="btn primary" to="/products">Shop now</Link></div>;

  const total = Math.round(cartTotal);
  const submit = (event) => {
    event.preventDefault();
    const order = placeOrder({ ...form, payment });
    if (order) setDone(order);
  };

  return (
    <section className="container section">
      <div className="page-heading"><div><span className="eyebrow">CHECKOUT</span><h1>Complete your order</h1><p>A portfolio demo checkout — no real payment is processed.</p></div></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit}>
          <h2><MapPin /> Delivery details</h2>
          <div className="two"><input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input required pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian phone number" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <input required placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="two"><input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /><input required pattern="[0-9]{6}" title="Enter a valid 6-digit PIN code" placeholder="PIN code" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} /></div>

          <h2><CreditCard /> Payment method</h2>
          <div className="payment-options">
            {['UPI', 'Card', 'Cash on Delivery'].map((method) => <label key={method} className={payment === method ? 'selected' : ''}><input type="radio" name="payment" value={method} checked={payment === method} onChange={(e) => setPayment(e.target.value)} />{method}</label>)}
          </div>
          <div className="payment-demo"><ShieldCheck size={18} /> Secure demo checkout. No real card or UPI information is collected.</div>
          <button className="btn primary full" type="submit">Place order · ₹{total.toLocaleString("en-IN")}</button>
        </form>

        <aside className="summary">
          <h2>Order summary</h2>
          {cart.map((item) => <div key={item.id} className="mini-line"><span>{item.title.slice(0, 32)} × {item.quantity}</span><b>₹{Math.round(item.price * item.quantity).toLocaleString("en-IN")}</b></div>)}
          <hr />
          <div><span>Subtotal</span><b>₹{Math.round(cartTotal).toLocaleString("en-IN")}</b></div>
          <div><span>Delivery</span><b>{cartTotal >= 999 ? "Free" : "₹99"}</b></div>
          <hr />
          <div className="total"><span>Total</span><b>₹{Math.round(cartTotal + (cartTotal >= 999 ? 0 : 99)).toLocaleString("en-IN")}</b></div>
        </aside>
      </div>
    </section>
  );
}
