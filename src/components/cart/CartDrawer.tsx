"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, AlertCircle, Truck, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    finalTotal,
    isFreeShipping,
    freeShippingThreshold,
  } = useCart();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] border-l border-[#1f1f1f] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 font-sans">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold uppercase tracking-widest text-white font-mono">Carrello</h2>
            <span className="text-xs font-mono bg-[#1a1a1a] text-gray-400 border border-[#333] px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} capi
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>

        {/* FREE SHIPPING PROGRESS BAR */}
        {cart.length > 0 && (
          <div className="bg-[#111111] border-b border-[#1f1f1f] p-4 font-mono">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                <span>Complimenti! Spedizione Gratuita sbloccata per il tuo ordine.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Spedizione Gratuita a partire da €150,00</span>
                  <span className="text-white font-bold">Mancano €{remainingForFreeShipping.toFixed(2)}</span>
                </div>
                <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ITEMS LIST */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 font-mono text-center">
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
                <div key={`${item.id}-${item.selectedSize || 'def'}`} className="flex gap-4 border border-[#1f1f1f] p-4 rounded-xl bg-[#0e0e0e] relative group">
                  <div className="relative w-20 h-24 bg-[#141414] rounded-lg overflow-hidden flex-shrink-0 border border-[#222]">
                    <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs uppercase text-white tracking-wide pr-6">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-gray-400">
                        <span>{item.tagId}</span>
                        {item.selectedSize && (
                          <span className="border border-[#333] px-1.5 py-0.2 rounded text-white bg-[#181818]">
                            Taglia: {item.selectedSize}
                          </span>
                        )}
                      </div>
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

        {/* SHIPPING SELECTOR & TOTAL BREAKDOWN */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1f1f1f] bg-[#050505] font-mono space-y-4">
            
            {/* SELETTORE OPZIONI DI SPEDIZIONE */}
            <div>
              <span className="uppercase text-[10px] tracking-widest text-gray-400 block mb-2 font-bold">
                Metodo di Spedizione
              </span>

              {isFreeShipping ? (
                <div className="p-3 border border-emerald-500/40 bg-emerald-950/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Truck size={16} className="text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase">Spedizione Gratuita Applicata</p>
                      <p className="text-[10px] text-gray-400">Ordine superiore a €150,00</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400">0,00 €</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {/* Option 1: Standard */}
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === "standard"
                        ? "border-white bg-[#141414] text-white"
                        : "border-[#222] bg-[#0a0a0a] text-gray-400 hover:border-[#444]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === "standard" ? "border-white bg-white" : "border-gray-600"}`}>
                        {shippingMethod === "standard" && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </div>
                      <Truck size={15} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase text-white">Spedizione Standard</span>
                        <span className="text-[9px] text-gray-400">Tracciata Corriere 24/48h</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold">7,00 €</span>
                  </label>

                  {/* Option 2: Pickup Cosenza */}
                  <label
                    onClick={() => setShippingMethod("pickup")}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === "pickup"
                        ? "border-white bg-[#141414] text-white"
                        : "border-[#222] bg-[#0a0a0a] text-gray-400 hover:border-[#444]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === "pickup" ? "border-white bg-white" : "border-gray-600"}`}>
                        {shippingMethod === "pickup" && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                      </div>
                      <MapPin size={15} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase text-white">Consegna a Mano</span>
                        <span className="text-[9px] text-gray-400">Cosenza e dintorni (≤15km)</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold">4,00 €</span>
                  </label>
                </div>
              )}
            </div>

            {/* BREAKDOWN COSTI */}
            <div className="border-t border-[#1a1a1a] pt-3 space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Subtotale capi</span>
                <span className="text-white">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Spedizione</span>
                <span className={shippingCost === 0 ? "text-emerald-400 font-bold" : "text-white"}>
                  {shippingCost === 0 ? "GRATUITA (0,00 €)" : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-[#222]">
                <span className="uppercase tracking-widest text-xs">Totale Finale</span>
                <span className="text-2xl text-white">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button 
              className="w-full py-4 bg-white text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors text-xs flex justify-center items-center gap-2 shadow-xl"
              onClick={async () => {
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      items: cart,
                      shippingMethod: isFreeShipping ? 'free' : shippingMethod,
                      shippingCost: shippingCost,
                    }),
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
              Procedi al Checkout Sicuro (€{finalTotal.toFixed(2)})
            </button>
          </div>
        )}

      </div>
    </>
  );
}