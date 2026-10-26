/* Rootline app shell. Personal records are in IndexedDB, never Cache Storage. */
const CACHE='rootline-shell-v1';
const ASSETS=['./','./index.html','./styles.css','./db.js','./app.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rootline-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  const known=ASSETS.some(asset=>new URL(asset,self.registration.scope).pathname===url.pathname);
  if(!known)return;
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});
