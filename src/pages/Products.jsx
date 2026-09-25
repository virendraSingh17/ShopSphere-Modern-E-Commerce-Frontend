import React, { useEffect, useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { getProducts } from "../services/api";

export default function Products() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState(params.get("search") || "");
  const [max, setMax] = useState(20000);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProducts()
      .then((data) => { if (active) setProducts(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setLoadError("We couldn't load the catalog. Please refresh and try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setCategory(params.get("category") || "all");
    setQuery(params.get("search") || "");
  }, [params]);

  const categories = useMemo(() => ["all", ...new Set(products.map((p) => p.category))], [products]);

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const searchable = `${p.title} ${p.category} ${p.description}`.toLowerCase();
      return matchesCategory && p.price <= max && searchable.includes(term);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sort === "discount") return (b.discount || 0) - (a.discount || 0);
      return (b.reviews || 0) - (a.reviews || 0);
    });
  }, [products, category, sort, query, max]);

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
    setSort("featured");
    setMax(20000);
  };

  return (
    <section className="container section products-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">DISCOVER</span>
          <h1>Explore the collection</h1>
          <p>Search, filter, sort and compare products in real time.</p>
        </div>
        <div className="results">{shown.length} products</div>
      </div>

      <div className="toolbar">
        <div className="search-field">
          <Filter size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by product, category or keyword..." />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="discount">Biggest discount</option>
        </select>
      </div>

      <div className="shop-layout">
        <aside className="filters">
          <div className="filter-title"><h3><SlidersHorizontal /> Filters</h3><button onClick={clearFilters} title="Reset filters"><X size={16} /></button></div>
          <label>Category</label>
          {categories.map((item) => (
            <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>
              {item === "all" ? "All products" : item}
              {item !== "all" && <span>{products.filter((p) => p.category === item).length}</span>}
            </button>
          ))}
          <label>Maximum price: ₹{max.toLocaleString("en-IN")}</label>
          <input type="range" min="500" max="20000" step="250" value={max} onChange={(e) => setMax(Number(e.target.value))} />
          <div className="range-labels"><span>₹500</span><span>₹20K</span></div>
        </aside>

        <div className="product-area">
          {loading && <Loader />}
          {loadError && <div className="empty"><h2>Something went wrong</h2><p>{loadError}</p></div>}
          {!loading && !loadError && shown.length > 0 && (
            <div className="product-grid">{shown.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          )}
          {!loading && !loadError && !shown.length && (
            <div className="empty"><h2>No products found</h2><p>Try another search or reset the filters.</p><button className="btn primary" onClick={clearFilters}>Reset filters</button></div>
          )}
        </div>
      </div>

      <div className="back-home"><Link className="btn" to="/">← Back to home</Link></div>
    </section>
  );
}
