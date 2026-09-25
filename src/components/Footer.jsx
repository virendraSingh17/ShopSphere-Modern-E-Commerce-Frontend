import React from "react";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">Shop<span>Sphere</span></div>
          <p>Modern shopping experience built with React for a frontend portfolio.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/products">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div>
          <h4>Project</h4>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/login">Account</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <div>
          <h4>Connect</h4>
          <div className="social">
            <a href="https://github.com/virendraSingh17" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.linkedin.com/in/virendra-singh/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="container copyright">
        © {new Date().getFullYear()} ShopSphere. Portfolio project.
      </div>
    </footer>
  );
}
