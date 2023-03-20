'use strict';

import router from "@utils/router";
import '@/index.scss';

console.log('hello from index ts')
router.start();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then().catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

