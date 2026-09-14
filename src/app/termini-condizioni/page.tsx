export default function TerminiCondizioniPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="border-l-4 border-white pl-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Termini e Condizioni</h1>
        <p className="tag-label text-gray-400">Condizioni generali di vendita e reso</p>
      </div>

      <div className="space-y-12 text-sm text-gray-400">
        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">1. Natura dei Prodotti</h2>
          <p className="leading-relaxed">
            NOVUM STORE tratta capi streetwear e di archivio, spesso realizzati artigianalmente o venduti come &quot;Pezzi Unici (1/1)&quot;. Piccole imperfezioni, asimmetrie o variazioni di colore non sono da considerarsi difetti, ma testimonianze dell&apos;artigianalita&apos; del prodotto e del suo trattamento.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">2. Ordini e Disponibilita&apos;</h2>
          <p className="leading-relaxed">
            Data la natura limitata dei nostri Drop, l&apos;inserimento di un capo nel carrello non ne garantisce la prenotazione. L&apos;ordine si intende confermato solo al termine del processo di pagamento (gestito da Stripe) e alla ricezione dell&apos;email di conferma. Nel caso di ordini simultanei sullo stesso &quot;Pezzo Unico&quot;, il sistema rimborsera&apos; automaticamente l&apos;ordine processato per secondo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">3. Diritto di Recesso e Resi</h2>
          <p className="leading-relaxed">
            In conformita&apos; alla normativa vigente, il cliente ha diritto di recedere dall&apos;acquisto entro 14 giorni dalla ricezione della merce, <strong>ad eccezione</strong> dei prodotti chiaramente personalizzati o confezionati su misura (es. i capi 1/1 alterati su richiesta). Il capo deve essere restituito intonso, con tutte le etichette originali e il sigillo di garanzia non rimosso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white uppercase mb-4">4. Prezzi e Spedizioni</h2>
          <p className="leading-relaxed">
            Tutti i prezzi sono da intendersi IVA inclusa, ove applicabile. Le spese di spedizione, se non incluse in promozioni, vengono calcolate automaticamente al checkout in base all&apos;indirizzo di destinazione.
          </p>
        </section>
        
        <div className="pt-8 border-t tag-border">
          <p className="tag-label">Ultimo aggiornamento: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
