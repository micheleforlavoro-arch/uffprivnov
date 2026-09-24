"use client";

import React from "react";
import Image from "next/image";
import { X, ShieldCheck, Truck, MapPin, Check, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductTopMenu from "@/components/product/ProductTopMenu";

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

  if (!product) return null;

  const isSoldOut = product.stock_quantity <= 0;
  const isLastPiece = product.stock_quantity === 1;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image_url,
      tagId: product.tag_id,
      quantity: 1,
    });
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

              {/* Top Left Menu & Tag Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 font-mono items-start">
                <ProductTopMenu
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  image={product.image_url}
                  tagId={product.tag_id}
                  material={product.material}
                  fit={product.fit}
                  stock_quantity={product.stock_quantity}
                />

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
                NOVUM ARCHIVE • DISPONIBILITÀ PEZZO UNICO
              </span>

              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                {product.title}
              </h2>

              <div className="mt-3 font-mono">
                <span className="text-2xl font-bold text-white">€{product.price.toFixed(2)}</span>
              </div>

              {/* UNIQUE PIECE NOTICE */}
              <div className="mt-6 p-4 rounded-xl bg-[#111] border border-[#222] font-mono text-xs text-gray-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold uppercase">
                  <span>Capo Unico D&apos;Archivio</span>
                </div>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                  È disponibile esclusivamente la taglia e la variante visibile in foto (Pezzo Unico).
                </p>
              </div>

              {/* SPECIFICATIONS */}
              <div className="grid grid-cols-2 gap-3 mt-6 font-mono text-xs">
                <div className="p-3 bg-[#111] border border-[#222] rounded-xl">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Materiale</span>
                  <span className="text-gray-200 font-bold">{product.material || "100% Cotone Studio"}</span>
                </div>
                <div className="p-3 bg-[#111] border border-[#222] rounded-xl">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Vestibilità</span>
                  <span className="text-gray-200 font-bold">{product.fit || "Boxy / Oversize"}</span>
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
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="w-full bg-[#181818] hover:bg-[#222] border border-[#333] hover:border-white text-white font-bold uppercase tracking-widest py-3.5 rounded-xl text-xs transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  Acquista Ora
                </button>
              </div>

              {/* AUTHENTIC ARCHIVAL DETAILS */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#1c1c1c] text-xs text-gray-400 font-sans">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Vestibilità capo: <strong className="text-white">Altezza modello 185 cm</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Truck size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Spedizione: <strong className="text-white">Tracciata Espresso (24/48h) o Consegna a mano Cosenza</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Info size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Autenticità: <strong className="text-white">Capo originale d&apos;archivio</strong></span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-gray-400 flex-shrink-0" />
                  <span>Sede / Studio: <strong className="text-white">Cosenza (CS), Italia</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
