"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter").insert([{ email }]);
      if (error) throw error;
      alert("Iscrizione completata!");
      setEmail("");
    } catch (err: any) {
      alert(`Errore durante l'iscrizione: ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t tag-border mt-20 bg-[#020202]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Image src="/logo.png" alt="NovumStore Logo" width={100} height={34} className="object-contain mb-6" />
            <p className="text-gray-400 text-sm max-w-sm mb-8">Pezzi unici e archivi accuratamente selezionati per un&apos;estetica utilitaristica e oscura.</p>
            
            <div className="border tag-border p-4 bg-[#050505]">
              <h3 className="tag-label text-gray-400 mb-3">Drop Alert / Join The Archive</h3>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required 
                  placeholder="La tua email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent border tag-border p-2 focus:border-white outline-none text-sm" 
                />
                <button type="submit" disabled={loading} className="bg-white text-black font-bold uppercase tracking-widest px-4 text-xs hover:bg-gray-200 transition-colors disabled:opacity-50">Iscriviti</button>
              </form>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="tag-label text-gray-400 mb-4">Info</h3>
            <Link href="/chi-siamo" className="text-sm text-gray-400 hover:text-white transition-colors">Chi Siamo</Link>
            <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ & Guida Taglie</Link>
            <Link href="/contatti" className="text-sm text-gray-400 hover:text-white transition-colors">Contatti & Supporto</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="tag-label text-gray-400 mb-4">Legali</h3>
            <Link href="/termini-condizioni" className="text-sm text-gray-400 hover:text-white transition-colors">Termini e Condizioni</Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1a1a1a] py-6 text-center relative flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="tag-label text-gray-600">&copy; {new Date().getFullYear()} NOVUM STORE. ALL RIGHTS RESERVED.</p>
        <Link href="/admin" className="text-[10px] uppercase tracking-widest text-gray-800 hover:text-white transition-colors">Area Gestione</Link>
      </div>
    </footer>
  );
}