const CACHE_NAME = 'datphu-onebase-gen4-v1';
const ASSETS_TO_CACHE = [
    './zalo_ai_chat.html',
    './bao_gia_chatbox_ai.html',
    './bo_cong_cu_ban_hang_tuan1.html',
    './chien_luoc_phat_trien_datphu.html',
    './manifest.json',
    './logo_datphu.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
