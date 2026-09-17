"use client";

import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductProps {
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

export default function ProductCard({
  id,
  name,
  price,
  image,
  tagId,
  material,
  fit,
  stock_quantity,
  onQuickView,
}: ProductProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSoldOut = stock_quantity <= 0;
  const isLastPiece = stock_quantity === 1;
  const isUnique = tagId.includes("1/1");
  const favorited = isInWishlist(id);

  // Mock calculated discount price for visual flair
  const originalPrice = price * 1.35;

  return (
    <div className={`group flex flex-col tag-border bg-[#0a0a0a] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 border border-[#1f1f1f] ${isSoldOut ? 'opacity-70' : 'hover:border-gray-400'}`}>
      
      {/* IMAGE CONTAINER WITH BADGES & HOVER OVERLAY */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111] p-4">
        {/* Border corner decorations */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-700"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gray-700"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gray-700"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-700"></div>
        
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          fill
          className={`object-cover ${
            isSoldOut ? 'opacity-40 grayscale' : 'opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500'
          }`}
        />

        {/* WISHLIST BUTTON (TOP RIGHT) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({ id, name, price, image, tagId });
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
            favorited
              ? "bg-red-600 text-white shadow-lg"
              : "bg-black/60 text-gray-300 hover:text-white hover:bg-black/80"
          }`}
          title={favorited ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <Heart size={16} fill={favorited ? "currentColor" : "none"} />
        </button>

        {/* TAG BADGES (TOP LEFT) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          <span className="bg-red-600 text-white font-extrabold uppercase text-[10px] px-2 py-0.5 rounded shadow">
            -35% OFF
          </span>

          {isSoldOut ? (
            <span className="bg-red-950 text-red-200 border border-red-800 font-bold uppercase text-[10px] px-2 py-0.5 rounded">
              Sold Out
            </span>
          ) : isLastPiece ? (
            <span className="bg-white text-black font-extrabold uppercase text-[10px] px-2 py-0.5 rounded animate-pulse">
              Ultimo Pezzo
            </span>
          ) : isUnique ? (
            <span className="bg-[#181818] text-gray-200 border border-gray-600 font-bold uppercase text-[10px] px-2 py-0.5 rounded">
              Pezzo Unico
            </span>
          ) : null}
        </div>

        {/* HOVER OVERLAY WITH QUICK VIEW & QUICK ADD BUTTONS */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col gap-2">
          <button
            onClick={onQuickView}
            className="w-full bg-black/80 hover:bg-black text-white border border-gray-500 font-bold uppercase tracking-wider text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <Eye size={14} /> Vista Rapida
          </button>

          <button
            disabled={isSoldOut}
            onClick={() => addToCart({ id, name, price, image, tagId, quantity: 1 })}
            className="w-full bg-white hover:bg-gray-200 text-black font-extrabold uppercase tracking-wider text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
          >
            <ShoppingBag size={14} /> {isSoldOut ? "Esaurito" : "Acquisto Rapido"}
          </button>
        </div>
      </div>

      {/* CARD INFO */}
      <div className="p-5 flex flex-col flex-grow bg-[#0c0c0c]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-white truncate max-w-[70%]">{name}</h3>
          <span className="tag-label text-gray-500 text-[10px] font-bold border border-[#262626] px-1.5 py-0.5 rounded">
            {tagId}
          </span>
        </div>

        {/* MATERIAL / FIT LABELS */}
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="bg-[#141414] border border-[#222] p-1.5 rounded-lg flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Materiale</span>
            <span className="text-xs text-gray-300 truncate font-medium">{material || "100% Cotone"}</span>
          </div>
          <div className="bg-[#141414] border border-[#222] p-1.5 rounded-lg flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Fit</span>
            <span className="text-xs text-gray-300 truncate font-medium">{fit || "Boxy Fit"}</span>
          </div>
        </div>

        {/* PRICE & MAIN CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1c1c1c]">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-white">€{price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 line-through">€{originalPrice.toFixed(2)}</span>
          </div>

          <button
            disabled={isSoldOut}
            onClick={() => addToCart({ id, name, price, image, tagId, quantity: 1 })}
            className={`px-3 py-1.5 rounded-lg uppercase text-xs tracking-wider font-bold transition-all ${
              isSoldOut
                ? "bg-[#161616] text-gray-600 border border-[#262626] cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {isSoldOut ? "Esaurito" : "+ Carrello"}
          </button>
        </div>
      </div>
    </div>
  );
}