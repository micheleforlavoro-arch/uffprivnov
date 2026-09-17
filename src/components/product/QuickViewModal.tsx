"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShieldCheck, Truck, MapPin, CreditCard, Check, Sparkles } from "lucide-react";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const isSoldOut = product.stock_quantity <= 0;
  const isLastPiece = product.stock_quantity === 1;

  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "Nero Underground", hex: "#000000" },
    { name: "Grigio Cemento", hex: "#4a4a4a" },
    { name: "Acid Wash", hex: "#22252a" },
  ];

  // Gallery mockup thumbnails
  const galleryImages = [
    product.image_url || "/placeholder.png",
    product.image_url || "/placeholder.png",
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
    // Triggers cart open or instant checkout flow
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b0b0b] border border-[#252525] rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-[#181818] border border-[#333] text-gray-300 hover:text-white p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: GALLERY */}
          <div className="p-6 bg-[#050505] flex flex-col gap-4 border-r border-[#1a1a1a]">
            <div className="relative aspect-[3/4] w-full bg-[#111] rounded-xl overflow-hidden border border-[#222]">
              <Image
                src={galleryImages[activeImageIndex]}
                alt={product.title}
                fill
                className={`object-cover ${isSoldOut ? 'grayscale opacity-50' : ''}`}
                priority
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="bg-white text-black text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {product.tag_id}
                </span>
                {isLastPiece && !isSoldOut && (
                  <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded animate-pulse">
                    Ultimo Pezzo
                  </span>
                )}
                {isSoldOut && (
                  <span className="bg-red-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail previews */}
            <div className="flex gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? "border-white scale-105" : "border-[#222] opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="preview" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">DROP 01 • NOVUM ARCHIVE</span>
                <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                  <Sparkles size={12} /> Disponibile in magazzino
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                {product.title}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white">€{product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">€{(product.price * 1.3).toFixed(2)}</span>
                <span className="text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">
                  SCONTO -23%
                </span>
              </div>

              {/* COLOR SELECTOR */}
              <div className="mt-6">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
                  Colore: <span className="text-white font-sans font-semibold">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        selectedColor === c.name
                          ? "border-white bg-[#1a1a1a] text-white"
                          : "border-[#282828] text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-600"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                    Taglia Selezionata: <span className="text-white font-sans font-bold">{selectedSize}</span>
                  </label>
                  <a href="/faq" target="_blank" className="text-[11px] text-gray-400 hover:text-white underline">
                    Guida alle Taglie
                  </a>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 border font-bold uppercase rounded-lg text-sm flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? "bg-white text-black border-white shadow-lg scale-105"
                          : "bg-[#111] text-white border-[#2a2a2a] hover:border-gray-400"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-6 border-t border-[#1a1a1a]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={isSoldOut}
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs hover:bg-gray-200 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Aggiungi al carrello
                </button>

                <button
                  disabled={isSoldOut}
                  onClick={handleBuyNow}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs transition-colors disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  ⚡ Acquista Ora
                </button>
              </div>

              {/* INFORMATIONAL BADGES */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#1a1a1a] text-xs text-gray-400 font-sans">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-gray-300 flex-shrink-0" />
                  <span>Dettagli modello: <strong className="text-white">Altezza 185 cm, indossa taglia L</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Truck size={16} className="text-gray-300 flex-shrink-0" />
                  <span>Badge: <strong className="text-white">Pagamento alla Consegna (Contrassegno) disponibile</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CreditCard size={16} className="text-pink-400 flex-shrink-0" />
                  <span>Finanziamento: <strong className="text-white">Paga in 3 rate da €{(product.price / 3).toFixed(2)} senza interessi con Klarna</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-gray-300 flex-shrink-0" />
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
