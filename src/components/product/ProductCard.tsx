"use client";

import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductTopMenu from "@/components/product/ProductTopMenu";

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

  return (
    <div className={`group flex flex-col tag-border bg-[#070707] rounded-xl overflow-hidden transition-all duration-300 border border-[#1a1a1a] ${isSoldOut ? 'opacity-65' : 'hover:border-gray-500'}`}>
      
      {/* IMAGE CONTAINER WITH AUTHENTIC BADGES & HOVER OVERLAY */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0c0c0c] p-4">
        {/* Border corner geometric marks */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-700 pointer-events-none"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gray-700 pointer-events-none"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gray-700 pointer-events-none"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-700 pointer-events-none"></div>
        
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
              ? "bg-white text-black shadow-lg"
              : "bg-black/60 text-gray-400 hover:text-white hover:bg-black/80"
          }`}
          title={favorited ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          <Heart size={15} fill={favorited ? "currentColor" : "none"} />
        </button>

        {/* TOP-LEFT MENU & AUTHENTIC TAG BADGES */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start font-mono">
          <ProductTopMenu
            id={id}
            name={name}
            price={price}
            image={image}
            tagId={tagId}
            material={material}
            fit={fit}
            stock_quantity={stock_quantity}
            onQuickView={onQuickView}
          />

          {isSoldOut ? (
            <span className="bg-[#181818] text-gray-400 border border-[#333] font-bold uppercase text-[10px] px-2 py-0.5 rounded">
              Sold Out
            </span>
          ) : isLastPiece ? (
            <span className="bg-white text-black font-extrabold uppercase text-[10px] px-2 py-0.5 rounded">
              Ultimo Pezzo
            </span>
          ) : isUnique ? (
            <span className="bg-[#121212] text-gray-200 border border-gray-600 font-bold uppercase text-[10px] px-2 py-0.5 rounded">
              Pezzo Unico 1/1
            </span>
          ) : null}
        </div>

        {/* HOVER OVERLAY WITH VISTA RAPIDA & ACQUISTA */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex flex-col gap-2 font-mono">
          <button
            onClick={onQuickView}
            className="w-full bg-[#121212] hover:bg-[#1a1a1a] text-white border border-[#333] font-bold uppercase tracking-widest text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye size={14} /> Vista Rapida
          </button>

          <button
            disabled={isSoldOut}
            onClick={() => addToCart({ id, name, price, image, tagId, quantity: 1 })}
            className="w-full bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-widest text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <ShoppingBag size={14} /> {isSoldOut ? "Esaurito" : "Aggiungi al Carrello"}
          </button>
        </div>
      </div>

      {/* CARD INFO */}
      <div className="p-4 flex flex-col flex-grow bg-[#090909]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-white truncate max-w-[70%]">{name}</h3>
          <span className="tag-label text-gray-500 text-[10px] font-mono border border-[#222] px-1.5 py-0.5 rounded">
            {tagId}
          </span>
        </div>

        {/* MATERIAL / FIT LABELS */}
        <div className="grid grid-cols-2 gap-2 my-2.5 font-mono">
          <div className="bg-[#121212] border border-[#222] p-1.5 rounded flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-gray-500">Materiale</span>
            <span className="text-[11px] text-gray-300 truncate">{material || "100% Cotone"}</span>
          </div>
          <div className="bg-[#121212] border border-[#222] p-1.5 rounded flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-gray-500">Fit</span>
            <span className="text-[11px] text-gray-300 truncate">{fit || "Boxy Fit"}</span>
          </div>
        </div>

        {/* PRICE & MAIN CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1c1c1c]">
          <span className="text-base font-bold font-mono text-white">€{price.toFixed(2)}</span>

          <button
            disabled={isSoldOut}
            onClick={() => addToCart({ id, name, price, image, tagId, quantity: 1 })}
            className={`px-3 py-1.5 rounded uppercase text-[11px] font-mono tracking-widest font-bold transition-all ${
              isSoldOut
                ? "bg-[#141414] text-gray-600 border border-[#222] cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {isSoldOut ? "Esaurito" : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
}