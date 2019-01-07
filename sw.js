const staticCache = 'resto-cache';

self.addEventListener('activate', event => {
  event.waitUntil( 
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('resto-') && cacheName !== staticCache
        }).map(cacheName => {
          return caches.delete(cacheName)
        })
      );
    })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache).then(cache => {
      return cache.addAll(
        [ 
          '/css/styles.css',
          './data/restaurants.json',
          '/manifest.json',
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
          '/img/spoon-256.png',
          '/img/knife-128.png',
          '/img/plate-144.png',
          '/img/bowl-256.png',
          '/js/main.js',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          'index.html',
          './restaurant.html',
          '/'
        ]
      )
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(mySiteCache).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});