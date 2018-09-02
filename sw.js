const resources = [
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
  ]
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('restaurant-v1')
      .then(cache => {
          cache.addAll(resources);
      })
      .catch(err => console.log(err))
    )
  })

  self.addEventListener('fetch', event => {
    const requestUrl = event.request;
    if (!requestUrl.url.includes('localhost:1337/restaurants')) {
      event.respondWith(
        caches.open('restaurant-v1')
        .then(cache => {
          return cache.match(event.request)
          .then(response => {
            return response || fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
        .catch(err => console.log(err))
      );
    };

    const request = indexedDB.open('RestaurantReviewDB', 1);
    request.onerror = event => {
      console.dir(event);
    };
    request.onupgradeneeded = event => {
      const  db = event.target.result;
      if (!db.objectStoreNames.contains('restaurants')) {
        const restaurantOS = db.createObjectStore('restaurants', {keyPath: 'id'});
        restaurantOS.createIndex('id', 'id', {unique: true})
        restaurantOS.transaction.oncomplete = event => {
          const restaurantOS = db.transaction(['restaurants'], 'readwrite').objectStore('restaurants');
          const restaurants = fetch(requestUrl).then(response.json())
          restaurants.forEach(restaurant => {
            restaurantOS.add(restaurant);
          });
        }
      }
    };

    request.onsuccess = event => {
      const restaurants = [];
      const db = event.target.result;
      const restaurantOS = db.transaction(['restaurants']).objectStore('restaurants');
      restaurantOS.openCursor().onsuccess = event => {
        for (let restaurant in restaurants) {
          restaurants.push(restaurant);
        }
      }
      return restaurants;
    }

  })