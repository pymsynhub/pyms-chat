self.addEventListener('install', e => {
  console.log('Service Worker installed');
});
self.addEventListener('fetch', e => {
  // Cache logic goes here (optional)
});
