// 艾米工作台 Service Worker - 离线缓存
const CACHE = 'aimi-v2';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll([
        './index.html',
        './tailwind.js',
        './manifest.json',
        './apple-touch-icon.png',
        './icon-192.png',
        './icon-512.png',
        './data/trends.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
