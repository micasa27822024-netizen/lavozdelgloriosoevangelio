/* ============================================================================
   SERVICE WORKER — permite instalar la web como app y abrirla sin conexión
   ----------------------------------------------------------------------------
   IMPORTANTE: cada vez que publiques cambios, subí el número de versión
   (por ejemplo radio-v1 → radio-v2). Así los celulares descargan lo nuevo.
   ============================================================================ */

const VERSION = 'radio-v7';
const CACHE_NAME = 'plantilla-' + VERSION;

/* Archivos que se guardan para que la app abra aunque no haya internet.
   Si agregás imágenes o archivos nuevos, sumalos a esta lista. */
const ARCHIVOS_BASE = [
  './',
  './index.html',
  './config.js',
  './versiculos.js',
  './manifest.json',
  './assets/fondo-movil.jpg',
  './assets/fondo-escritorio.jpg',
  './assets/icono.png'
];

self.addEventListener('install', (evento) => {
  self.skipWaiting();

  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Se agregan uno por uno para que un archivo faltante no rompa la instalación
      return Promise.all(
        ARCHIVOS_BASE.map((archivo) =>
          cache.add(archivo).catch(() => null)
        )
      );
    })
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) => {
      return Promise.all(
        claves
          .filter((clave) => clave.startsWith('plantilla-') && clave !== CACHE_NAME)
          .map((clave) => caches.delete(clave))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const peticion = evento.request;

  // Solo se cachean pedidos GET del propio sitio
  if (peticion.method !== 'GET') return;

  const url = new URL(peticion.url);
  if (url.origin !== self.location.origin) return;

  // Navegación: primero internet, y si falla se usa la copia guardada
  if (peticion.mode === 'navigate') {
    evento.respondWith(
      fetch(peticion)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(peticion, copia));
          return respuesta;
        })
        .catch(() => caches.match(peticion).then((guardada) => guardada || caches.match('./index.html')))
    );
    return;
  }

  // Resto de archivos: se responde desde la caché y se actualiza en segundo plano
  evento.respondWith(
    caches.match(peticion).then((guardada) => {
      const desdeInternet = fetch(peticion)
        .then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            const copia = respuesta.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(peticion, copia));
          }
          return respuesta;
        })
        .catch(() => guardada);

      return guardada || desdeInternet;
    })
  );
});
