'use strict';

import '@/index.scss';
import {dispatcher} from '@utils/dispatcher';
import {actionStart} from '@actions/user';

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

