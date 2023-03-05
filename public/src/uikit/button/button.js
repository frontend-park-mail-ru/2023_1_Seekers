import '../templates.js';

/**
 * class implementing component button
 */
export class Button {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method insert button to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['button.hbs'](ctx));
    }

    /**
     * method button page clearing
     */
    purge() {
        document.querySelectorAll('button.button-long.b-color').forEach((e) => {
            e.remove();
        });
    }
}
