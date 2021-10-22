(() => {
    const pre = '[PWA Loader]';
    const api = '//kij.willy-selma.de/push';
    let sw;
    let swRegistration;

    const registerPushSubscriptionAfterPermissionGranted = (sw) => {
        console.log(pre, 'notification granted')
        let subscriptionExists = false;

        // https://serviceworke.rs/push-get-payload_index_doc.html
        // https://rossta.net/blog/using-the-web-push-api-with-vapid.html

        // Web-Push
        // Public base64 to Uint
        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            let outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        sw
            .then(function () {
                console.log(pre, 'service worker is ready for push manager')
                return swRegistration.pushManager.getSubscription()
                    .then(async function (subscription) {
                        if (subscription) {
                            console.log(pre, 'subscription already there', subscription);
                            subscriptionExists = true;
                            return subscription;
                        }

                        const vapidPublicKey = await fetch(api + '/vapidPublicKey').then(res => res.text());
                        console.log(pre, 'create subscription', subscription);
                        const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
                        return swRegistration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey,
                        });
                    });
            })
            .then(async function (subscription) {
                if (!subscriptionExists) {
                    const dbsubscription = await fetch(api + '/register', {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            subscription,
                        }),
                    }).then(res => res.json());
                    localStorage.setItem('subscriptionID', dbsubscription.id);
                    console.log(pre, 'subscriptionID is in localstorage', dbsubscription)
                }
                console.log(pre, 'window.notifyme(\'payload\')')
                window.notifyme = function (msg) {
                    const payload = msg || 'ich bin ein notify';
                    const ttl = 24 * 60 * 60;

                    fetch(api + '/sendNotification', {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            payload,
                            ttl,
                        }),
                    });
                };
            });
    }

    window.onload = () => {
        if ('serviceWorker' in navigator) {
            console.log(pre, 'init service worker')
            // TODO: try Promise.all
            sw = navigator.serviceWorker.register('./js/service-worker.js?cb=' + window.cacheBuster)
                .then((registration) => {
                    console.log(pre, 'service worker registered', registration);
                    swRegistration = registration;

                    if ('permissions' in navigator) {
                        navigator.permissions.query({ name: 'notifications' })
                            .then(function (notificationPerm) {
                                console.log(pre, 'notification permission init', notificationPerm.state)

                                if (notificationPerm.state === 'granted') {
                                    registerPushSubscriptionAfterPermissionGranted(sw);
                                }

                                notificationPerm.onchange = function () {
                                    if (notificationPerm.state === 'granted') {
                                        registerPushSubscriptionAfterPermissionGranted(sw);
                                    }

                                    const subscriptionID = localStorage.getItem('subscriptionID');
                                    if (!!subscriptionID && (notificationPerm.state === 'prompt' || notificationPerm.state === 'denied')) {
                                        fetch(api + '/unregister', {
                                            method: 'post',
                                            headers: {
                                                'Content-type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                subscriptionID
                                            }),
                                        });
                                    }
                                }
                            });
                    }
                }).catch((error) => {
                    console.error(pre, 'service worker error', error);
                });

            // if ('PushManager' in window) {
            //     navigator.serviceWorker.ready.then(registration => {
            //
            //     })
            // }
        }
    }
})()
