/**
 * Minified by jsDelivr using UglifyJS v3.4.1.
 * Original file: /npm/idb@2.1.3/lib/idb.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(p,"_tx",["objectStoreNames","mode"]),n(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(a,"_db",["name","version","objectStoreNames"]),n(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){i in e.prototype&&(e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}})})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var d={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r&&(r.onupgradeneeded=function(e){n&&n(new a(r.result,e.oldVersion,r.transaction))}),o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
//# sourceMappingURL=/sm/712398a78d673b59135640381edaf7f41e9e5b55512114fb663e9dab40f2683d.map

const DB_NAME = 'RestaurantReviewsDB',
      DB_VERSION = 1,
      DB_STORE_NAME = 'restaurants',
      CACHE_NAME = 'RestaurantReviewsCache',
      
      CACHE_RESOURCES = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg' 
  ];

  const dbPromise = idb.open(DB_NAME, DB_VERSION, upgradeDB => {
    if (!upgradeDB.objectStoreNames.contains(DB_STORE_NAME)) {
      upgradeDB.createObjectStore(DB_STORE_NAME, {keyPath: 'id'})
    };
  })


  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_RESOURCES))
      .catch(error => console.log(error))
    )
  })

  self.addEventListener('fetch', event => {
    if (event.request.url.origin === location.origin) {
      event.respondWith(
        caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
          .then(response => {
            return response || fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response
            })
          })
        })
      )
    }

    event.respondWith(
      dbPromise
      .then(db => {
        const store = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
        const data = store.getAll();
        (data) ? data.stringify() : fetch(event.request)
        .then(response => {
          const store = db.transaction(DB_STORE_NAME, 'readwrite'.objectStore(DB_STORE_NAME));
          const data = response.json();
          data.forEach(key => store.put(key[id]));
          return response
        })
      })
    )
  })
