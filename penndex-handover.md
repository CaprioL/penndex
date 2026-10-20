# Penndex: documento di handover

Questo documento spiega cosa è Penndex, come è costruito, come è pubblicato e come modificarlo in sicurezza. È pensato per te tra qualche mese, per chiunque ti aiuti con il codice, e per Claude o un altro assistente AI a cui chiederai nuove modifiche.

Ultimo aggiornamento: 20 ottobre 2026 (versione 4).

---

## 1. In breve

Penndex è un raccoglitore digitale, in stile Pokédex, della tua collezione di penne cancellabili Legami Milano.

- **Un solo file:** `index.html` (in origine `penndex.html`). Contiene HTML, CSS e JavaScript insieme. Nessun framework, nessuna libreria, nessun passaggio di build.
- **Dove vive:** su GitHub Pages, in un repository pubblico del tuo account gratuito. Funziona anche aprendo il file in locale dal computer.
- **Dove stanno i dati:** nel browser di ogni dispositivo (`localStorage`). Non su GitHub e non su un server. Ogni browser ha la sua copia della collezione.
- **Mobile-first:** pensato prima per il telefono, si adatta fino a schermi desktop larghi.

### Cosa fa

| Funzione | Descrizione |
|---|---|
| Catalogo | 29 penne: le 24 in vendita su legami.com al 19/10/2026 più 5 fuori produzione aggiunte il 20/10/2026 (Koala “Take It Easy”, Pig, Astronaut, Corgi, Flora). Ognuna con numero, nome, animale, frase e descrizione breve. |
| Link all’e-commerce | Le penne in vendita che non hai ancora mostrano “Acquista su legami.com” solo nella scheda di dettaglio (non nel listato), con UTM `utm_source=capriol&utm_medium=penndex`. Quando segni una penna come trovata il pulsante sparisce, e ricompare se la togli dalla collezione. Le penne fuori produzione non hanno link e nella scheda mostrano la pillola “Fuori produzione”. |
| Logo | Toccando “Penndex” si torna all’inizio: ricerca, filtro, ordinamento e vista tornano ai valori di partenza. |
| Stato a colpo d’occhio | Le penne che hai sono a colori, quelle che ti mancano sono in bianco e nero e più tenui. |
| Segna “ce l’ho” | Con il cerchio in alto a destra di ogni scheda oppure dal pulsante grande nel dettaglio. |
| Ricordo | Per ogni penna che hai: dove l’hai presa, quando, colore dell’inchiostro, note. |
| Diario “Ricordi” | Le penne trovate raggruppate per mese, più l’elenco dei posti dove le hai prese. |
| Ricerca, filtri, ordinamento | Cerca in nome, animale, frase, descrizione, luogo, note e inchiostro. Filtri Tutte / Ce l’ho / Mi mancano. Ordine per numero, nome o ultime trovate. |
| Immagini | Illustrazione automatica (penna + emoji dell’animale), sostituibile con una tua foto o con l’indirizzo di un’immagine. |
| Descrizione personalizzabile | Puoi sostituire la descrizione con quella della pagina prodotto Legami. |
| Penne aggiunte da te | Pulsante “Aggiungi penna” per nuove uscite ed edizioni limitate, modificabili ed eliminabili. |
| Tema scuro | Interruttore nel menu Impostazioni. Il tema chiaro è sempre quello di partenza. |
| Backup | Scarica e ripristina la collezione in un file `.json`, anche per spostarla tra dispositivi. |

---

## 2. Storia delle versioni

| Versione | Cosa è cambiato |
|---|---|
| 1 | Prima versione: catalogo di 24 penne, griglia, scheda di dettaglio, ricordi, backup, penne personalizzate. Seguiva il tema chiaro/scuro del sistema e mostrava il prezzo. |
| 2 | Palette bianca con dettagli rossi come legami.com. Tolto il tema scuro automatico. Corretto il bug della griglia su desktop (non era centrata né adattata alla larghezza). Tolto il prezzo e aggiunta la descrizione breve, modificabile. |
| 3 | Tema scuro attivabile a mano dal menu, ora chiamato “Impostazioni”. La scelta resta salvata. |
| — | Pubblicazione su GitHub Pages e uso su Android. |
| 4 | Aggiunte 5 penne fuori produzione (nuovi `id`: `koala-take-it-easy`, `pig`, `astronaut`, `corgi`, `flora`). Il logo azzera filtri e vista. Il luogo del ricordo compare accanto al numero e non sostituisce più la frase. Link “Acquista su legami.com” con UTM, solo nella scheda di dettaglio e solo per le penne che non hai. Disclaimer di non affiliazione nel footer. |

### Il bug della griglia (versione 2), spiegato

Nella prima versione la lista delle penne aveva insieme la classe `.wrap` (che centra il contenuto con `margin: 0 auto` e aggiunge il padding laterale) e la classe `.grid` (che impostava `margin: 0` e `padding: 18px 0 120px`). Le due classi hanno la stessa specificità CSS, quindi vinceva quella scritta dopo, `.grid`, che annullava centratura e padding. Risultato: su desktop la griglia stava attaccata a sinistra.

La correzione: ora `.wrap` è un contenitore esterno e `.grid` sta dentro, così ognuno fa il suo lavoro.

```html
<div class="wrap"><ul class="grid" id="grid"></ul></div>
```

Stesso schema per il diario dei ricordi e per il footer. **Regola da tenere:** non mettere `.wrap` sullo stesso elemento di un’altra classe che imposta margin o padding.

---

## 3. Pubblicazione e aggiornamento

### Come è pubblicato

1. Il file si chiama `index.html` nel repository GitHub (nome consigliato: `penndex`).
2. Repository **pubblico**: con l’account gratuito, GitHub Pages funziona solo così.
3. In *Settings → Pages*: sorgente “Deploy from a branch”, branch `main`, cartella `/ (root)`.
4. Indirizzo del sito: `https://TUONOME.github.io/penndex/`.
5. Su Android: aperto in Chrome e aggiunto con “Aggiungi a schermata Home”.

### Come aggiornare il sito

1. Modifica il file in locale (o fattelo modificare da Claude).
2. Assicurati che si chiami `index.html`.
3. Nel repository: *Add file → Upload files*, trascina il file, *Commit changes*. Sostituisce la versione precedente.
4. Attendi uno o due minuti e ricarica il sito. Se vedi ancora la vecchia versione, ricarica forzando (su desktop `Ctrl+Shift+R`, su Android chiudi e riapri la scheda).

**Gli aggiornamenti non toccano i dati della collezione**, purché tu rispetti le regole della sezione 5 (in particolare: non cambiare mai gli `id` delle penne).

Oltre a `index.html`, nel repository vanno anche `og-image.png`, `favicon.svg`, `favicon.ico` `apple-touch-icon.png`, `sitemap.xml`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` e `icon-maskable-512.png`, tutti nella radice (caricati una volta sola, finché non li cambi).

### App installabile (PWA)

Penndex si può installare come app (Android: menu di Chrome → “Installa app”; desktop: icona di installazione nella barra degli indirizzi). Si apre a schermo intero, senza la barra del browser, e funziona anche offline.

- `manifest.webmanifest`: nome, icone, colori e modalità `standalone`. `id`, `start_url` e `scope` puntano a `/penndex/`.
- Icone: `icon-192.png` e `icon-512.png` (quadrato rosso arrotondato con la P), `icon-maskable-512.png` (fondo pieno e P più piccola, così Android può ritagliarla a cerchio o goccia senza tagliare la lettera).
- `sw.js` (service worker), registrato in fondo allo script di `index.html` solo su `https` o `localhost`, quindi non in apertura locale da file. Per la pagina usa **prima la rete**, quindi gli aggiornamenti pubblicati su GitHub arrivano subito se sei online; offline mostra l’ultima copia salvata. Non intercetta richieste verso altri siti (font, GTM, legami.com).
- La collezione resta in `localStorage`: su Android l’app installata condivide i dati con Chrome sullo stesso indirizzo, quindi trovi la stessa collezione.
- Se aggiungi file da tenere offline, mettili nella lista `CORE` di `sw.js` e aumenta il numero in `CACHE` (`penndex-v2`, …).
- Se cambi il nome del repository, aggiorna `id` nel manifest.

### Google Search Console

- Proprietà di tipo **Prefisso URL** `https://capriol.github.io/penndex/` (la proprietà Dominio non è possibile su `github.io`). Verificata tramite Google Tag Manager: non rimuovere lo snippet GTM, altrimenti la verifica decade.
- Sitemap: `sitemap.xml` nella radice del repository, inviata in Search Console come `https://capriol.github.io/penndex/sitemap.xml`. Contiene una sola pagina. Quando fai modifiche importanti ai contenuti (per esempio nuove penne), aggiorna la data in `<lastmod>` (formato `AAAA-MM-GG`) e ricarica il file: non serve inviarla di nuovo.
- `robots.txt` non è gestibile da questo repository (Google lo cerca solo in `capriol.github.io/robots.txt`). Non serve: senza di esso tutto è scansionabile.

### Cose da non caricare mai nel repository

- I file di backup `.json`: il repository è pubblico, renderesti pubblici luoghi, date, note e foto.
- Foto personali.

### Privacy

Chi apre il link vede il sito con il catalogo vuoto. I tuoi dati restano nel tuo browser. Il link non è indicizzato attivamente, ma considera il codice del sito come pubblico.

---

## 4. Come funziona il salvataggio dei dati

### Dove

I dati sono nel `localStorage` del browser, legato all’indirizzo del sito. Conseguenze pratiche:

- Il sito su `TUONOME.github.io` e il file aperto in locale dal computer hanno **due collezioni separate**.
- Chrome sul telefono e Chrome sul computer hanno **due collezioni separate**.
- Cancellare i dati di navigazione del browser **cancella la collezione**. Per questo esiste il backup.
- Tutti i repository Pages del tuo account condividono lo stesso indirizzo di base (`TUONOME.github.io`), quindi le chiavi hanno il prefisso `penndex:` per non scontrarsi con eventuali altri progetti.

### Chiavi usate

| Chiave | Contenuto |
|---|---|
| `penndex:v1` | La collezione: stato delle penne, ricordi, foto, penne aggiunte da te. |
| `penndex:theme` | `"dark"` oppure `"light"`. |
| `penndex:consent` | Scelta sui cookie: `{ version: 1, analytics, marketing, date }`. Non finisce nel backup e non viene toccata da “Svuota la collezione”. Dopo 12 mesi, o se `version` cambia, il banner ricompare. |

### Struttura di `penndex:v1`

```json
{
  "entries": {
    "panda": {
      "owned": true,
      "date": "2026-10-19",
      "place": "Legami Milano, Duomo",
      "ink": "nero",
      "note": "Presa in gita con Giulia",
      "img": "data:image/jpeg;base64,... oppure https://...",
      "desc": "Descrizione personalizzata (facoltativa)"
    }
  },
  "custom": [
    {
      "id": "cm2abc123",
      "name": "Fox",
      "animal": "Volpe",
      "emoji": "🦊",
      "motto": "Stay Wild",
      "type": "Gel",
      "desc": "…",
      "deep": "#e2843a",
      "bg": "#f9e3d5"
    }
  ]
}
```

- `entries` è un dizionario indicizzato per `id` della penna. Contiene solo le penne che hai toccato almeno una volta.
- Tutti i campi di un’entry sono facoltativi.
- `date` è sempre nel formato `AAAA-MM-GG`. Quando segni una penna come trovata e la data è vuota, viene messa quella di oggi.
- `img`: una foto caricata è ridimensionata a massimo 640 px sul lato lungo e salvata come JPEG qualità 0,82 (circa 30–80 KB). In alternativa c’è un indirizzo `https://`.
- `desc` esiste solo se hai modificato la descrizione. Se la svuoti del tutto resta salvata come stringa vuota e la descrizione non compare (vedi sezione 9).
- `custom` contiene le penne aggiunte con “Aggiungi penna”. Il loro `id` inizia con `c` seguito da un codice generato dall’ora.

### File di backup

Il backup scaricato dal menu ha la stessa struttura, con in più tre campi informativi: `app: "penndex"`, `version: 1`, `exported` (data e ora). Il ripristino controlla solo che esista `entries` e **sostituisce** l’intera collezione del browser (dopo conferma).

### Limite di spazio

`localStorage` ha circa 5 MB per sito. Con le foto ridimensionate ci stanno comodamente qualche decina di foto. Se lo spazio finisce compare il messaggio “Memoria piena: usa una foto più piccola o rimuovine qualcuna.” e l’ultima modifica non viene salvata. Usare un indirizzo di immagine invece di caricare foto non occupa spazio.

---

## 5. Aggiungere penne in futuro

Ci sono due modi. Scegli in base a quello che ti serve.

### Modo A: dal sito, con “Aggiungi penna” (nessun codice)

Ideale per una penna nuova da aggiungere al volo. La penna vive solo nel browser in cui la aggiungi (va nel backup, ma non nel file del sito). Si può modificare ed eliminare dalla sua scheda.

### Modo B: nel catalogo dentro il file (consigliato per uscite “ufficiali”)

La penna diventa parte del sito e compare su tutti i dispositivi dopo l’aggiornamento su GitHub.

Apri `index.html`, cerca `const CATALOG = [` (sezione “Catalogo di partenza”) e aggiungi un oggetto **in fondo alla lista**, prima di `];`:

```js
  {id:"fox",name:"Fox",animal:"Volpe",emoji:"🦊",motto:"Stay Wild",type:"Gel",bg:"#FCE3D3",deep:"#E2843A",
   desc:"Penna gel cancellabile con la volpe e la frase “Stay Wild”."}
```

Attenzione alla virgola: l’oggetto precedente deve finire con `},` e l’ultimo della lista con `}`.

#### I campi

| Campo | Obbligatorio | Cosa è | Esempio |
|---|---|---|---|
| `id` | Sì | Identificativo unico e definitivo. Solo minuscole, numeri e trattini. | `"fox"`, `"panda-halloween"` |
| `name` | Sì | Nome principale mostrato in grande, di solito il nome inglese del “friend” Legami. | `"Fox"` |
| `animal` | Sì | Animale di riferimento in italiano, sotto il nome. | `"Volpe"` |
| `emoji` | Sì | Emoji usata nell’illustrazione automatica. | `"🦊"` |
| `motto` | Sì | La frase scritta sulla penna, senza virgolette. Si può lasciare `""`. | `"Stay Wild"` |
| `type` | Sì | Etichetta del tipo, mostrata come pillola nella scheda. | `"Gel"`, `"Penna"`, `"3 colori"`, `"Set da 3"`, `"Blind box"` |
| `bg` | Sì | Colore chiaro di sfondo del riquadro immagine. | `"#FCE3D3"` |
| `deep` | Sì | Colore pieno del fusto della penna disegnata. | `"#E2843A"` |
| `desc` | No | Descrizione breve mostrata nella scheda. | `"Penna gel…"` |
| `shop` | No | Indirizzo della pagina e-commerce. Se c’è, nella scheda delle penne che non hai compare il pulsante “Acquista su legami.com”; le UTM si aggiungono da sole (`shopURL()`). Oggi le 24 penne in vendita usano `SHOP_LIST`, la pagina con tutte le penne cancellabili: per puntare al singolo prodotto basta sostituire `SHOP_LIST` con l’indirizzo della pagina della penna. | `SHOP_LIST`, `"https://www.legami.com/…"` |
| `retired` | No | `true` per le penne fuori produzione: niente link e pillola “Fuori produzione” nella scheda. Se una penna esce dal commercio, togli `shop` e aggiungi `retired: true`. | `true` |

Consiglio sui colori: scegli prima `deep` (il colore “vero” della penna), poi per `bg` usa una versione molto chiara dello stesso colore. Le penne aggiunte dal sito calcolano `bg` da sole con la funzione `tint()`, che mescola il colore con il 78% di bianco.

#### Le regole d’oro

1. **Non cambiare mai l’`id` di una penna esistente.** I ricordi, le foto e lo stato “ce l’ho” sono collegati all’`id`: cambiandolo, quella penna risulterebbe nuova e i suoi dati sparirebbero dalla vista (restano nel salvataggio, ma orfani).
2. **Due penne non possono avere lo stesso `id`.**
3. **Aggiungi sempre in fondo.** Il numero “N. 001, N. 002…” è la posizione nella lista. Inserire una penna in mezzo fa slittare i numeri di tutte quelle dopo. I dati non si perdono, ma i numeri a cui sei abituato cambiano.
4. **Non eliminare penne dal catalogo** se le hai già segnate: sparirebbero dalla vista insieme ai ricordi. Se una penna esce dal commercio, lasciala: è comunque parte della collezione.
5. Le penne aggiunte dal sito (Modo A) sono numerate **dopo** quelle del catalogo. Aggiungendo penne al catalogo, i loro numeri si spostano in avanti. È normale.

#### Se una penna aggiunta dal sito entra nel catalogo

Se avevi aggiunto “Fox” dal sito e poi la metti anche nel catalogo, la vedrai due volte. Due strade:

- **Semplice:** non aggiungerla al catalogo e continua a usare quella creata dal sito.
- **Pulita:** nel catalogo usa come `id` lo stesso `id` della penna personalizzata (lo trovi nel file di backup, in `custom`, per esempio `"cm2abc123"`). Poi elimina la penna personalizzata dalla sua scheda: i ricordi restano collegati alla versione del catalogo. Attenzione: l’eliminazione cancella anche i ricordi di quell’`id`, quindi in questo caso fai prima un backup, poi modifica il file di backup togliendo la penna da `custom` e ripristinalo. Se non ti senti sicuro, chiedi a Claude allegando il backup.

#### Varianti colore

Su legami.com molte penne mostrano “+17”, cioè più colori dello stesso modello. Oggi il colore si annota nel campo testo “Colore inchiostro”. Se vuoi collezionare le varianti come voci separate, puoi aggiungerle come penne a sé con `id` distinti (per esempio `"panda-blu"`, `"panda-rosa"`) oppure chiedere un’evoluzione con una spunta per colore (vedi sezione 8).

---

## 6. Struttura del file

Il file è diviso in tre parti, nell’ordine: `<head>` con gli stili, `<body>` con il markup statico, `<script>` con tutta la logica.

### 6.1 Head

- `meta viewport` con `viewport-fit=cover`: il sito usa tutto lo schermo del telefono e tiene i contenuti lontani da notch e barre di sistema grazie a `env(safe-area-inset-*)`.
- `meta theme-color`: colore della barra del browser su Android. Rosso nel tema chiaro, quasi nero nel tema scuro (aggiornato da `applyTheme()`).
- Un piccolo script legge `penndex:theme` **prima** che la pagina venga disegnata e imposta `data-theme="dark"` sull’elemento `<html>`, così il tema scuro non mostra un lampo bianco all’avvio.
- SEO: `<title>` «Penndex – Collezione di penne cancellabili Legami» (49 caratteri) e `meta description` (154 caratteri), riprese nei tag Open Graph (`og:title`, `og:description`) per l’anteprima quando il link viene condiviso. Se cambi titolo o descrizione, aggiorna entrambe le coppie. Restare sotto circa 60 caratteri per il titolo e 155–160 per la descrizione evita che Google li tronchi.
- Indirizzo ufficiale: `https://capriol.github.io/penndex/`, dichiarato in `<link rel="canonical">` e `og:url`. Se cambi nome al repository, aggiornali.
- Favicon: la “P” di Penndex in Fredoka, bianca su quadrato rosso `#e2231a` (la lettera è convertita in tracciato, quindi non dipende dal font). Tre file nella radice del repository: `favicon.svg` (browser moderni, nitida a ogni dimensione), `favicon.ico` (16, 32 e 48 px, per browser vecchi e risultati di Google) e `apple-touch-icon.png` (180 px, icona quando aggiungi il sito alla schermata Home). Se cambi il rosso in `--accent`, rigenerali.
- Immagine di anteprima: `og-image.png` (1200×630, logo Penndex), da tenere nella radice del repository accanto a `index.html`. È referenziata con indirizzo assoluto in `og:image` e `twitter:image`.
- Google Tag Manager (contenitore `GTM-TMQRGMMJ`): lo script è subito dopo `meta charset` nel `<head>`, il `<noscript>` è il primo elemento del `<body>`. I tag (Analytics ecc.) si configurano dal pannello di GTM, non nel file. GTM non legge la collezione in `localStorage` a meno che non lo configuri tu.
- Font da Google Fonts: **Fredoka** (titoli, numeri, nomi: arrotondato e giocoso come il mondo Legami) e **DM Sans** (testo). Senza connessione si usano i font di sistema indicati come alternativa: il sito resta perfettamente utilizzabile.

### 6.2 Design token (variabili CSS)

Tutti i colori passano da variabili definite su `:root`. Per cambiare l’aspetto di tutto il sito basta cambiare qui.

| Variabile | Tema chiaro | Tema scuro | Uso |
|---|---|---|---|
| `--paper` | `#ffffff` | `#161616` | Sfondo pagina e superfici principali |
| `--ink` | `#1d1d1b` | `#f2f2f0` | Testo principale, bordo della cartuccia |
| `--muted` | `#6b6b6b` | `#a3a3a0` | Testi secondari |
| `--line` | `#e6e6e6` | `#2e2e2e` | Bordi e separatori |
| `--surface` | `#f6f6f6` | `#222222` | Campi di testo, pillole, interno cartuccia |
| `--accent` | `#e2231a` | `#ff4136` | Il rosso Legami: striscia, titolo, numeri, pulsanti, spunte |
| `--accent-soft` | `#fdeceb` | rosso al 16% | Sfondo del pulsante “Ce l’ho!” attivo |
| `--on-accent` | `#ffffff` | `#ffffff` | Testo sopra il rosso |
| `--danger` | `#b3150e` | `#ff6b61` | Pulsanti di eliminazione |
| `--backdrop` | nero al 45% | nero al 60% | Velo dietro schede e menu |
| `--tick-off` | (non definita, usa `#c9c9c9`) | `#5a5a5a` | Spunta delle penne mancanti |

Le variabili `--display` e `--body` contengono i font.

Il tema scuro è il blocco `:root[data-theme="dark"]`. Subito dopo ci sono poche regole specifiche: immagini leggermente scurite, penne mancanti ancora più spente, toast invertito.

### 6.3 Sezioni del CSS, in ordine

| Commento nel CSS | Cosa governa |
|---|---|
| Striscia | La barra rossa in cima con il messaggio “Ti mancano ancora N penne”. |
| Testata | Titolo “Penndex”, sottotitolo, pulsante del menu. |
| Logo compatto | `.minibar`: barra fissa alta `--mini-h` (52 px) con il logo piccolo e il pulsante Impostazioni. Compare quando il logo grande esce in alto dallo schermo (classe `compact` su `<html>`); intanto la barra strumenti scende di `--mini-h` per restare subito sotto. Nella vista Ricordi, dove la barra strumenti non c’è, prende una linea di separazione. |
| Cartuccia d’inchiostro | La barra di avanzamento a forma di cartuccia, con punta disegnata da `.cartridge-wrap::after`. |
| Schede di navigazione | I due pulsanti Collezione / Ricordi. |
| Barra strumenti | Ricerca, filtri, ordinamento. È `sticky`: resta in alto durante lo scorrimento. |
| Griglia penne | Le card. Vedi sotto i breakpoint. |
| Diario dei ricordi | Elenco per mese e chip dei luoghi. |
| Pulsante flottante | “Aggiungi penna”, fisso in basso a destra. |
| Foglio di dettaglio | La scheda che si apre toccando una penna. |
| Menu | Impostazioni: tema scuro e backup. |

### 6.4 Comportamento responsive

Il CSS è scritto prima per il telefono, poi allarga con `min-width`.

| Larghezza | Comportamento |
|---|---|
| Sotto 600 px | Griglia a 2 colonne. Scheda di dettaglio che sale dal basso (bottom sheet). |
| Da 600 px | Griglia fluida: `repeat(auto-fill, minmax(190px, 1fr))`, cioè tante colonne quante ne entrano con card larghe almeno 190 px. A 1440 px sono 6. |
| Da 720 px | La scheda di dettaglio diventa una finestra centrata larga al massimo 560 px. |
| Da 760 px | Nel diario i ricordi vanno su 2 colonne. |
| Da 900 px | Margini laterali da 16 a 32 px. |
| Oltre 1440 px | Il contenuto resta largo 1440 px e centrato (`.wrap`). |

Per card più grandi o più piccole su desktop cambia `190px` nella regola `.grid` dentro `@media (min-width:600px)`. Per allargare il sito oltre 1440 px cambia `max-width` in `.wrap`.

### 6.5 Il bianco e nero delle penne mancanti

```css
.is-missing .art{filter:grayscale(1) contrast(.92);opacity:.5}
```

Ogni card ha la classe `is-owned` o `is-missing`. Il filtro si applica al riquadro immagine, sia all’illustrazione sia alle foto. La spunta è fuori dal riquadro, quindi resta sempre leggibile. Il passaggio tra colore e bianco e nero ha una transizione di 0,45 secondi. Nella scheda di dettaglio lo stesso effetto è applicato via JavaScript dentro `drawSheet()`.

### 6.6 Markup statico del body

| Elemento | id / classe | Ruolo |
|---|---|---|
| Striscia | `#strip` | Testo aggiornato da `renderProgress()`. |
| Barra avanzamento | `#bar`, `#fill`, `#ownedN`, `#totalN`, `#pct` | Aggiornati da `renderProgress()`. Accessibile come `role="progressbar"`. |
| Schede | `[data-tab="collection"]`, `[data-tab="memories"]` | Cambiano vista con `setTab()`. |
| Vista collezione | `#viewCollection`, `#grid` | La griglia è generata da `renderGrid()`. |
| Ricerca | `#q` | |
| Filtri | `[data-filter="all|owned|missing"]` e contatori `#cAll`, `#cOwned`, `#cMissing` | |
| Ordinamento | `#sort` | Valori `num`, `name`, `date`. |
| Vista ricordi | `#viewMemories`, `#memories` | Generata da `renderMemories()`. |
| Scheda di dettaglio | `dialog#sheet`, contenuto in `#sheetIn` | Generata da `drawSheet()` o `drawNew()`. |
| Menu | `dialog#menu`, `#themeSwitch`, `#importFile` | |
| Avvisi | `#toast` | `aria-live="polite"`, letto dagli screen reader. |

---

## 7. La logica JavaScript

Tutto lo script è racchiuso in una funzione che si esegue subito (`(function(){ … })();`), così nessuna variabile finisce nello spazio globale. È diviso in sezioni con commenti `/* ---------- … ---------- */`.

### 7.1 Stato

- `CATALOG`: l’elenco fisso delle penne (sezione 5).
- `state`: i dati salvati, `{ entries, custom }`, caricati da `load()`.
- `view`: lo stato dell’interfaccia, non salvato: `{ tab, filter, q, sort }`.
- `current`: l’`id` della penna aperta nella scheda di dettaglio (o `null`).

### 7.2 Funzioni principali

| Funzione | Cosa fa |
|---|---|
| `load()` | Legge `penndex:v1`. Se manca o è rovinato, parte da una collezione vuota. |
| `save()` | Scrive `state` in `localStorage`. Se lo spazio è finito mostra un avviso e restituisce `false`. |
| `queueSave()` | Salvataggio ritardato di 350 ms, usato mentre scrivi nei campi per non salvare a ogni lettera. Mostra “Salvato” nella scheda. |
| `pens()` | Restituisce catalogo + penne personalizzate, ognuna arricchita con `n` (numero progressivo) ed `e` (la sua entry salvata). È la fonte unica per tutte le viste. |
| `findPen(id)` / `entry(id)` | Trova una penna; restituisce (creandola se manca) la sua entry. |
| `tint(hex)` | Schiarisce un colore: usato per lo sfondo delle penne personalizzate. |
| `art(p)` | Disegna l’illustrazione SVG: fusto inclinato nel colore `deep`, impugnatura, clip, punta, e l’emoji come cappuccio. Se c’è una foto (`e.img`) la sovrappone. |
| `renderProgress()` | Aggiorna cartuccia, contatori, percentuale e testo della striscia rossa. |
| `cardHTML(p)` | Genera una card della griglia. La frase è sempre visibile. Se la penna è tua e ha un luogo, il luogo compare con il pin sulla stessa riga del numero, separato da una sottile linea verticale (troncato con “…” se lungo). Nessun link all’e-commerce nel listato. |
| `shopURL(p)` | Restituisce l’indirizzo e-commerce della penna con le UTM di `UTM` (`utm_source=capriol`, `utm_medium=penndex`), oppure stringa vuota se la penna non ha `shop`. |
| `resetView(full)` | Azzera ricerca e filtro; con `full` anche ordinamento e vista (torna a Collezione). Usata da “Mostra tutte le penne” e dal logo. |
| `renderGrid()` | Applica filtro, ricerca e ordinamento, poi disegna la griglia o il messaggio “nessun risultato”. |
| `renderMemories()` | Disegna il diario: chip dei luoghi ordinati per numero di penne, poi gruppi per mese (più recenti prima, “Senza data” in fondo). |
| `render()` | Ridisegna la vista attiva. |
| `drawSheet()` | Costruisce la scheda di dettaglio della penna `current`. Il pulsante “Acquista su legami.com” compare solo se la penna ha `shop` e non è tua. La sezione “Il ricordo” compare solo se la penna è tua. La sezione “Dati della penna” solo per le penne aggiunte da te. |
| `openSheet(id)` | Apre la scheda di una penna. |
| `drawNew()` | Costruisce il modulo “Nuova penna”. |
| `toggle(id)` | Inverte “ce l’ho / mi manca”, mette la data di oggi se vuota, salva, mostra un avviso. |
| `fileToDataURL(file)` | Ridimensiona una foto caricata a massimo 640 px e la converte in JPEG. |
| `knownPlaces()` | Elenco dei luoghi già usati, per i suggerimenti del campo “Dove l’ho presa”. |
| `setTab(tab)` | Passa da Collezione a Ricordi e viceversa e scrive la vista in `data-tab` su `<html>`. |
| Osservatore del logo | Un `IntersectionObserver` sul titolo grande attiva o disattiva la classe `compact` e rende la barra compatta raggiungibile da tastiera e screen reader solo quando è visibile (`inert`, `aria-hidden`). |
| `applyTheme(dark)` | Attiva o disattiva il tema scuro, aggiorna interruttore e colore della barra del browser, salva la scelta. |
| `toast(msg)` | Mostra un avviso per 2,2 secondi. |
| `esc(s)` | Protegge il testo che inserisci (nomi, note) prima di metterlo nella pagina. **Ogni dato dell’utente inserito nell’HTML deve passare da `esc()`.** |

### 7.3 Come sono gestiti i clic (attributi `data-*`)

C’è un unico ascoltatore dei clic su tutto il documento. Riconosce l’azione dall’attributo dell’elemento cliccato:

| Attributo | Effetto |
|---|---|
| `data-toggle="id"` | Segna o toglie una penna (spunta sulla card). |
| `data-open="id"` | Apre la scheda di una penna. |
| `data-sheet-toggle` | Pulsante grande “Ce l’ho” dentro la scheda. |
| `data-filter="…"` | Cambia filtro. |
| `data-tab="…"` | Cambia vista. |
| `data-place="…"` | Dal diario: cerca quel luogo nella collezione. |
| `data-close` | Chiude la finestra in cui si trova. |
| `data-action="menu"` | Apre le Impostazioni. |
| `data-action="theme"` | Attiva/disattiva il tema scuro. |
| `data-action="new"` | Apre il modulo “Nuova penna”. |
| `data-action="create"` | Crea la nuova penna dal modulo. |
| `data-action="clear"` | Azzera ricerca e filtri. |
| `data-action="consent-open"` | Riapre il banner cookie con il pannello delle scelte (footer e Impostazioni). |
| `data-action="consent-accept"`, `"consent-reject"`, `"consent-close"`, `"consent-custom"`, `"consent-toggle"` | Pulsanti del banner cookie (vedi 7.5 bis). |
| `data-action="home"` | Sul logo: azzera ricerca, filtri, ordinamento e vista, torna in cima alla pagina e mostra “Filtri azzerati” se c’era qualcosa di attivo. |
| `data-action="clearimg"` | Torna all’illustrazione. |
| `data-action="delete"` | Elimina una penna personalizzata (con conferma). |
| `data-action="export"` | Scarica il backup. |
| `data-action="reset"` | Svuota la collezione (con conferma). |

**Per aggiungere un nuovo pulsante:** dagli un attributo `data-action="nome"`. Gli elementi con `data-action` sono già riconosciuti dall’ascoltatore, quindi basta aggiungere al suo interno una riga `if(a==="nome"){ … }` con quello che deve succedere.

### 7.4 Come sono salvati i campi della scheda

Il nome del campo decide dove va il valore:

- `name="m_qualcosa"` → salvato in `entries[id].qualcosa`. Esempi: `m_place`, `m_date`, `m_ink`, `m_note`, `m_desc`.
- `name="c_qualcosa"` → salvato nella penna personalizzata, `custom[…].qualcosa`. Esempi: `c_name`, `c_emoji`, `c_deep`.
- `name="photo"` e `name="imgurl"` → gestiti a parte (foto e indirizzo immagine).

Il salvataggio è automatico mentre scrivi, e viene forzato alla chiusura della scheda.

### 7.5 Descrizione

Nella scheda si mostra `entries[id].desc` se esiste, altrimenti la `desc` del catalogo. Mentre scrivi nel campo “Descrizione”, il paragrafo sotto il titolo si aggiorna in diretta. Anche la ricerca usa la descrizione.

### 7.5 bis Banner cookie e consenso

**Comportamento.** Il banner compare in basso alla prima visita (o dopo 12 mesi) e nasconde il pulsante “Aggiungi penna” finché è aperto. Offre tre scelte con lo stesso peso visivo, “Rifiuta”, “Personalizza” e “Accetta tutti”, più la X. La X equivale a rifiutare, come chiede il Garante Privacy. “Personalizza” mostra tre interruttori: Necessari (sempre attivi), Statistiche e Marketing. Il pulsante diventa poi “Salva le scelte”. Il banner si riapre da “Preferenze cookie”, nel footer e in Impostazioni → Privacy.

**Consent Mode v2.** Nel `<head>`, **prima** dello snippet di GTM, uno script imposta i valori di partenza con `gtag("consent","default", …)`: tutto `denied` tranne `functionality_storage` e `security_storage`, con `wait_for_update: 500`. Se c’è una scelta salvata, la applica subito con `gtag("consent","update", …)`. Corrispondenza delle categorie:

| Categoria | Segnali Consent Mode |
|---|---|
| Statistiche | `analytics_storage` |
| Marketing | `ad_storage`, `ad_user_data`, `ad_personalization` |

Se preferisci gestire la Consent Mode solo da GTM (per esempio con un template), nello script del `<head>` metti `native = false`: il sito smette di inviare i comandi `gtag("consent", …)` ma continua a fare tutti i push qui sotto.

**Eventi nel `dataLayer`.** Ogni push porta le variabili `consent_analytics` e `consent_marketing` (`"granted"`/`"denied"`) dove indicato.

| Evento | Quando | Variabili extra |
|---|---|---|
| `consent_default` | A ogni caricamento, prima di GTM | `consent_status` (`stored`/`unset`), `consent_analytics`, `consent_marketing` |
| `consent_banner_view` | Il banner si apre | `consent_source` (`auto`, `footer`, `settings`), `consent_status`, `consent_analytics`, `consent_marketing` |
| `consent_preferences_open` | Si apre il pannello “Personalizza” | `consent_source` (`banner`, `footer`, `settings`) |
| `consent_toggle` | Si sposta un interruttore (non ancora salvato) | `consent_category` (`analytics`/`marketing`), `consent_value` |
| `consent_accept_all` | “Accetta tutti” | `consent_analytics`, `consent_marketing` |
| `consent_reject_all` | “Rifiuta” | `consent_analytics`, `consent_marketing` |
| `consent_close` | X (vale come rifiuto) | `consent_analytics`, `consent_marketing` |
| `consent_custom_save` | “Salva le scelte” | `consent_analytics`, `consent_marketing` |
| `consent_update` | Dopo **ogni** scelta salvata, subito dopo l’evento specifico | `consent_action` (`accept_all`, `reject_all`, `close`, `custom_save`), `consent_analytics`, `consent_marketing` |

**Configurazione consigliata in GTM.** Crea due variabili “Variabile livello di dati” (`consent_analytics`, `consent_marketing`). Usa trigger “Evento personalizzato” su `consent_default` (con condizione `consent_analytics` uguale a `granted`) e su `consent_update` per far partire i tag solo quando c’è il consenso. Per GA4 e Google Ads basta la Consent Mode: nelle impostazioni del tag, “Impostazioni del consenso” → richiedi `analytics_storage` o `ad_storage`.

### 7.6 Immagini

1. Di base: illustrazione SVG generata da `art()`.
2. “Carica una foto”: la foto viene ridimensionata e salvata dentro la collezione.
3. “Indirizzo dell’immagine”: deve iniziare con `http://` o `https://`. Non occupa spazio. Su legami.com: tasto destro sulla foto del prodotto, “Copia indirizzo immagine”.
4. Se un’immagine non si carica (link rotto, niente connessione), viene rimossa dalla vista e torna l’illustrazione. Il link resta salvato.
5. “Usa l’illustrazione” cancella la foto o il link.

---

## 8. Ricette per le personalizzazioni più probabili

Ogni ricetta indica dove intervenire. Dopo ogni modifica: apri il file in locale, prova, poi carica su GitHub.

### Cambiare il rosso

Cambia `--accent` (e `--accent-soft`) nel blocco `:root`, e `--accent` nel blocco `:root[data-theme="dark"]`. Aggiorna anche `#e2231a` in `<meta name="theme-color">` e dentro `applyTheme()`.

### Cambiare testi (titolo, sottotitolo, messaggi)

- Titolo e sottotitolo: nel body, dentro `<div class="top">`.
- Messaggio della striscia rossa: in `renderProgress()`.
- Avvisi: cerca `toast(` nello script.
- Footer: in fondo al body.

Convenzione tipografica usata: apostrofo tipografico `’` (l’ho, Ce l’ho) e virgolette `“ ”` nei testi visibili; virgolette dritte solo nel codice.

### Aggiungere un nuovo campo al ricordo (per esempio “Regalata da”)

In `drawSheet()`, dentro la sezione “Il ricordo”, aggiungi:

```html
<label class="field"><span>Regalata da</span><input name="m_giftFrom" value="${esc(p.e.giftFrom)}"></label>
```

Il salvataggio funziona da solo grazie al prefisso `m_`. Per includerlo nella ricerca, aggiungi `p.e.giftFrom` all’elenco dentro `renderGrid()`. Per mostrarlo nel diario, aggiungilo in `renderMemories()`.

### Aggiungere un tipo di penna al modulo “Nuova penna”

In `drawNew()`, aggiungi un `<option>` alla `select` con `id="nType"`.

### Aggiungere un filtro (per esempio “Solo gel”)

1. Nel body, nella `div.filters`, aggiungi `<button class="chip" data-filter="gel" aria-pressed="false">Gel</button>`.
2. In `renderGrid()`, nel filtro, aggiungi `if(view.filter==="gel" && p.type!=="Gel") return false;`.

### Aggiungere un ordinamento

1. Aggiungi un `<option>` in `#sort`.
2. In `renderGrid()`, aggiungi `if(view.sort==="valore") list.sort(…)`.

### Varianti colore con spunta per colore (evoluzione possibile)

Richiede di aggiungere al catalogo un campo come `colors:["nero","blu","rosa"]`, salvare in entry un oggetto `colorsOwned`, mostrare le spunte nella scheda e decidere se la penna è “tua” quando hai almeno un colore. È una modifica media: meglio chiederla a Claude allegando file e handover.

### Sincronizzare i dispositivi automaticamente

Oggi non è possibile: i dati sono nel browser. Richiederebbe un servizio esterno (per esempio un database online con login). È un cambio di architettura, non una piccola modifica. L’alternativa attuale è il backup manuale.

---

## 9. Limiti noti e cose da sapere

- **Immagini ufficiali:** non sono incluse. Ogni penna usa un’illustrazione con emoji finché non carichi una foto o incolli un link. Le emoji hanno un aspetto diverso a seconda del sistema (Android, iPhone, Windows).
- **Descrizioni:** le descrizioni di partenza sono scritte a partire dalle informazioni sulle penne, perché le pagine prodotto ufficiali non erano accessibili. Puoi sostituirle con quelle di legami.com dal campo “Descrizione”.
- **Descrizione svuotata:** se cancelli tutto il testo, resta salvata una descrizione vuota e non compare nulla. Per tornare a quella di partenza bisogna oggi rimuovere il campo `desc` dal backup, oppure ricopiarla a mano. Possibile miglioria: un pulsante “Ripristina descrizione originale”.
- **Catalogo fermo al 20/10/2026:** le nuove uscite vanno aggiunte a mano (sezione 5).
- **Dati per browser:** nessuna sincronizzazione automatica. Fai backup regolari.
- **Apertura locale su Android e iPhone:** aprire il file direttamente dal telefono è poco affidabile e i dati potrebbero non restare salvati. Per questo il sito è su GitHub Pages.
- **Font:** senza connessione si vedono i font di sistema. Funziona tutto comunque.
- **Ripristino backup:** sostituisce la collezione, non la unisce.
- **Progetto personale, non affiliato a Legami.** Il logo Legami non è usato. Lo stile si ispira al sito (bianco, rosso, forme morbide). Il footer lo dichiara esplicitamente.
- **Link e-commerce:** oggi puntano tutti alla pagina elenco delle penne cancellabili di legami.com (versione it-ch), perché gli indirizzi delle singole schede prodotto non erano leggibili automaticamente. Se un link smette di funzionare o vuoi la pagina della singola penna, cambia `SHOP_LIST` o il campo `shop` di quella penna.
- **Penne fuori produzione:** colori e frasi delle 5 penne aggiunte il 20/10/2026 sono ricavati dalle schede dei rivenditori; i colori `deep`/`bg` richiamano l’inchiostro, non necessariamente il fusto reale.
- **Penne doppie:** se avevi già aggiunto dal sito una di queste 5 penne (Modo A), ora la vedi due volte. Vedi la sezione 5, “Se una penna aggiunta dal sito entra nel catalogo”.

---

## 10. Checklist prima di pubblicare una modifica

1. Fai un **backup** dal sito online (Impostazioni → Scarica il backup).
2. Modifica il file e aprilo in locale nel browser del computer.
3. Controlla che la griglia si veda e che non ci siano errori: su Chrome desktop `F12` → scheda *Console*, non devono esserci righe rosse.
4. Prova a stringere la finestra fino a larghezza telefono (oppure `F12` → icona del telefono) e prova anche il tema scuro.
5. Se hai aggiunto penne: `id` unici, aggiunte in fondo, virgole corrette.
6. Rinomina in `index.html` e carica su GitHub.
7. Dopo un paio di minuti, apri il sito sul telefono e controlla che la collezione ci sia ancora.

Se qualcosa va storto: ricarica su GitHub la versione precedente del file (GitHub conserva la cronologia: nel repository apri il file, *History*, e da lì puoi recuperare le versioni vecchie), e se servisse ripristina il backup.

---

## 11. Come chiedere modifiche a Claude (o a un altro assistente)

Per ottenere modifiche precise e senza perdere dati, in una nuova conversazione:

1. **Allega** `index.html` (la versione attuale presa da GitHub) e questo `penndex-handover.md`.
2. Descrivi la modifica in modo concreto. Esempi:
   - “Aggiungi al catalogo queste tre penne: Fox ‘Stay Wild’ gel, …”
   - “Aggiungi al ricordo il campo ‘Regalata da’ e mostralo nel diario.”
   - “Voglio una spunta per ogni colore d’inchiostro.”
3. Ricorda queste richieste fisse:
   - non cambiare gli `id` esistenti e aggiungi le penne in fondo al catalogo;
   - mantieni compatibili le chiavi `penndex:v1` e `penndex:theme` e la struttura dei dati, oppure prevedi una migrazione automatica;
   - restituisci un unico file HTML autonomo, chiamato `index.html`;
   - aggiorna anche questo documento di handover.

Se una modifica richiede di cambiare la struttura dei dati, la soluzione corretta è leggere i dati vecchi e convertirli all’avvio (per esempio passando a una chiave `penndex:v2` dopo aver letto `penndex:v1`), così la collezione esistente non si perde.
