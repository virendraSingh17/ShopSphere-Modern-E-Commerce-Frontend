import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Code2,
  Database,
  Smartphone,
  Route,
} from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { categories } from "../data/products";
import { getProducts } from "../services/api";

const banners = [
  {
    eyebrow: "SPRING / SUMMER 2026",
    title: "Upgrade your everyday.",
    text: "Curated tech, fashion and lifestyle essentials designed for modern living.",
    action: "Shop collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "SMART TECH",
    title: "Make space for better tech.",
    text: "Discover headphones, watches, monitors and desk essentials for work and play.",
    action: "Explore electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "STYLE EDIT",
    title: "Simple. Modern. You.",
    text: "Fresh everyday fashion and accessories made for your personal style.",
    action: "Explore fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "HOME & LIVING",
    title: "Make your space work for you.",
    text: "Shop home, kitchen and lifestyle essentials to elevate your everyday.",
    action: "Explore home",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85",
  },
  {
    eyebrow: "STUDIO",
    title: "Make your space work for you.",
    text: "Shop home, kitchen and lifestyle essentials to elevate your everyday.",
    action: "Explore home",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function Home() {
  const [items, setItems] = useState([]);
  const [slide, setSlide] = useState(0);

  // Load products
  useEffect(() => {
    getProducts().then((data) => {
      setItems(data);
    });
  }, []);

  // Automatic hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Trending products
  const trending = useMemo(() => {
    return items
      .filter((product) =>
        ["Trending", "Best Seller", "Featured"].includes(product.badge)
      )
      .slice(0, 8);
  }, [items]);

  // Highest discount products
  const deals = useMemo(() => {
    return [...items]
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 8);
  }, [items]);

  // Highest rated products
  const best = useMemo(() => {
    return [...items]
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return b.reviews - a.reviews;
      })
      .slice(0, 8);
  }, [items]);

  const currentBanner = banners[slide];

  return (
    <div>
      {/* ================= HERO ================= */}
      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(8,12,20,.88),
              rgba(8,12,20,.28)
            ),
            url(${currentBanner.image})
          `,
        }}
      >
        <div className="hero-content">
          <span className="eyebrow">
            {currentBanner.eyebrow}
          </span>

          <h1>{currentBanner.title}</h1>

          <p>{currentBanner.text}</p>

          <Link className="hero-btn" to="/products">
            {currentBanner.action}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* HERO CONTROLS */}
        <div className="hero-controls">
          <button
            aria-label="Previous banner"
            onClick={() => {
              setSlide(
                (slide - 1 + banners.length) % banners.length
              );
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <span>
            {String(slide + 1).padStart(2, "0")} /{" "}
            {String(banners.length).padStart(2, "0")}
          </span>

          <button
            aria-label="Next banner"
            onClick={() => {
              setSlide((slide + 1) % banners.length);
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* DOT INDICATORS */}
        <div className="hero-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to banner ${index + 1}`}
              className={slide === index ? "active" : ""}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="trust-strip">
        <div>
          <Truck />
          <span>
            <b>Free delivery</b>
            <small>On orders above ₹999</small>
          </span>
        </div>

        <div>
          <ShieldCheck />
          <span>
            <b>Secure checkout</b>
            <small>Protected payments</small>
          </span>
        </div>

        <div>
          <RotateCcw />
          <span>
            <b>Easy returns</b>
            <small>7-day return policy</small>
          </span>
        </div>

        <div>
          <Headphones />
          <span>
            <b>Support</b>
            <small>We're here to help</small>
          </span>
        </div>
      </section>

      {/* ================= PROJECT HIGHLIGHTS ================= */}
      <section className="section project-highlights">
        <div className="section-heading">
          <div>
            <span className="section-kicker">PROJECT HIGHLIGHTS</span>
            <h2>Built beyond a static shopping UI</h2>
          </div>
          <span className="capstone-label">Frontend Capstone</span>
        </div>
        <div className="highlight-grid">
          <article><Code2/><div><b>Component architecture</b><p>Reusable React components keep the interface organized and maintainable.</p></div></article>
          <article><Route/><div><b>Client-side routing</b><p>Product, cart, wishlist, checkout and dashboard flows work as connected pages.</p></div></article>
          <article><Database/><div><b>Persistent state</b><p>Cart, wishlist, theme, account and orders are stored in browser LocalStorage.</p></div></article>
          <article><Smartphone/><div><b>Responsive UX</b><p>Desktop, tablet and mobile layouts adapt with interactive navigation and controls.</p></div></article>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              SHOP BY CATEGORY
            </span>

            <h2>Find your everyday favourites</h2>
          </div>

          <Link to="/products">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              key={category.name}
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
            >
              <span>{category.icon}</span>

              <div>
                <b>{category.name}</b>

                <small>{category.description}</small>
              </div>

              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TRENDING ================= */}
      <section className="section soft-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              HANDPICKED FOR YOU
            </span>

            <h2>Trending right now</h2>
          </div>

          <Link to="/products">
            Shop all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {trending.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="promo-banner section">
        <div>
          <span className="eyebrow">
            LIMITED TIME
          </span>

          <h2>Big style. Better prices.</h2>

          <p>
            Save up to 43% on selected essentials
            while stocks last.
          </p>

          <Link
            className="hero-btn light-btn"
            to="/products"
          >
            Shop deals
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="promo-number">
          43<span>%</span>
        </div>
      </section>

      {/* ================= DEALS ================= */}
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              SAVE MORE
            </span>

            <h2>Today's best deals</h2>
          </div>

          <Link to="/products">
            View deals
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {deals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* ================= TOP RATED ================= */}
      <section className="section soft-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              TOP RATED
            </span>

            <h2>Loved by our shoppers</h2>
          </div>
        </div>

        <div className="product-grid">
          {best.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter section">
        <div>
          <span className="section-kicker">
            STAY IN THE LOOP
          </span>

          <h2>Get the good stuff, not the spam.</h2>

          <p>
            New drops, curated collections and
            members-only offers.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thanks for subscribing!");
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            required
          />

          <button type="submit">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
