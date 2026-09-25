import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

export default function Wishlist(){
 const {wishlist}=useApp();
 return <section className="container section"><div className="page-heading"><div><span className="eyebrow">SAVED FOR LATER</span><h1>Wishlist</h1><p>{wishlist.length} saved products</p></div></div>{wishlist.length?<div className="product-grid">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><Heart size={42}/><h2>Your wishlist is empty</h2><Link className="btn primary" to="/products">Discover products</Link></div>}</section>
}
