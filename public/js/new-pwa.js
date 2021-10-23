window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker
            .register('/kickerjoiner-pwa/new-service-worker.js', { scope: '/kickerjoiner-pwa/' });
    }
}, { once: true });
