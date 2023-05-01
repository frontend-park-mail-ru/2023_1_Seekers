'use strict';

import '@/index.scss';
import {dispatcher} from '@utils/dispatcher';
import {actionStart} from '@actions/user';

// let isMobile = false;
//
// if (navigator.userAgent.match(/Android/i)    ||
//     navigator.userAgent.match(/webOS/i)      ||
//     navigator.userAgent.match(/iPhone/i)     ||
//     navigator.userAgent.match(/iPad/i)       ||
//     navigator.userAgent.match(/iPod/i)       ||
//     navigator.userAgent.match(/BlackBerry/i) ||
//     navigator.userAgent.match(/Windows Phone/i)) {
//     isMobile = true;
// }

dispatcher.dispatch(actionStart()).then(() => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then().catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

