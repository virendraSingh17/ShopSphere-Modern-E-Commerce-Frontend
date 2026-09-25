import React from "react";
import { Heart, ShoppingBag, Star, ArrowUpRight, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const fallbackImage = "https://placehold.co/800x800/f4f5f7/111827?text=ShopSphere";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const wished = isWishlisted(product.id);
  const stock = Number(product.stock) || 0;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wish-btn ${wished ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.title}`}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={(event) => { event.currentTarget.src = fallbackImage; }}
          />
        </Link>
        <Link className="quick-view" to={`/products/${product.id}`}>
          View details <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>

        <div className="rating-row">
          <Star size={15} fill="currentColor" />
          <b>{product.rating}</b>
          <span>({product.reviews})</span>
        </div>

        <div className="price-row">
          <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
          {product.originalPrice && <del>₹{Number(product.originalPrice).toLocaleString("en-IN")}</del>}
          <span>{product.discount}% off</span>
        </div>

        <div className={`stock-label ${stock <= 5 ? "low" : ""}`}>
          <PackageCheck size={14} />
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </div>

        <div className="product-actions">
          <button className="add-btn" onClick={() => addToCart(product)} disabled={!stock}>
            <ShoppingBag size={17} />
            {stock ? "Add to cart" : "Out of stock"}
          </button>
          <button
            className={`wishlist-btn ${wished ? "active" : ""}`}
            onClick={() => toggleWishlist(product)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={17} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
