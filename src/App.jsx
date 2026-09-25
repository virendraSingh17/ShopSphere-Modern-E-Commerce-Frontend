import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";

export default function App() {
  return <>
    <Navbar/>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
    <Footer/>
    <Toast/>
  </>;
}
