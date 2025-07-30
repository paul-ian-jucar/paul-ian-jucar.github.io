const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/style.css',
    '/assets/js/app.js',
    '/assets/js/indicator.js',
    '/assets/me.jpg',
    '/assets/logo.png',
    '/assets/favicon/favicon.svg',
    '/assets/favicon/favicon-96x96.png',
    '/assets/favicon/web-app-manifest-192x192.png',
    '/assets/favicon/web-app-manifest-512x512.png',
    '/assets/favicon/apple-touch-icon.png',
    '/assets/favicon/favicon.ico',
    '/assets/favicon/site.webmanifest',
    '/assets/images/1.png',
    '/assets/images/7.jpg',
    '/assets/images/8.jpg',
    '/assets/images/9.jpg',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.css',
    'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js',
    'https://code.jquery.com/jquery-3.7.1.min.js',
    'https://code.jquery.com/ui/1.13.2/jquery-ui.min.js',
    'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js',
    'https://unpkg.com/@popperjs/core@2',
    'https://unpkg.com/tippy.js@6'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Return cached version
                }
                return fetch(event.request)
                    .then((response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});