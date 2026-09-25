import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { cartCount, wishlist, dark, setDark, user } = useApp();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submitSearch = (event) => {
    event.preventDefault();
    const query = q.trim();
    if (query) navigate(`/products?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="nav-wrap">
      <div className="container nav">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>Shop<span>Sphere</span></Link>

        <form className="nav-search" onSubmit={submitSearch}>
          <Search size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." aria-label="Search products" />
          {q && <button type="submit">Search</button>}
        </form>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
          <NavLink to="/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
          <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>Account</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Link className="icon-btn badge" to="/wishlist" aria-label="Wishlist">
            <Heart size={20} />{wishlist.length > 0 && <b>{wishlist.length}</b>}
          </Link>
          <Link className="icon-btn badge" to="/cart" aria-label="Shopping cart">
            <ShoppingBag size={20} />{cartCount > 0 && <b>{cartCount}</b>}
          </Link>
          <Link className="account" to="/login"><UserRound size={18} />{user ? user.name : "Account"}</Link>
          <button className="mobile-menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
