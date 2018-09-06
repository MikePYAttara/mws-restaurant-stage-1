import idb from 'idb';

const DB_NAME = 'RestaurantReviewsDB',
      DB_VERSION = 1,
      DB_STORE_NAME = 'restaurants',
      CACHE_NAME = 'RestaurantReviewsCache',
      
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
      .then(openDb())
      .catch(error => console.log(error))
    )
  })

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(event.request)
        .then(response => {
          return response || fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response
          })
        })
      })
    )
    // if (!event.request.url.contains(RESTAURANTS_URL)) {
     
    // }

    // event.respondWith(
    //   idb.open(DB_NAME)
    //   .then(db => {
    //     db.objectStore(DB_STORE_NAME)
    //     .then()
    //   })
    // )

  })
