const resources = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/img/',
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
    '/data/',
    '/data/restaurants.json'       
  ]
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('restaurant-cache')
      .then(cache => {
          const rsc = resources;
          rsc.forEach(r => {
              cache.add(resource);
          });
      })
      .catch(err => console.log(err))
    )
  })
  
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
      .then(resp => {
        return resp || fetch(event.request)
        .then(response => {
          let responseClone = response.clone();
          caches.open('restaurant-cache')
            .then(cache => {
                cache.put(event.request, responseClone);
          });
  
          return response
        });
      }).catch(err => {
        return err
      })
    );
  });