const CACHE_NAME = 'pwa-anireka';
const urlsToCache = [
    '/',
    '/about',
    '/search'
];

const self = this;

//install sw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

//listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) return response;
                return fetch(event.request);
            })
    );
});
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(async() => {
//                 return fetch(event.request)
//                     .catch(() => caches.match('offline.html'))
//             })
//     );
// });

//activate sw
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['pwa-anireka'];
    // cacheWhitelist.push(CACHE_NAME);

    //keeps only the most current cache version
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});