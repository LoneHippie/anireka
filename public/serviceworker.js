const CACHE_NAME = 'pwa-anireka';
const urlsToCache = [
    '/',
    '/about',
    '/search'
];

const self = this;

//install sw
self.addEventListener('install', (event) => {
    console.log('Service worker: installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service worker: caching assets');
                cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

//activate sw
self.addEventListener('activate', (event) => {
    //keeps only the most current cache version
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName !== CACHE_NAME) {
                    console.log('service worker: clearing old cache');
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});

//listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    )
});