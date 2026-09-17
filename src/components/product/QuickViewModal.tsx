"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShieldCheck, Truck, MapPin, Check, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: {
    id: string;
    title: string;
    price: number;
    image_url: string;
    tag_id: string;
    material?: string;
    fit?: string;
    stock_quantity: number;
  } | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Nero Underground");

  if (!product) return null;

  const isSoldOut = product.stock_quantity <= 0;
  const isLastPiece = product.stock_quantity === 1;

  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "Nero Underground", hex: "#000000" },
    { name: "Grigio Cemento", hex: "#4a4a4a" },
    { name: "Acid Wash", hex: "#22252a" },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.title} (${selectedSize} / ${selectedColor})`,
      price: product.price,
      image: product.image_url,
      tagId: product.tag_id,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-[#141414] border border-[#333] text-gray-400 hover:text-white p-2 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: GALLERY */}
          <div className="p-6 bg-[#050505] flex flex-col gap-4 border-r border-[#1a1a1a]">
            <div className="relative aspect-[3/4] w-full bg-[#0d0d0d] rounded-xl overflow-hidden border border-[#222]">
              <Image
                src={product.image_url || "/placeholder.png"}
                alt={product.title}
                fill
                className={`object-cover ${isSoldOut ? 'grayscale opacity-40' : ''}`}
                priority
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 font-mono">
                <span className="bg-white text-black text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {product.tag_id}
                </span>
                {isLastPiece && !isSoldOut && (
                  <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                    Ultimo Pezzo
                  </span>
                )}
                {isSoldOut && (
                  <span className="bg-[#181818] text-gray-400 border border-[#333] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                    Sold Out
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
                NOVUM ARCHIVE • PEZZO UNICO 1/1
              </span>

              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                {product.title}
              </h2>

              <div className="mt-3 font-mono">
                <span className="text-2xl font-bold text-white">€{product.price.toFixed(2)}</span>
              </div>

              {/* COLOR SELECTOR */}
              <div className="mt-6">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
                  Variante Colore: <span className="text-white font-sans font-semibold">{selectedColor}</span>
                </label>
                <div className="flex gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                        selectedColor === c.name
                          ? "border-white bg-[#161616] text-white"
                          : "border-[#222] text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-gray-600"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2 font-mono">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">
                    Taglia: <span className="text-white font-bold">{selectedSize}</span>
                  </label>
                  <a href="/faq" target="_blank" className="text-[11px] text-gray-400 hover:text-white underline">
                    Guida Taglie
                  </a>
                </div>

                <div className="grid grid-cols-4 gap-2 font-mono">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-10 border font-bold uppercase rounded-lg text-sm flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? "bg-white text-black border-white"
                          : "bg-[#111] text-white border-[#222] hover:border-gray-500"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-6 border-t border-[#1c1c1c] font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={isSoldOut}
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Aggiungi al carrello
                </button>

                <button
                  disabled={isSoldOut}
                  onClick={handleBuyNow}
                  className="w-full bg-[#181818] hover:bg-[#222] border border-[#333] hover:border-white text-white font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  Acquista Ora
                </button>
              </div>

              {/* AUTHENTIC ARCHIVAL DETAILS */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#1c1c1c] text-xs text-gray-400 font-sans">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Vestibilità modello: <strong className="text-white">Altezza 185 cm, taglia L</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Truck size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Spedizione: <strong className="text-white">Tracciata Corriere Espresso Italia (24/48h)</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Info size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Autenticità: <strong className="text-white">Capo originale d&apos;archivio con cert. interno</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Store Fisico: <strong className="text-white">Via Milano 42, Milano (MI)</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
