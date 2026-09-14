export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl flex flex-col lg:flex-row gap-16">
      <div className="lg:w-2/3">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">FAQ & Supporto</h1>
        <p className="text-gray-400 mb-12">Informazioni su spedizioni, resi e cura del capo.</p>

        <div className="space-y-8">
          <div className="border tag-border p-6 bg-[#050505]">
            <h3 className="font-bold text-white uppercase mb-2">Quali sono i tempi di spedizione?</h3>
            <p className="text-sm text-gray-400">Tutti gli ordini vengono elaborati entro 24/48 ore lavorative. La consegna standard in Italia impiega 2-3 giorni lavorativi, mentre le spedizioni internazionali 5-7 giorni lavorativi.</p>
          </div>
          <div className="border tag-border p-6 bg-[#050505]">
            <h3 className="font-bold text-white uppercase mb-2">Posso effettuare un reso?</h3>
            <p className="text-sm text-gray-400">Si, accettiamo resi entro 14 giorni dalla consegna. Contattaci tramite l&apos;apposita pagina specificando il numero d&apos;ordine. Ricorda che i capi personalizzati non sono rimborsabili.</p>
          </div>
          <div className="border tag-border p-6 bg-[#050505]">
            <h3 className="font-bold text-white uppercase mb-2">Come lavare e curare i capi?</h3>
            <p className="text-sm text-gray-400">Data la natura tecnica o vintage dei nostri tessuti, consigliamo esclusivamente il lavaggio a freddo o a secco. Evitare assolutamente l&apos;asciugatrice per preservare forme e stampe. Non stirare sulle grafiche.</p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className="border border-white p-6 bg-[#0a0a0a] relative">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white"></div>
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white"></div>
          
          <h2 className="text-center font-mono font-bold uppercase border-b border-[#333] pb-4 mb-6">Guida Taglie</h2>
          <p className="tag-label text-center text-gray-500 mb-6">Misure in CM. Tolleranza +/- 1.5cm</p>
          
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-[#333] text-gray-400">
                <th className="py-2">TAGLIA</th>
                <th className="py-2">LARGHEZZA</th>
                <th className="py-2">LUNGHEZZA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              <tr>
                <td className="py-3 font-bold">S</td>
                <td className="py-3 text-gray-300">52</td>
                <td className="py-3 text-gray-300">68</td>
              </tr>
              <tr>
                <td className="py-3 font-bold">M</td>
                <td className="py-3 text-gray-300">54</td>
                <td className="py-3 text-gray-300">70</td>
              </tr>
              <tr>
                <td className="py-3 font-bold">L</td>
                <td className="py-3 text-gray-300">57</td>
                <td className="py-3 text-gray-300">72</td>
              </tr>
              <tr>
                <td className="py-3 font-bold">XL</td>
                <td className="py-3 text-gray-300">60</td>
                <td className="py-3 text-gray-300">75</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-8 pt-4 border-t border-[#333] flex justify-between items-center text-[10px] tag-label text-gray-500">
            <span>CARE INSTR.</span>
            <span>WASH COLD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
