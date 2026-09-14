export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="border-l-4 border-white pl-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Cookie Policy</h1>
        <p className="tag-label text-gray-400">Come utilizziamo i cookie</p>
      </div>

      <div className="space-y-12 text-sm text-gray-400">
        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">1. Cosa sono i cookie?</h2>
          <p className="leading-relaxed">
            I cookie sono piccoli file di testo che i siti visitati inviano al tuo dispositivo, dove vengono memorizzati per poi essere ritrasmessi agli stessi siti alla visita successiva.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">2. Cookie Tecnici e di Navigazione</h2>
          <p className="leading-relaxed mb-4">
            Questo sito utilizza principalmente cookie tecnici, strettamente necessari per il corretto funzionamento dell&apos;e-commerce. Essi permettono:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Il mantenimento della sessione (es. salvataggio dei prodotti nel carrello o stato di login).</li>
            <li>La navigazione e la fruizione fluida del sito web.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">3. Cookie di Terze Parti</h2>
          <p className="leading-relaxed">
            I pagamenti sono gestiti tramite Stripe. Stripe puo&apos; impostare cookie necessari alla sicurezza delle transazioni e alla prevenzione delle frodi. Tali cookie sono regolamentati dalla policy ufficiale di Stripe.
          </p>
        </section>
        
        <div className="pt-8 border-t tag-border">
          <p className="tag-label">Ultimo aggiornamento: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
