/*
 * Offline support for the storefront.
 *
 * ## Why this is network-first
 *
 * The previous version was cache-first for *every* request: it answered from the cache whenever an
 * entry existed and only reached the network on a miss, then cached every 200 it saw, permanently.
 * Nothing invalidated an entry except a change to CACHE_NAME.
 *
 * On a site that redeploys, that freezes the app. `storefront-cmp.js` has no content hash in its
 * name, so a returning visitor kept running whichever build they first loaded — new features shipped
 * and simply never arrived. Worse, `/api/packages` was cached the same way, so the catalogue a user
 * saw was the one from their first visit, and no amount of redeploying changed it.
 *
 * It also cached failures. While preview images were missing, the SPA fallback answered
 * `/previews/*.png` with a 200 serving the app shell — a "valid" basic 200 as far as this file was
 * concerned — so browsers cached HTML under an image URL and would have kept doing so after the
 * images came back.
 *
 * Network-first inverts that: the network answer wins whenever it is available, and the cache exists
 * for the case it was actually wanted for — being offline. A slightly slower warm start is worth far
 * less than a store that cannot ship an update.
 */
const CACHE_NAME = 'azphalt-storefront-v3';

/** The shell, precached so a cold offline start still renders something. */
const ASSETS = [
    '/',
    '/manifest.json',
    '/icon.svg',
    '/storefront-cmp.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            // Take over immediately rather than waiting for every existing tab to close. A stale
            // worker serving a frozen app is the failure this version exists to end, so it should
            // not survive one more session than necessary.
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (event) => {
    // Only GETs are cacheable, and only same-origin ones are ours to serve. A POST (checkout,
    // ratings, reports) must always reach the network.
    if (event.request.method !== 'GET') return;
    if (new URL(event.request.url).origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const copy = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                return networkResponse;
            })
            // Offline (or the network failed): fall back to whatever was last seen. A miss here
            // returns undefined, which the browser surfaces as a normal network error — the same
            // thing that would have happened without a service worker at all.
            .catch(() => caches.match(event.request))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            ))
            // Claim open tabs so the fix applies without a second reload. Anyone still holding a
            // cache-first worker is, by definition, someone who cannot receive an update any other
            // way.
            .then(() => self.clients.claim())
    );
});
