"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const messageBody = formData.get("message") as string;
    
    const fullMessage = `[Oggetto: ${subject}]\n${messageBody}`;

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name,
          email,
          message: fullMessage,
        }
      ]);

      if (error) throw error;
      
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Si e' verificato un errore. Riprova piu' tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl flex flex-col md:flex-row gap-16">
      <div className="md:w-1/3">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Contatti</h1>
        <p className="text-gray-400 mb-12">Hai domande sui nostri capi, spedizioni o collaborazioni? Scrivici.</p>
        
        <div className="space-y-8">
          <div>
            <h3 className="tag-label text-gray-500 mb-1">Email</h3>
            <p className="font-mono text-white">[Email da definire]</p>
          </div>
          <div>
            <h3 className="tag-label text-gray-500 mb-1">Studio</h3>
            <p className="font-mono text-white">[Luogo da inserire] (Solo su appuntamento)</p>
          </div>
          <div>
            <h3 className="tag-label text-gray-500 mb-1">Social</h3>
            <div className="flex gap-4 mt-2 font-mono">
              <a
                href="https://www.instagram.com/novum_store_"
                target="_blank"
                rel="noopener noreferrer"
                className="border tag-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-lg"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@novum_store_"
                target="_blank"
                rel="noopener noreferrer"
                className="border tag-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-lg"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-2/3 border tag-border p-8 bg-[#0a0a0a]">
        <h2 className="text-xl font-bold uppercase tracking-tight mb-8 border-b tag-border pb-4">Invia un messaggio</h2>
        
        {success ? (
          <div className="bg-green-500/10 border border-green-500 p-6 text-center">
            <h3 className="text-green-500 font-bold uppercase tracking-widest mb-2">Messaggio Inviato</h3>
            <p className="text-gray-300 text-sm">Ti risponderemo il prima possibile.</p>
            <button onClick={() => setSuccess(false)} className="mt-6 tag-label hover:text-white transition-colors">Invia un altro messaggio</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="tag-label text-gray-400">Nome Completo</label>
                <input name="name" type="text" id="name" className="bg-transparent border tag-border p-3 focus:outline-none focus:border-white transition-colors" placeholder="Il tuo nome" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="tag-label text-gray-400">Email</label>
                <input name="email" type="email" id="email" className="bg-transparent border tag-border p-3 focus:outline-none focus:border-white transition-colors" placeholder="La tua email" required />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="tag-label text-gray-400">Oggetto</label>
              <select name="subject" id="subject" className="bg-transparent border tag-border p-3 focus:outline-none focus:border-white transition-colors text-white">
                <option value="Informazioni Generali" className="bg-[#0a0a0a]">Informazioni Generali</option>
                <option value="Supporto Ordine" className="bg-[#0a0a0a]">Supporto Ordine</option>
                <option value="Collaborazioni" className="bg-[#0a0a0a]">Collaborazioni</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="tag-label text-gray-400">Messaggio</label>
              <textarea name="message" id="message" rows={5} className="bg-transparent border tag-border p-3 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Scrivi qui il tuo messaggio..." required></textarea>
            </div>

            {errorMsg && <p className="text-red-500 text-sm font-bold">{errorMsg}</p>}

            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gray-200 transition-colors disabled:opacity-50">
              {loading ? "Invio in corso..." : "Invia"}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}