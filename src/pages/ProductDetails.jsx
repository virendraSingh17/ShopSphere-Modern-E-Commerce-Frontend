import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([getProduct(id), getProducts()])
      .then(([result, all]) => {
        if (!active) return;
        if (!result) {
          setError("Product not found.");
          return;
        }
        setProduct(result);
        setQty(1);
        setRelated(all.filter((item) => item.category === result.category && item.id !== result.id).slice(0, 4));
      })
      .catch(() => { if (active) setError("Unable to load this product."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const discount = useMemo(() => product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product?.discount || 0, [product]);

  if (loading) return <section className="container section"><div className="detail-loading">Loading product details...</div></section>;

  if (error || !product) {
    return <div className="container empty"><span className="error-code">404</span><h2>{error || "Product not found."}</h2><p>The product may have been removed or the link is invalid.</p><Link to="/products" className="btn primary">Back to shop</Link></div>;
  }

  const wished = isWishlisted(product.id);
  const stock = Number(product.stock) || 0;
  const handleAddToCart = () => {
    if (addToCart(product, qty)) navigate("/cart");
  };

  return (
    <>
      <section className="container section">
        <button className="back" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>
        <div className="detail">
          <div className="detail-image">
            <span className="detail-badge">{product.badge || "Featured"}</span>
            <img src={product.image} alt={product.title} onError={(event) => { event.currentTarget.src = "https://placehold.co/900x900/f4f5f7/111827?text=ShopSphere"; }} />
          </div>

          <div className="detail-copy">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.title}</h1>
            <div className="rating large"><Star size={18} fill="currentColor" /><b>{product.rating}</b><span>({product.reviews} reviews)</span></div>
            <div className="detail-price">₹{Number(product.price).toLocaleString("en-IN")} {product.originalPrice && <><del>₹{Number(product.originalPrice).toLocaleString("en-IN")}</del><small>{discount}% OFF</small></>}</div>
            <p>{product.description}</p>

            <div className="feature-list">
              <span><Check size={16} /> Quality-checked product listing</span>
              <span><Truck size={16} /> Free delivery on orders above ₹999</span>
              <span><Check size={16} /> 7-day return policy</span>
            </div>

            <div className="product-stock"><span className="stock-dot" />{stock > 0 ? `${stock} items available` : "Out of stock"}</div>
            <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={17} /></button><b>{qty}</b><button onClick={() => setQty(Math.min(stock || 1, qty + 1))} aria-label="Increase quantity"><Plus size={17} /></button></div>

            <div className="detail-actions">
              <button className="btn primary" onClick={handleAddToCart} disabled={!stock}><ShoppingBag size={18} />{stock ? `Add ${qty} to cart` : "Out of stock"}</button>
              <button className={`btn ghost ${wished ? "active-wish" : ""}`} onClick={() => toggleWishlist(product)}><Heart size={18} fill={wished ? "currentColor" : "none"} />{wished ? "Saved" : "Wishlist"}</button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && <section className="section related-section"><div className="container"><div className="section-head"><div><span className="section-kicker">YOU MAY ALSO LIKE</span><h2>More from {product.category}</h2></div><Link to={`/products?category=${encodeURIComponent(product.category)}`}>View category →</Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>}
    </>
  );
}
