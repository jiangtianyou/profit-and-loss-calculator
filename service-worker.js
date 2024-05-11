self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("store").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/bootstrap.min.css",
        "/css/app.css",
        "/js/jquery.min.js",
        "/js/bootstrap.min.js",
        "/js/app.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
