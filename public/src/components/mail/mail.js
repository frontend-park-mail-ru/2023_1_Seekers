import '../templates.js';


/**
 * class implementing component Mail
 */
export default class Mail {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method insert mail to HTML
     * @param {Object} context template rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['mail.hbs'](context));
    }

    /**
     * method register TODO:why emtpy?
     */
    registerEventListener() {
    }

    /**
     * method unregister TODO:why emtpy?
     */
    unregisterEventListener() {
    }

    /**
     * method mail page clearing TODO:why emtpy?
     */
    purge() {
    }
}
