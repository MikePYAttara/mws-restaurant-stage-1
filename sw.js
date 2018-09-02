const DB_NAME = 'RestaurantReviewsDB',
      DB_VERSION = 1,
      DB_STORE_NAME = 'restaurants',
      CACHE_NAME = 'RestaurantReviewsCache',
      RESTAURANTS_URL = 'http://localhost:1337/restaurants',
      
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

  openDb = () => {
    let db;
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onerror = event => event.target.errorCode;

    req.onsuccess = event => db = this.result;

    req.onupgradeneeded = event => {
      const restaurants = fetch(RESTAURANTS_URL).then(response.json());
      const store = event.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'id' });
      store.createIndex('id', 'id', { unique: true });
      store.transaction.oncomplete = event => {
        const restaurantOS = req.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
        restaurants.forEach( restaurant => restaurantOS.add(restaurant) );
      };
    };
  };
 
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
          cache.addAll(CACHE_RESOURCES);
      })
      .then(openDb())
      .catch(error => console.log(error))
    )
  })

  self.addEventListener('fetch', event => {
    const requestUrl = event.request;
    // Cache resources
    if (!requestUrl.url.includes('localhost:1337/restaurants')) {
      event.respondWith(
        caches.open('RestaurantReviewsCache')
        .then(cache => {
          return cache.match(requestUrl)
          .then(response => {
            return response || fetch(requestUrl)
            .then(response => {
              cache.put(requestUrl, response.clone());
              return response;
            });
          });
        })
        .catch(err => console.log(err))
      );
    };

    const restaurants = [],
    db = indexedDB.open(DB_NAME, DB_VERSION);
    store = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
    store.openCursor().onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        restaurants.push(cursor);
        cursor.continue();
      };
    };
    return restaurants

  })

  