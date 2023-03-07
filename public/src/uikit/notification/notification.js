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
     * method insert notification to HTML
     * @param {String} ctx - string to paste in template
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('afterend',
            window.Handlebars.templates['notification.hbs'](data));
    }

    /**
     * method form page clearing
     */
    purge() {
        document.querySelectorAll('div.error-label').forEach((e) => {
            e.remove();
        });
    }
}
