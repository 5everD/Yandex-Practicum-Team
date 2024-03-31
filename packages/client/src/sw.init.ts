export function startServiceWorker() {
  if (document.readyState === 'complete') {
    registerSW()
  } else {
    window.addEventListener('load', registerSW)
    return () => window.removeEventListener('load', registerSW)
  }
}

function registerSW() {
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/sw.js').then(
      reg => {
        console.log('Service worker registered: ', reg.scope)
      },
      err => {
        console.error('Service worker registration failed: ', err)
      }
    )
}
