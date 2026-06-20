// This app no longer ships a service worker. `unregister()` is called on
// startup to clean up any service worker that older visitors still have cached
// from before it was removed.

export function unregister(): void {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
