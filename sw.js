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
          '/data/restaurants.json',
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
          '/js/main.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/index.html',
          '/restaurant.html',
          '/'
        ]
      )
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})