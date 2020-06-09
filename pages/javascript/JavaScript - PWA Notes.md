---
title: PWA Notes
excerpt: "Progressive Web Application Guide"
date: 2020-01-08
tags: ["JavaScript", "Service Workers"]
keywords: "javascript, pwa, Service Worker"
sidebar: auto
---

# Progressive Web Apps

<br>
<hr>
<br>

![PWA](/assets/images/PWA/pwa.jpg)

![PWA](/assets/images/PWA/pwa2.jpg)

<br>

## The Manifest File

The manifest files is a single json file that provides information about the application to the browser, like the name of the app or the color theme or whether it should be installed on the home screen etc.

To add it to your application create a file called **_manifest.json_** in the root of the project.

```json
{
  "name": "Food Recipes",
  "short_name": "FoodRecipes",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#FFE9D2",
  "theme_color": "#FFE1C4",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/img/icons/icon-96x96.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "/img/icons/icon-72x72.png",
      "type": "image/png",
      "sizes": "72x72"
    },
    {
      "src": "/img/icons/icon-128x128.png",
      "type": "image/png",
      "sizes": "128x128"
    },
    {
      "src": "/img/icons/icon-144x144.png",
      "type": "image/png",
      "sizes": "144x144"
    },
    {
      "src": "/img/icons/icon-152x152.png",
      "type": "image/png",
      "sizes": "152x152"
    },
    {
      "src": "/img/icons/icon-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/img/icons/icon-384x384.png",
      "type": "image/png",
      "sizes": "384x384"
    },
    {
      "src": "/img/icons/icon-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

<br>

Then you need to link the manifest file to all the pages in the application by creating a link tag in the head section.

```html
<link rel="manifest" href="/manifest.json" />
```

<br>

On IOS devices the icons and theme_color in the manifest file is not supported yet.  
To get this working we need to add more link tags in the head.

```html
<!-- ios support -->
<!-- icons -->
<link rel="apple-touch-icon" href="/img/icons/icon-96x96.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-72x72.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-128x128.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-144x144.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-152x152.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-192x192.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-384x384.png" />
<link rel="apple-touch-icon" href="/img/icons/icon-512x512.png" />
<!-- Theme color for status bar -->
<meta name="apple-mobile-web-app-status-bar" content="#aa7700" />
<meta name="theme-color" content="#aa7700" />
```

 <br>

## Service Workers

The service worker is the hard of a PWA, it runs in the background on a separate thread in the browser.

![sw1](/assets/images/PWA/sw1.png)

![sw2](/assets/images/PWA/sw2.png)

<br>

## Service Worker Lifecycle

The SW are registered from the main application's javascript file.
The SW will listen for this event and then run the install event and the SW will become active.
![sw](/assets/images/PWA/sw-lifecycle.png)

<br>

If the SW is not updated it will not re-register and install the SW again.
Updating the SW will only happen if there is changes in the SW file.
If there is an update the SW will be installed but it will stay in waiting untill all instances of the app is closed.
![sw](/assets/images/PWA/sw-lifecycle2.png)

<br>

## registering the Service Worker

Create a sw.js file in the root of the application.
In the main app js file register the sw.

```javascript
// first check if SW is available in browser
if ("serviceWorker" in navigator) {
  // Register the SW
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service Worker Registered", reg))
    .catch((err) => console.log("Service NOT Registered", err));
}
```

<br>

## Listening to the Install Event

In the sw.js listen for the install event,

```javascript
// self inside the SW refers to itself the SW

self.addEventListener("install", (event) => {
  console.log("Service Worker now installed!", event);
});
```

<br>

## Listening to the Activate Event

In the sw.js listen for the activate event,

```javascript
// listen for the activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker now activated!", event);
});
```

<br>

## Listening to Fetch Events

You can also listen to the fetch events, which means you can intercept any request to a server for files and do something with it, like caching files or responding withh cached versions of a file.

![sw](/assets/images/PWA/fetchEvents.png)

```javascript
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});
```

<br>

## Offline Mode

This is the ability to store assets and dynamic content in cache so that the SW can fetch it from the cache when offline.

![sw](/assets/images/PWA/offline.png)

<br>

## Caching the App Shell ( core assets )

This is done in the **_install_** event.

```javascript
const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", (evt) => {
  //console.log('Service Worker now installed!', event)
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        // Adds a single item
        // cache.add()
        cache.addAll(assets);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
```

<br>

## Fetching the cached assets

This is done in the **_fetch_** event.

```javascript
self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  evt.respondWith(
    // check if request matches anything in the cache
    caches.match(evt.request).then((cacheRes) => {
      // If the cache response is empty you just return the original request
      return cacheRes || fetch(evt.request);
    })
  );
});
```

<br>

## Cache Versioning

At the moment if we change anything in the assets like adding a html element to the index page it will not reflect these changes, because the service worker are not reinstalled, so it still fetches the old files from cache.
We need to change the version of the cache so that the SW can be reinstalled when there is changes.
We also then need to delete the old cahces.

Add a version number to the caceh name.

```javascript
const staticCacheName = "site-static-v2";
```

<br>

Loop through the caches and delete the old caches.

```javascript
self.addEventListener("activate", (evt) => {
  //console.log("Service Worker now activated!", evt);
  // Delete old caches
  evt.waitUntil(
    // get all the caches and delete old caches
    caches.keys().then((keys) => {
      //console.log(keys);
      // deleting these keys is an async task so we need to return a promise
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
```

<br>

## Dynamic Caching

Caching other assets dynamically,

```javascript
// fetch events
self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        // If already in static cache return it
        cacheRes ||
        // else take the response from the request, open the dynamic cache and store the response there
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            // you need store a clone of the response
            cache.put(evt.request.url, fetchRes.clone());
            // then return the original request to the browser
            return fetchRes;
          });
        })
      );
    })
  );
});
```

<br>

## Offline Fallback

Returning a response when offline for a page that haven't been visited while online.
Make sure to create fallback html page that you would like to serve to the user.
Then we can just add a catch method in the fetch event to return the fallback page incase we are offline.

```javascript
self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      // return the fallback page
      .catch(() => {
        if (evt.request.url.includes(".html"))
          return caches.match("/pages/fallback.html");
      })
  );
});
```

<br>

## Limiting Cache Size

Create function that can delete items from the cache.

```javascript
// cahce size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
```

<br>

Then call this function in the fetch event where you put items in the cache.

```javascript
// fetch events
self.addEventListener("fetch", (evt) => {
  //console.log("fetch event", evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // delete items from the cache
              limitCacheSize(dynamicCacheName, 20);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.includes(".html"))
          return caches.match("/pages/fallback.html");
      })
  );
});
```

<br>

## Data Caching

Coming soon
