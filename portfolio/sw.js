// Import Workbox
importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.js');

// Check if Workbox loaded successfully
if (workbox) {
    console.log('Workbox loaded successfully');

    // Set Workbox configuration
    workbox.setConfig({
        modulePathPrefix: 'https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/',
        debug: false
    });

    // Clean up outdated caches
    workbox.precaching.cleanupOutdatedCaches();

    // Precache and route for the app shell
    workbox.precaching.precacheAndRoute([
        { url: './', revision: '1' },
        { url: './index.html', revision: '1' },
        { url: './manifest.json', revision: '1' },
        { url: './assets/css/custom.css', revision: '1' },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css', revision: '1' },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.css', revision: '1' },
        { url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap', revision: '1' },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js', revision: '1' }
    ]);

    // Cache page navigations (HTML) with Network First strategy
    // This ensures users get fresh content when online, but can still access cached content when offline
    workbox.routing.registerRoute(
        ({ request }) => request.mode === 'navigate',
        new workbox.strategies.NetworkFirst({
            cacheName: 'pages-cache',
            plugins: [
                {
                    cacheKeyWillBeUsed: async ({ request }) => {
                        return request.url;
                    }
                }
            ]
        })
    );

    // Cache CSS and JavaScript files with Stale While Revalidate strategy
    // This provides fast loading while keeping resources updated in the background
    workbox.routing.registerRoute(
        ({ request }) =>
            request.destination === 'style' ||
            request.destination === 'script',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
            plugins: [
                {
                    cacheExpiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                    }
                }
            ]
        })
    );

    // Cache images with Cache First strategy
    // Images don't change often, so serve from cache first for better performance
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: 'images-cache',
            plugins: [
                {
                    cacheExpiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                    }
                }
            ]
        })
    );

    // Cache Google Fonts with Stale While Revalidate
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://fonts.googleapis.com',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets'
        })
    );

    // Cache Google Fonts webfonts with Cache First
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://fonts.gstatic.com',
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                {
                    cacheExpiration: {
                        maxEntries: 30,
                        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                    }
                }
            ]
        })
    );

    // Cache CDN resources (Bootstrap, etc.) with Stale While Revalidate
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://cdnjs.cloudflare.com',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'cdn-cache',
            plugins: [
                {
                    cacheExpiration: {
                        maxEntries: 30,
                        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                    }
                }
            ]
        })
    );

    // Handle background sync for offline task management (if needed in future)
    // This is a placeholder for more advanced offline functionality
    self.addEventListener('sync', event => {
        if (event.tag === 'background-sync') {
            console.log('Background sync triggered');
            // Handle background sync tasks here
        }
    });

    // Show notification when app is updated
    self.addEventListener('message', event => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
            self.skipWaiting();
        }
    });

    // Notify clients when new service worker is installed
    workbox.core.clientsClaim();

} else {
    console.error('Workbox failed to load');
}