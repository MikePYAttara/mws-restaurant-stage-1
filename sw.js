const resources = [
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/data/restaurants.json'       
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

  self.addEventListener('fetch', function(event) {
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
  });
  