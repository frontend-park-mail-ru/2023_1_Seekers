class WebPush {

    pushSubscription: {} | PushSubscription;

    constructor() {
        this.pushSubscription = {};
    }

    urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')
        ;
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }

    askPermission() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then((registration) => {

                        if (!('PushManager' in window)) {
                            console.log('Push not found.');
                            return {};
                        }

                        const subscribeOptions = {
                            userVisibleOnly: true,
                            applicationServerKey:
                                this.urlBase64ToUint8Array(
                                    'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
                                ),
                        };

                        return registration.pushManager.subscribe(subscribeOptions);
                    })
                    .then((pushSubscription) => {

                        console.log(
                            'Received PushSubscription: ',
                            JSON.stringify(pushSubscription),
                        );
                        this.pushSubscription = pushSubscription;

                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

export const webPush = new WebPush();
