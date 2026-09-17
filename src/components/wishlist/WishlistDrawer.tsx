"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0a0a0a] border-l border-[#1f1f1f] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 font-sans">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
          <h2 className="text-lg font-bold uppercase tracking-widest text-white font-mono flex items-center gap-2">
            <Heart size={18} className="fill-white text-white" /> Preferiti ({wishlist.length})
          </h2>
          <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>

        {/* WISHLIST ITEMS */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 font-mono">
              <Heart size={36} className="mb-3 text-gray-700" />
              <p className="mb-4 text-xs">Nessun capo salvato nei preferiti.</p>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-3 border border-[#333] hover:border-white text-white transition-colors uppercase text-xs font-bold tracking-widest rounded-xl"
              >
                Esplora l&apos;Archivio
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex gap-4 border border-[#1f1f1f] p-4 rounded-xl bg-[#0e0e0e] relative group">
                <div className="relative w-20 h-24 bg-[#141414] rounded-lg overflow-hidden flex-shrink-0 border border-[#222]">
                  <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-grow flex flex-col justify-between font-mono">
                  <div>
                    <h3 className="font-bold text-xs uppercase text-white tracking-wide pr-6">{item.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.tagId}</p>
                    <p className="font-bold text-sm text-white mt-1">€{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          tagId: item.tagId,
                          quantity: 1,
                        });
                      }}
                      className="flex-grow bg-white text-black hover:bg-gray-200 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={12} /> + Carrello
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1"
                  title="Rimuovi dai preferiti"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
