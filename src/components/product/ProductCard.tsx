"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  tagId: string;
  material: string;
  fit: string;
  stock_quantity: number;
}

export default function ProductCard({ id, name, price, image, tagId, material, fit, stock_quantity }: ProductProps) {
  const { addToCart } = useCart();
  const isSoldOut = stock_quantity <= 0;
  const isLastPiece = stock_quantity === 1;
  const isUnique = tagId.includes('1/1');

  return (
    <div className={`group flex flex-col tag-border bg-[#0a0a0a] transition-colors ${isSoldOut ? '' : 'hover:border-gray-500'}`}>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111] p-4">
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-600"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gray-600"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gray-600"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-600"></div>
        
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          fill
          className={`object-cover ${isSoldOut ? 'opacity-40 grayscale' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500'}`}
        />
        
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="bg-red-600 text-white font-bold uppercase tracking-widest px-4 py-2 border tag-border border-red-800 -rotate-12">
              Sold Out
            </span>
          </div>
        )}

        {!isSoldOut && isLastPiece && (
          <div className="absolute top-4 left-4 z-20 animate-pulse">
            <span className="bg-white text-black font-bold uppercase tracking-widest px-2 py-1 text-[10px] tag-border">
              Ultimo Pezzo
            </span>
          </div>
        )}

        {!isSoldOut && isUnique && !isLastPiece && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#111] text-gray-300 font-bold uppercase tracking-widest px-2 py-1 text-[10px] tag-border border-gray-600">
              Pezzo Unico
            </span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-white text-black px-2 py-1 tag-label font-bold z-20">
          {tagId}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow border-t tag-border">
        <h3 className="text-lg font-bold uppercase tracking-tight mb-2 truncate">{name}</h3>
        
        <div className="flex-grow grid grid-cols-2 gap-2 mb-6">
          <div className="border border-[#333] p-2 flex flex-col justify-center">
            <span className="tag-label text-gray-500">Materiale</span>
            <span className="tag-label text-gray-300 truncate">{material || "-"}</span>
          </div>
          <div className="border border-[#333] p-2 flex flex-col justify-center">
            <span className="tag-label text-gray-500">Fit</span>
            <span className="tag-label text-gray-300 truncate">{fit || "-"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">&euro;{price.toFixed(2)}</span>
          <button
            disabled={isSoldOut}
            onClick={() => addToCart({ id, name, price, image, tagId, quantity: 1 })}
            className={`px-4 py-2 border tag-border uppercase text-xs tracking-widest font-bold transition-colors ${
              isSoldOut 
                ? 'bg-[#111] text-gray-600 border-gray-800 cursor-not-allowed' 
                : 'hover:bg-white hover:text-black'
            }`}
          >
            {isSoldOut ? "Esaurito" : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
}