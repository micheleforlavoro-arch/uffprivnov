"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l tag-border z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between p-6 border-b tag-border">
          <h2 className="text-xl font-bold uppercase tracking-widest">Carrello</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="mb-4">Il tuo carrello e&apos; vuoto.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 border tag-border hover:bg-white hover:text-black transition-colors uppercase text-sm tracking-widest"
              >
                Continua lo shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border p-4 tag-border relative group">
                <div className="relative w-20 h-24 bg-[#1a1a1a]">
                  <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                    <p className="tag-label text-gray-400 mt-1">{item.tagId}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border tag-border px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white"><Minus size={14}/></button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white"><Plus size={14}/></button>
                    </div>
                    <p className="font-bold">&euro;{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t tag-border bg-[#050505]">
            <div className="flex justify-between items-center mb-6">
              <span className="uppercase text-sm tracking-widest text-gray-400">Totale</span>
              <span className="text-2xl font-bold">&euro;{cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
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
                    alert("Errore Stripe: " + (data.error || "Chiave segreta mancante"));
                  }
                } catch (err) {
                  alert("Errore di connessione a Stripe");
                }
              }}
            >
              Procedi al Pagamento Sicuro
            </button>
            <p className="tag-label text-gray-500 text-center mt-4">
              Pagamenti processati in sicurezza da Stripe. Nessun dato salvato.
            </p>
          </div>
        )}

      </div>
    </>
  );
}