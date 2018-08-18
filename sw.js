const resources = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/img/**',
    '/data/restaurants.json',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '//normalize-css.googlecode.com/svn/trunk/normalize.css',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500'       
  ]
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('restaurant-cache').then(cache => cache.addAll(resources))
      .catch(err => console.log(err))
    )
  })
  
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
      .then(resp => {
        return resp || fetch(event.request).then(response => {
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