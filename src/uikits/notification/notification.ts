import {UiKit} from '@/uikits/uikit';

import template from '@uikits/notification/notification.hbs';

import '@uikits/notification/notification.scss';
/**
 * class implementing uikit notification
 */
export class Notification extends UiKit {
    /**
     * method for wait animation render before purge
     * @param {int} ms - time to sleep in ms
     * @returns {Promise}
     */
    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static async renderTemplate(args: any) {
        await this.sleep(4 * 1000);
        // this.purge()
        return template(args);
    }
    /**
     * method form page clearing
     */
    static purge() {
        document.querySelectorAll('div.notification-area').forEach((e) => {
            e.remove();
        });
    }
}
