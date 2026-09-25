import React from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { cart, cartTotal, updateQty, removeFromCart } = useApp();
  if (!cart.length) return <div className="container empty"><ShoppingBag size={42}/><h1>Your cart is empty</h1><p>Add something you love to get started.</p><Link className="btn primary" to="/products">Continue shopping</Link></div>;

  const delivery = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + delivery;

  return (
    <section className="container section">
      <div className="page-heading"><div><span className="eyebrow">YOUR BAG</span><h1>Shopping cart</h1><p>{cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) selected</p></div></div>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} onError={(event) => { event.currentTarget.src = "https://placehold.co/160x160/f4f5f7/111827?text=Product"; }} />
            <div>
              <Link to={`/products/${item.id}`}><h3>{item.title}</h3></Link>
              <p>₹{Math.round(item.price).toLocaleString("en-IN")} · {item.stock} in stock</p>
              <div className="qty small"><button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus/></button><b>{item.quantity}</b><button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus/></button></div>
            </div>
            <strong>₹{Math.round(item.price * item.quantity).toLocaleString("en-IN")}</strong>
            <button className="trash" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}><Trash2/></button>
          </div>)}
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><b>₹{Math.round(cartTotal).toLocaleString("en-IN")}</b></div>
          <div><span>Delivery</span><b>{delivery ? "₹99" : "Free"}</b></div>
          <hr/>
          <div className="total"><span>Total</span><b>₹{Math.round(total).toLocaleString("en-IN")}</b></div>
          <p className="summary-note">Free delivery automatically applies to orders above ₹999.</p>
          <Link className="btn primary full" to="/checkout">Proceed to checkout <ArrowRight/></Link>
        </aside>
      </div>
    </section>
  );
}
