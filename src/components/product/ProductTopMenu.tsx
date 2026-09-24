"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sliders, Check, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductTopMenuProps {
  id: string;
  name: string;
  price: number;
  image: string;
  tagId: string;
  material?: string;
  fit?: string;
  stock_quantity: number;
  onQuickView?: () => void;
}

export default function ProductTopMenu({
  id,
  name,
  price,
  image,
  tagId,
  material = "100% Cotone Heavyweight",
  fit = "Boxy Oversize",
  stock_quantity,
  onQuickView,
}: ProductTopMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const menuRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const isSoldOut = stock_quantity <= 0;
  const isUnique = tagId.includes("1/1");
  const sizes = isUnique ? ["Unica (1/1)"] : ["S", "M", "L", "XL"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAddToCartWithSize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;
    addToCart({
      id,
      name,
      price,
      image,
      tagId,
      quantity: 1,
      selectedSize,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative font-mono z-30" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      {/* TRIGGER BUTTON (TOP-LEFT) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all backdrop-blur-md border shadow-lg ${
          isOpen
            ? "bg-white text-black border-white"
            : "bg-black/75 hover:bg-black text-gray-200 border-[#333] hover:border-white"
        }`}
        title="Menu rapido capo e taglie"
      >
        <Sliders size={12} />
        <span>Menu Capo</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* DROPDOWN CONTAINER */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#2a2a2a] rounded-xl shadow-2xl p-3.5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 text-left text-xs text-gray-300">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-[#1f1f1f]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              SPECIFICHE ARCHIVIO
            </span>
            <span className="text-[9px] bg-[#181818] border border-[#333] px-1.5 py-0.5 rounded text-gray-300">
              {tagId}
            </span>
          </div>

          {/* SIZES SELECTOR */}
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 block mb-1.5">
              Seleziona Taglia:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all border ${
                    selectedSize === sz
                      ? "bg-white text-black border-white"
                      : "bg-[#141414] text-gray-400 border-[#222] hover:text-white hover:border-[#444]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* TECHNICAL DETAILS ACCORDION INFO */}
          <div className="space-y-1.5 bg-[#121212] p-2.5 rounded-lg border border-[#1f1f1f] text-[10px]">
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Materiale:</span>
              <span className="text-gray-200 font-bold truncate max-w-[120px]">{material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Vestibilità:</span>
              <span className="text-gray-200 font-bold truncate max-w-[120px]">{fit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Stato:</span>
              <span className="text-emerald-400 font-bold">Autentico 10/10</span>
            </div>
          </div>

          {/* QUICK SHIPPING NOTICE */}
          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-sans">
            <Truck size={12} className="text-gray-400 flex-shrink-0" />
            <span>Spediz. €7,00 | Consegna a mano €4,00</span>
          </div>

          {/* ACTIONS */}
          <div className="space-y-1.5 pt-1">
            <button
              disabled={isSoldOut}
              onClick={handleAddToCartWithSize}
              className="w-full py-2 bg-white text-black font-extrabold uppercase tracking-widest rounded-lg text-[10px] hover:bg-gray-200 transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5 shadow-md"
            >
              <Check size={13} /> {isSoldOut ? "Esaurito" : `Aggiungi (${selectedSize})`}
            </button>

            {onQuickView && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  onQuickView();
                }}
                className="w-full py-1.5 bg-[#161616] text-gray-300 border border-[#2a2a2a] hover:border-white font-bold uppercase tracking-widest rounded-lg text-[9px] transition-colors text-center"
              >
                Scheda Dettagliata →
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
