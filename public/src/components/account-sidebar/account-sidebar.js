import '../templates.js';

/**
 * class implementing uikit account-sidebar
 */
export class AccountSidebar {
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
     * @return {{Object}} - form filling
     */
    prepareForm(ctx) {
        return {
            sidebar: ctx,
        };
    }

    /**
     * method insert sidebar to HTML
     * @param {String} ctx - string to paste in template
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['account-sidebar.hbs'](data));
    }

    /**
     * method sidebar clearing from page
     */
    purge() {
        document.querySelectorAll('div.account-sidebar').forEach((e) => {
            e.remove();
        });
    }
}
