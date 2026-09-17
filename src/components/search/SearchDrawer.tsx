"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: any) => void;
}

export default function SearchDrawer({ isOpen, onClose, onSelectProduct }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen && products.length === 0) {
      setLoading(true);
      supabase
        .from("products")
        .select("*")
        .eq("is_visible", true)
        .then(({ data }) => {
          if (data) setProducts(data);
          setLoading(false);
        });
    }
  }, [isOpen, products.length]);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.tag_id.toLowerCase().includes(q)
    );
    setFiltered(matches);
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg bg-[#0a0a0a] border-l border-[#222] h-full flex flex-col p-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between pb-6 border-b border-[#222]">
          <h3 className="text-lg font-bold uppercase tracking-widest text-white flex items-center gap-2">
            <Search size={20} /> Cerca nell&apos;Archivio
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            placeholder="Cerca per nome (es. Hoodie, T-Shirt, PZ-01)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            autoFocus
          />
        </div>

        <div className="flex-grow overflow-y-auto mt-6 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 py-8 text-sm">Caricamento prodotti...</p>
          ) : query.trim() && filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">Nessun capo trovato per &quot;{query}&quot;.</p>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#111] border border-[#222] hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => { onSelectProduct?.(product); onClose(); }}>
                  <div className="relative w-14 h-16 bg-[#1f1f1f] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image_url || "/placeholder.png"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white">{product.title}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{product.tag_id}</p>
                    <p className="text-sm font-semibold text-white mt-1">€{product.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  disabled={product.stock_quantity <= 0}
                  onClick={() => addToCart({ id: product.id, name: product.title, price: product.price, image: product.image_url, tagId: product.tag_id, quantity: 1 })}
                  className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-gray-200 transition-colors disabled:opacity-40"
                >
                  {product.stock_quantity <= 0 ? "Esaurito" : "Aggiungi"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
