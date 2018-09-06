import idb from 'idb';

const DB_NAME = 'RestaurantReviewsDB',
      DB_VERSION = 1,
      DB_STORE_NAME = 'restaurants',
      CACHE_NAME = 'RestaurantReviewsCache',
      RESTAURANTS_URL = 'localhost:1337/restaurants',
      
      CACHE_RESOURCES = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg' 
  ];


  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_RESOURCES))
      .then(() => {
        idb.open(DB_NAME, DB_VERSION, upgradeDB => {
          if (!upgradeDB.objectStoreNames.contains(DB_STORE_NAME)) {
            upgradeDB.createObjectStore(DB_STORE_NAME, {keyPath: 'id'})
          };
        })
      })
      .catch(error => console.log(error))
    )
  })

  self.addEventListener('fetch', event => {
    const REQ = event.request;
    if (REQ.url.contains(RESTAURANTS_URL)) {
      event.respondWith(
        idb.open(DB_NAME, DB_VERSION)
        .then(db => {
          const objectStore = db.transaction(DB_STORE_NAME, 'readonly').objectStore(DB_STORE_NAME);
          return objectStore.getAll() || fetch(REQ)
          .then(response => response.json())
          .then(restaurants => {
            const objectStore = db.transaction(DB_STORE_NAME, 'readwrite').createObjectStore(DB_STORE_NAME);
            restaurants.forEach(restaurant => objectStore.put(restaurant, restaurant.id));
            return restaurants
          })
        })
      )
    }

    event.respondWith(
      caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(REQ)
        .then(response => {
          return response || fetch(REQ)
          .then(response => {
            cache.put(REQ, response.clone());
            return response
          })
        })
      })
    )
  })
