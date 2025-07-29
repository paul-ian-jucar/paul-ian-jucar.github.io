// sw.js - Service Worker for Pure HTML/CSS Project
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Skip waiting and claim clients
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Manual precaching - list your actual files here
workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1.0' },
  { url: '/index.html', revision: '1.0' },
  { url: '/manifest.json', revision: '1.0' },
  { url: '/assets/js/app.js', revision: '1.0' },
  { url: '/assets/js/indicator.js', revision: '1.0' },
  { url: '/assets/me.jpg', revision: '1.0' },
  { url: '/assets/logo.png', revision: '1.0' },
  { url: '/assets/favicon/favicon.svg', revision: '1.0' },
  { url: '/assets/favicon/favicon-96x96.png', revision: '1.0' },
  { url: '/assets/favicon/web-app-manifest-192x192.png', revision: '1.0' },
  { url: '/assets/favicon/web-app-manifest-512x512.png', revision: '1.0' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css', revision: null },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.css', revision: null },
  { url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap', revision: null },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js', revision: null },
  { url: 'https://code.jquery.com/jquery-3.7.1.min.js', revision: null }
]);

// Cache images with Cache First strategy
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      })
    ]
  })
);

// Cache CSS and JS files
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

// Cache HTML pages
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      })
    ]
  })
);

// Offline fallback
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/index.html');
  }
  return Response.error();
});

console.log('Workbox service worker loaded');