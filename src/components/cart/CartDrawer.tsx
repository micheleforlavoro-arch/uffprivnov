"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0a0a0a] border-l border-[#1f1f1f] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 font-sans">
        
        <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
          <h2 className="text-lg font-bold uppercase tracking-widest text-white font-mono">Carrello</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 font-mono">
              <p className="mb-4 text-xs">Il tuo carrello è vuoto.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 border border-[#333] hover:border-white text-white transition-colors uppercase text-xs font-bold tracking-widest rounded-xl"
              >
                Esplora l&apos;Archivio
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const maxStock = item.stockQuantity !== undefined ? item.stockQuantity : 999;
              const isMaxReached = item.quantity >= maxStock;

              return (
                <div key={item.id} className="flex gap-4 border border-[#1f1f1f] p-4 rounded-xl bg-[#0e0e0e] relative group">
                  <div className="relative w-20 h-24 bg-[#141414] rounded-lg overflow-hidden flex-shrink-0 border border-[#222]">
                    <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs uppercase text-white tracking-wide pr-6">{item.name}</h3>
                      <p className="font-mono text-[10px] text-gray-500 mt-0.5">{item.tagId}</p>
                    </div>

                    {isMaxReached && maxStock < 999 && (
                      <p className="text-[10px] font-mono text-yellow-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={11} /> Max disponibilità: {maxStock} pz.
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3 font-mono">
                      <div className="flex items-center gap-2 border border-[#282828] rounded-lg px-2 py-1 bg-[#141414]">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white p-0.5">
                          <Minus size={13}/>
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-white">{item.quantity}</span>
                        <button
                          disabled={isMaxReached}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-white disabled:opacity-30 p-0.5"
                        >
                          <Plus size={13}/>
                        </button>
                      </div>
                      <p className="font-bold text-sm text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1"
                    title="Rimuovi"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1f1f1f] bg-[#050505] font-mono">
            <div className="flex justify-between items-center mb-6">
              <span className="uppercase text-xs tracking-widest text-gray-400">Totale Ordine</span>
              <span className="text-2xl font-bold text-white">€{cartTotal.toFixed(2)}</span>
            </div>

            <button 
              className="w-full py-4 bg-white text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors text-xs flex justify-center items-center gap-2 shadow-xl"
              onClick={async () => {
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: cart }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert("Errore Checkout: " + (data.error || "Impossibile completare la richiesta"));
                  }
                } catch (err) {
                  alert("Errore di connessione al servizio di pagamento");
                }
              }}
            >
              Procedi al Checkout Sicuro
            </button>
          </div>
        )}

      </div>
    </>
  );
}