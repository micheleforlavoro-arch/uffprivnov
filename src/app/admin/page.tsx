"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductForm from "@/components/admin/ProductForm";
import Image from "next/image";
import { checkPassword } from "./actions";
import { 
  Package, 
  Mail, 
  Inbox, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit3, 
  RefreshCw, 
  LogOut, 
  Lock, 
  ShoppingCart, 
  Truck, 
  MapPin, 
  CheckCircle2,
  Calendar,
  User,
  Plus,
  Minus
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  tag_id: string;
  is_visible: boolean;
};

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  selectedSize?: string;
  tagId?: string;
};

type Order = {
  id: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  items: OrderItem[];
  shipping_method: string;
  shipping_cost: number;
  total_amount: number;
  status: string;
  created_at: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "messages" | "newsletter">("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  // Check saved session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("novum_admin_session");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
  };

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from("newsletter")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubscribers(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
      fetchMessages();
      fetchSubscribers();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (passwordInput === "novumadmin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("novum_admin_session", "true");
      return;
    }

    const isOk = await checkPassword(passwordInput);
    if (isOk) {
      setIsAuthenticated(true);
      sessionStorage.setItem("novum_admin_session", "true");
    } else {
      setLoginError("Password errata. Riprova.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("novum_admin_session");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const updateStockDirectly = async (id: string, delta: number) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const newStock = Math.max(0, prod.stock_quantity + delta);

    const { error } = await supabase
      .from("products")
      .update({ stock_quantity: newStock })
      .eq("id", id);

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock_quantity: newStock } : p))
      );
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: !currentStatus })
      .eq("id", id);

    if (!error) {
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Sei sicuro di voler eliminare definitivamente questo capo dall'inventario?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) {
        fetchProducts();
        if (editingProduct?.id === id) setEditingProduct(undefined);
      } else {
        alert("Errore eliminazione: " + error.message);
      }
    }
  };

  const deleteOrder = async (id: string) => {
    if (confirm("Cancellare questo ordine dallo storico del gestionale?")) {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (!error) {
        fetchOrders();
      }
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm("Eliminare questo messaggio ricevuto?")) {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (!error) {
        fetchMessages();
      }
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (confirm("Rimuovere questo utente dalla newsletter?")) {
      const { error } = await supabase.from("newsletter").delete().eq("id", id);
      if (!error) {
        fetchSubscribers();
      }
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 font-mono">
        <div className="max-w-md w-full p-8 border border-[#222] rounded-2xl bg-[#0a0a0a] shadow-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center mb-4 text-white">
              <Lock size={20} />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Area Gestione</h1>
            <p className="text-xs text-gray-500 mt-1">Pannello di controllo Novum Store</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Password Amministratore</label>
              <input
                type="password"
                placeholder="Password (novumadmin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#121212] border border-[#333] rounded-xl p-3.5 text-center text-white focus:border-white outline-none transition-colors"
                autoFocus
              />
            </div>

            {loginError && <p className="text-red-400 text-xs text-center font-bold">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-white text-black font-extrabold uppercase tracking-widest py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-xs"
            >
              Accedi al Gestionale
            </button>
          </form>
        </div>
      </div>
    );
  }

  // REDESIGNED ADMIN DASHBOARD WORKSPACE
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 font-mono">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#222] pb-6 gap-4">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">PANNELLO DI CONTROLLO</span>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white font-sans">Gestionale Novum</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-[#333] hover:border-red-500 text-gray-400 hover:text-red-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
        >
          <LogOut size={14} /> Esci
        </button>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex flex-wrap border-b border-[#222] gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-widest border-t border-x transition-all ${
            activeTab === "products"
              ? "bg-[#0f0f0f] text-white border-[#333]"
              : "bg-transparent text-gray-500 border-transparent hover:text-white"
          }`}
        >
          <Package size={16} /> Inventario ({products.length})
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-widest border-t border-x transition-all ${
            activeTab === "orders"
              ? "bg-[#0f0f0f] text-white border-[#333]"
              : "bg-transparent text-gray-500 border-transparent hover:text-white"
          }`}
        >
          <ShoppingCart size={16} /> Ordini Venduti ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-widest border-t border-x transition-all ${
            activeTab === "messages"
              ? "bg-[#0f0f0f] text-white border-[#333]"
              : "bg-transparent text-gray-500 border-transparent hover:text-white"
          }`}
        >
          <Inbox size={16} /> Messaggi ({messages.length})
        </button>

        <button
          onClick={() => setActiveTab("newsletter")}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-widest border-t border-x transition-all ${
            activeTab === "newsletter"
              ? "bg-[#0f0f0f] text-white border-[#333]"
              : "bg-transparent text-gray-500 border-transparent hover:text-white"
          }`}
        >
          <Mail size={16} /> Newsletter ({subscribers.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTS & INVENTORY */}
      {activeTab === "products" && (
        <div className="flex flex-col gap-8">
          <ProductForm
            onSuccess={() => {
              fetchProducts();
              setEditingProduct(undefined);
            }}
            initialData={editingProduct}
            onCancel={() => setEditingProduct(undefined)}
          />

          <div className="border border-[#222] rounded-2xl bg-[#090909] overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-[#222] flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Package size={16} /> Inventario & Gestione Scorte Magazzino
              </h3>
              <button
                onClick={fetchProducts}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Aggiorna
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500 uppercase text-xs tracking-widest">Caricamento inventario...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121212] text-gray-400 uppercase tracking-widest border-b border-[#222]">
                    <tr>
                      <th className="p-4">Img</th>
                      <th className="p-4">Capo / Tag</th>
                      <th className="p-4">Prezzo</th>
                      <th className="p-4">Giacenza Stock</th>
                      <th className="p-4">Stato Vetrina</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1c]">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-gray-500">Nessun capo registrato nell&apos;inventario.</td>
                      </tr>
                    ) : (
                      products.map((p) => (
                        <tr key={p.id} className="hover:bg-[#111] transition-colors">
                          <td className="p-4">
                            {p.image_url ? (
                              <div className="relative w-12 h-14 bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#222]">
                                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-12 h-14 bg-[#181818] rounded-lg flex items-center justify-center text-[9px] text-gray-600 border border-[#222]">No Img</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white uppercase text-sm">{p.title}</div>
                            <div className="text-gray-500 text-[10px] mt-0.5">{p.tag_id}</div>
                          </td>
                          <td className="p-4 font-bold text-white">€{p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateStockDirectly(p.id, -1)}
                                className="p-1 bg-[#161616] border border-[#333] hover:border-white rounded text-gray-400 hover:text-white"
                                title="Riduci stock"
                              >
                                <Minus size={12} />
                              </button>
                              <span className={`px-2.5 py-1 rounded-lg border font-bold ${p.stock_quantity > 0 ? 'bg-[#141414] text-white border-[#333]' : 'bg-red-950/40 text-red-400 border-red-900'}`}>
                                {p.stock_quantity} pz.
                              </span>
                              <button
                                onClick={() => updateStockDirectly(p.id, 1)}
                                className="p-1 bg-[#161616] border border-[#333] hover:border-white rounded text-gray-400 hover:text-white"
                                title="Aumenta stock"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase ${p.is_visible ? 'bg-green-950/40 text-green-400 border border-green-900' : 'bg-gray-900 text-gray-500 border border-[#222]'}`}>
                              {p.is_visible ? 'Visibile' : 'Nascosto'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => toggleVisibility(p.id, p.is_visible)}
                                className="p-2 border border-[#262626] rounded-lg hover:bg-white hover:text-black transition-colors"
                                title={p.is_visible ? "Nascondi dalla vetrina" : "Rendi visibile"}
                              >
                                {p.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button
                                onClick={() => {
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                  setEditingProduct(p);
                                }}
                                className="p-2 border border-[#262626] rounded-lg hover:bg-white hover:text-black transition-colors"
                                title="Modifica capo"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-2 border border-red-900 text-red-400 rounded-lg hover:bg-red-900 hover:text-white transition-colors"
                                title="Elimina definitivamente"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS & PURCHASES HISTORY */}
      {activeTab === "orders" && (
        <div className="border border-[#222] rounded-2xl bg-[#090909] overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-[#222] flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <ShoppingCart size={16} /> Storico Ordini & Spedizioni Scelte
            </h3>
            <button onClick={fetchOrders} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              <RefreshCw size={13} /> Aggiorna Ordini
            </button>
          </div>

          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#222] rounded-xl bg-[#0d0d0d]">
                <ShoppingCart size={32} className="mx-auto text-gray-600 mb-2" />
                <p className="text-gray-400 font-bold text-xs uppercase">Nessun ordine registrato nel database.</p>
                <p className="text-gray-600 text-[10px] mt-1">Gli ordini appariranno qui non appena completati tramite Stripe o inseriti nel DB.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => {
                  const isPickup = ord.shipping_method === "pickup";
                  const isFree = ord.shipping_method === "free" || ord.shipping_cost === 0;

                  return (
                    <div key={ord.id} className="bg-[#121212] border border-[#222] p-5 rounded-xl space-y-4 hover:border-gray-600 transition-colors">
                      {/* Top bar info */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-[#1c1c1c]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white bg-[#1a1a1a] border border-[#333] px-2.5 py-1 rounded-md">
                            Ordine #{ord.id.slice(0, 8)}
                          </span>
                          <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-900 font-bold uppercase px-2 py-0.5 rounded">
                            <CheckCircle2 size={11} className="inline mr-1" /> Pagato
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {new Date(ord.created_at).toLocaleString("it-IT")}
                          </span>
                          <button
                            onClick={() => deleteOrder(ord.id)}
                            className="text-gray-500 hover:text-red-400 p-1"
                            title="Rimuovi ordine dallo storico"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Main grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Customer */}
                        <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1f1f1f]">
                          <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Cliente</span>
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <User size={13} className="text-gray-400" /> {ord.customer_name || "Cliente Novum"}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{ord.customer_email}</p>
                        </div>

                        {/* Shipping method info */}
                        <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1f1f1f]">
                          <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Opzione Spedizione</span>
                          <div className="flex items-center gap-2 font-bold text-white">
                            {isPickup ? (
                              <>
                                <MapPin size={14} className="text-yellow-400" />
                                <span>Consegna a Mano (€4,00)</span>
                              </>
                            ) : isFree ? (
                              <>
                                <Truck size={14} className="text-emerald-400" />
                                <span className="text-emerald-400">Spedizione Gratuita (€0,00)</span>
                              </>
                            ) : (
                              <>
                                <Truck size={14} className="text-white" />
                                <span>Spedizione Standard (€7,00)</span>
                              </>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">
                            {isPickup ? "Ritiro / Consegna Cosenza & dintorni" : "Spedizione Corriere Espresso 24/48h"}
                          </p>
                        </div>

                        {/* Total amount */}
                        <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1f1f1f] flex flex-col justify-between">
                          <span className="text-[9px] uppercase tracking-widest text-gray-500">Totale Ordine Incassato</span>
                          <span className="text-xl font-bold text-white font-mono">€{ord.total_amount?.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Items list */}
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1.5 font-bold">
                          Capi Acquistati ({Array.isArray(ord.items) ? ord.items.reduce((s, i) => s + (i.quantity || 1), 0) : 0} pz)
                        </span>
                        <div className="bg-[#080808] border border-[#1c1c1c] rounded-lg divide-y divide-[#181818]">
                          {Array.isArray(ord.items) && ord.items.map((item, idx) => (
                            <div key={idx} className="p-2.5 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-white uppercase">{item.name}</span>
                                {item.tagId && <span className="text-gray-500 text-[10px] ml-2 font-mono">[{item.tagId}]</span>}
                                {item.selectedSize && (
                                  <span className="text-[10px] bg-[#181818] border border-[#333] px-1.5 py-0.5 rounded text-gray-300 ml-2">
                                    Taglia: {item.selectedSize}
                                  </span>
                                )}
                              </div>
                              <span className="font-bold font-mono text-gray-300">{item.quantity || 1} pz.</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MESSAGES */}
      {activeTab === "messages" && (
        <div className="border border-[#222] rounded-2xl bg-[#090909] overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-[#222] flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Inbox size={16} /> Messaggi Ricevuti dai Clienti
            </h3>
            <button onClick={fetchMessages} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              <RefreshCw size={13} /> Aggiorna
            </button>
          </div>

          <div className="divide-y divide-[#1c1c1c]">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-gray-500 text-xs tracking-widest">Nessun messaggio ricevuto.</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-[#0e0e0e] transition-colors relative group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-xs text-gray-400 hover:text-white transition-colors">{msg.email}</a>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-gray-500">
                        {new Date(msg.created_at).toLocaleString("it-IT")}
                      </span>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white rounded-lg transition-colors"
                        title="Elimina messaggio"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs whitespace-pre-wrap bg-[#121212] p-4 rounded-xl border border-[#222] font-sans">
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
      {activeTab === "newsletter" && (
        <div className="border border-[#222] rounded-2xl bg-[#090909] overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-[#222] flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Mail size={16} /> Iscritti Newsletter / Drop Alert (Totale: {subscribers.length})
            </h3>
            <button onClick={fetchSubscribers} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              <RefreshCw size={13} /> Aggiorna
            </button>
          </div>

          <div className="p-6">
            {subscribers.length === 0 ? (
              <div className="text-center text-gray-500 text-xs tracking-widest py-8">Nessun iscritto alla newsletter.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="bg-[#121212] border border-[#222] p-3.5 rounded-xl flex items-center justify-between gap-3 hover:border-gray-600 transition-colors">
                    <div>
                      <p className="text-xs text-white font-bold">{sub.email}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Iscritto il {new Date(sub.created_at).toLocaleDateString("it-IT")}</p>
                    </div>
                    <button
                      onClick={() => deleteSubscriber(sub.id)}
                      className="p-1.5 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white rounded-lg transition-colors"
                      title="Elimina iscritto"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
