import React from "react";
import { Link } from "react-router-dom";
export default function NotFound(){return <div className="container empty"><span className="error-code">404</span><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><Link className="btn primary" to="/">Go home</Link></div>}
