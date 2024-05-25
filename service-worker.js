const CACHE_NAME = "store";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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

  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("pagead2.googlesyndication.com")) {
    event.respondWith(new Response(null, { status: 200 }));
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
