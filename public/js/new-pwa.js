window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker
            .register('./js/new-service-worker.js');
    }
}, { once: true });
