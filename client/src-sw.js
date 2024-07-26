const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const  { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Above,  "navigate" allows you to cache pages you navigate to.

// TODO: Implement asset caching


registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);
//Above, we Cache CSS and JavaScript files using StaleWhileRevalidate strategy
// Also, this allows us to serve the cached version while simultaneously updating the cache with a fresh version from the network.
  
const imagecache = new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Maximum number of images to cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
});


registerRoute(({ request }) => request.destination === 'image', imagecache);


// Above, we Cache image files using CacheFirst strategy with expiration
// Also, we register this request with using request.destionation to match resource being requested. 