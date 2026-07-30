// dino sw v3 - clear all old cache
const CACHE = 'dino-v3';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(cache => cache.put(e.request, c)); return res; }).catch(() => caches.match(e.request))); } });