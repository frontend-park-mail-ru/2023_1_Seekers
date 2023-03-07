import '../templates.js';

/**
 * class implementing uikit notification
 */
export class Notification {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method prepare ctx to send in handlebars
     * @param {object} ctx - template rendering context
     * @return {{notification: Object}} - form filling
     */
    prepareForm(ctx) {
        return {
            notification: ctx,
        };
    }

    /**
     * method for wait animation render before purge
     * @param {int} ms - time to sleep in ms
     * @returns {Promise}
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * method insert notification to HTML
     * @param {String} ctx - string to paste in template
     */
    async render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['notification.hbs'](data));

        await this.sleep(4 * 1000);
        this.purge()
    }

    /**
     * method form page clearing
     */
    purge() {
        document.querySelectorAll('div.notification-area').forEach((e) => {
            e.remove();
        });
    }
}
