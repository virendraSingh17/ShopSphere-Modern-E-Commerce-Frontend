import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const DATA_VERSION = "3-final-year";

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => read("shopsphere-cart", []));
  const [wishlist, setWishlist] = useState(() => read("shopsphere-wishlist", []));
  const [orders, setOrders] = useState(() => read("shopsphere-orders", []));
  const [user, setUser] = useState(() => read("shopsphere-user", null));
  const [dark, setDark] = useState(() => localStorage.getItem("shopsphere-dark") === "true");
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    const version = localStorage.getItem("shopsphere-data-version");
    if (version !== DATA_VERSION) {
      setCart([]);
      setWishlist([]);
      setOrders([]);
      localStorage.setItem("shopsphere-cart", "[]");
      localStorage.setItem("shopsphere-wishlist", "[]");
      localStorage.setItem("shopsphere-orders", "[]");
      localStorage.setItem("shopsphere-data-version", DATA_VERSION);
    }
  }, []);

  useEffect(() => localStorage.setItem("shopsphere-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("shopsphere-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("shopsphere-orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("shopsphere-user", JSON.stringify(user)), [user]);

  useEffect(() => {
    localStorage.setItem("shopsphere-dark", String(dark));

    // The active theme is controlled by styles-modern.css using
    // the data-theme attribute. Keep the class too for compatibility
    // with any custom styles a developer may add later.
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addToCart = useCallback((product, quantity = 1) => {
    const stock = Number(product.stock) || 0;
    if (!stock) {
      notify("This product is currently out of stock.", "error");
      return false;
    }

    const found = cart.find((item) => item.id === product.id);
    const currentQty = found?.quantity || 0;
    const nextQty = Math.min(stock, currentQty + quantity);

    if (nextQty === currentQty) {
      notify(`Only ${stock} item${stock === 1 ? "" : "s"} available.`, "error");
      return false;
    }

    setCart(found
      ? cart.map((item) => item.id === product.id ? { ...item, quantity: nextQty } : item)
      : [...cart, { ...product, quantity: Math.min(stock, quantity) }]
    );
    notify(`${product.title} added to cart.`);
    return true;
  }, [cart, notify]);

  const updateQty = useCallback((id, quantity) => {
    setCart((items) => items.map((item) => {
      if (item.id !== id) return item;
      const next = Math.max(0, Math.min(Number(item.stock) || 99, quantity));
      return { ...item, quantity: next };
    }).filter((item) => item.quantity > 0));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    notify("Item removed from cart.");
  }, [notify]);

  const toggleWishlist = useCallback((product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    setWishlist(exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product]
    );
    notify(exists ? "Removed from wishlist." : "Added to wishlist.");
  }, [wishlist, notify]);

  const isWishlisted = useCallback((id) => wishlist.some((item) => item.id === id), [wishlist]);

  const placeOrder = useCallback((customer) => {
    if (!cart.length) return null;
    const order = {
      id: `SS-${Date.now().toString().slice(-7)}`,
      date: new Date().toLocaleDateString("en-IN"),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) >= 999 ? 0 : 99),
      status: "Processing",
      customer,
    };
    setOrders((items) => [order, ...items]);
    setCart([]);
    notify(`Order ${order.id} placed successfully.`);
    return order;
  }, [cart, notify]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    cart, wishlist, orders, user, dark, toast,
    setDark, setUser, setToast, notify,
    addToCart, updateQty, removeFromCart, toggleWishlist, isWishlisted,
    placeOrder, cartCount, cartTotal,
  }), [
    cart, wishlist, orders, user, dark, toast, notify,
    addToCart, updateQty, removeFromCart, toggleWishlist, isWishlisted,
    placeOrder, cartCount, cartTotal,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
