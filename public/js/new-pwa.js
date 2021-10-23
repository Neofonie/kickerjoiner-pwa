window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker
            .register('/kickerjoiner-pwa/js/new-service-worker.js', { scope: '/kickerjoiner-pwa/js/' });
    }
}, { once: true });
