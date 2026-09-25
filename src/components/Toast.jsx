import React, { useEffect } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast, setToast } = useApp();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type === "error" ? "toast-error" : ""}`} role="status">
      {toast.type === "error" ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
      <span>{toast.message}</span>
      <button onClick={() => setToast(null)} aria-label="Close notification"><X size={16} /></button>
    </div>
  );
}
