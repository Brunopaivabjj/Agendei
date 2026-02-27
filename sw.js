self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('agenda-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html'
      ]);
    })
  );
});
