importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1'},
  { url: '/nav.html', revision: '1'},
  { url: '/css/materialize.min.css', revision: '1'},
  { url: '/css/style.css', revision: '1'},
  { url: '/js/nav.js', revision: '1'},
  { url: '/js/script.js', revision: '1'},
  { url: '/js/api.js', revision: '1'},
  { url: '/js/materialize.min.js', revision: '1'},
  { url: '/js/db.js', revision: '1'},
  { url: '/js/idb.js', revision: '1'},
  { url: '/icon.png', revision: '1'},
  { url: '/soccer.jpg', revision: '1'},
  { url: '/team.html', revision: '1'},
  { url: '/player.html', revision: '1'},
  { url: '/manifest.json', revision: '1'},
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fetch-page'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fetch-api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fetch-font-icon-google',
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});