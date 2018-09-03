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


  const fetchJSONFromNetwork = (url=RESTAURANTS_URL) => {
    fetch(url).then(response => response.json())
    .then(data => data)
  }

  const fetchJSONFromDB = () => {
    const restaurants = [],
      req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = event => {
        const db = event.target.result;
        store = db.transaction([DB_STORE_NAME]).objectStore(DB_STORE_NAME);
        store.openCursor().onsuccess = event => {
          const cursor = event.target.result;
          if (cursor) {
            restaurants.push(cursor.value);
            cursor.continue();
          };
        };
      }
      return restaurants
  } 

  const openDb = (restaurants=fetchJSONFromNetwork()) => {
    let db;
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = event => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        const store = db.createObjectStore(DB_STORE_NAME, {keyPath: 'id'});
        store.createIndex('id', 'id', {unique: true});
      }
      db.transaction.oncomplete = event => {
        const objectStore = db.transaction([DB_STORE_NAME], 'readwrite').objectStore(DB_STORE_NAME);
        if (restaurants) restaurants.forEach(restaurant => objectStore.add(restaurant));
      }
    };

    req.onsuccess = event => {
      db = this.result;
      const store = db.transaction([DB_STORE_NAME], 'readwrite').objectStore(DB_STORE_NAME);
      restaurants.forEach(restaurant => {
        store.get(restaurant.id)
        if (!restaurant.value === restaurant) store.put(restaurant.id, restaurant);
      })
    };

    req.onerror = event => event.target.errorCode;
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
    if (!event.request.url.contains(RESTAURANTS_URL)) {
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
    }

    event.respondWith(
      idb.open(DB_NAME)
      .then(db => {
        db.objectStore(DB_STORE_NAME)
        .then()
      })
    )

  })

  // self.addEventListener('fetch', event => {
  //   const requestUrl = event.request;
  //   // Cache resources
  //   if (!requestUrl.url.includes('localhost:1337/restaurants')) {
  //     event.respondWith(
  //       caches.open(CACHE_NAME)
  //       .then(cache => {
  //         return cache.match(requestUrl)
  //         .then(response => {
  //           return response || fetch(requestUrl)
  //           .then(response => {
  //             cache.put(requestUrl, response.clone());
  //             return response;
  //           });
  //         });
  //       })
  //       .catch(err => console.log(err))
  //     );
  //   } else {
  //     fetchJSONFromDB() || openDb();
  //   };
  // })

