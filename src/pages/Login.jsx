import React from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login(){
 const {setUser}=useApp(), nav=useNavigate(); const [register,setRegister]=useState(false); const [form,setForm]=useState({name:"",email:"",password:""});
 const submit=e=>{e.preventDefault();setUser({name:register?(form.name||"Shopper"):form.email.split("@")[0],email:form.email});nav("/")};
 return <section className="auth-wrap"><form className="auth-card" onSubmit={submit}><div className="auth-logo">SS</div><span className="eyebrow">WELCOME TO SHOPSPHERE</span><h1>{register?"Create account":"Welcome back"}</h1><p>{register?"Create a demo account to explore the full experience.":"Sign in to continue shopping."}</p>{register&&<label><UserRound/> <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>}<label><Mail/><input required type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label><LockKeyhole/><input required minLength="6" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><button className="btn primary full">{register?"Create account":"Sign in"}</button><small>This is a portfolio demo; credentials are not sent to a server.</small><button type="button" className="text-btn" onClick={()=>setRegister(v=>!v)}>{register?"Already have an account? Sign in":"New here? Create an account"}</button><Link className="back-home" to="/">← Back to home</Link></form></section>
}
