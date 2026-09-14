export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="border-l-4 border-white pl-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Privacy Policy</h1>
        <p className="tag-label text-gray-400">Trattamento dei dati personali</p>
      </div>

      <div className="space-y-12 text-sm text-gray-400">
        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">1. Informazioni Generali</h2>
          <p className="leading-relaxed">
            La presente Privacy Policy descrive le modalita&apos; con cui NOVUM STORE raccoglie, utilizza e protegge i dati personali degli utenti che visitano e interagiscono con il nostro sito web. La privacy dei nostri clienti e&apos; una priorita&apos; assoluta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">2. Dati Raccolti</h2>
          <p className="leading-relaxed mb-4">
            Raccogliamo le seguenti informazioni:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dati forniti volontariamente dall&apos;utente tramite il modulo contatti (nome, email).</li>
            <li>Dati necessari per il processamento degli ordini e dei pagamenti (gestiti in modo sicuro tramite Stripe).</li>
            <li>Dati di navigazione anonimizzati per migliorare l&apos;esperienza utente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">3. Finalita&apos; del Trattamento</h2>
          <p className="leading-relaxed">
            I dati raccolti vengono utilizzati esclusivamente per elaborare le richieste di supporto, gestire gli ordini e-commerce ed evadere le spedizioni. Non vendiamo, affittiamo o cediamo i tuoi dati a terze parti per finalita&apos; di marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">4. Sicurezza dei Pagamenti</h2>
          <p className="leading-relaxed">
            Le transazioni finanziarie sono processate interamente da Stripe. NOVUM STORE non salva ne&apos; visualizza in alcun momento i dati completi della tua carta di credito.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">5. Diritti dell&apos;Utente</h2>
          <p className="leading-relaxed">
            In conformita&apos; con il GDPR, hai il diritto di accedere, rettificare o richiedere la cancellazione dei tuoi dati personali in qualsiasi momento inviandoci una comunicazione tramite l&apos;apposita pagina Contatti.
          </p>
        </section>
        
        <div className="pt-8 border-t tag-border">
          <p className="tag-label">Ultimo aggiornamento: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
