/* Penndex – service worker
   Serve per rendere il sito installabile come app e per aprirlo anche offline.
   Strategia: per la pagina prima la rete (così vedi sempre l’ultima versione
   pubblicata su GitHub), e solo se sei offline la copia salvata.
   Per icone e manifest: copia salvata subito, aggiornata in background.
   Non tocca le richieste verso altri siti (Google Fonts, GTM, legami.com)
   e non tocca la collezione, che resta in localStorage.
   Quando cambi la lista CORE, aumenta il numero in CACHE. */
const CACHE = "penndex-v2";
const CORE = [
  "./",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./favicon.ico",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.all(CORE.map((url) => cache.add(url).catch(() => {}))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pagina: prima la rete, poi la copia salvata
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("./", copy));
          }
          return res;
        })
        .catch(() => caches.match("./")),
    );
    return;
  }

  // Altri file del sito: copia salvata subito, aggiornata in background
  event.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    }),
  );
});
