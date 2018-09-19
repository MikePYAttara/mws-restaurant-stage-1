importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
importScripts('https://cdn.jsdelivr.net/npm/idb@2.1.3/lib/idb.min.js');

workbox.precaching.precacheAndRoute([
  '/',
  'restaurant.html'
]);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache'
  })
);

workbox.routing.registerRoute(
  //Cache Js files
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    // Custom cache name
    cacheName: 'js-cache'
  })
)

workbox.routing.registerRoute(
  // Cache restaurant json
  /.*\localhost:1337\/restaurants/,
  // Store in indexedDB
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'restaurants'
  })


);