import '../templates.js';

/**
 * class implementing component checkbox
 */
export default class checkbox {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method insert checkbox to HTML
     */
    render() {
        this.#parent.insertAdjacentHTML('beforebegin', window.Handlebars.templates['checkbox.hbs']());
    }

    /**
     * method checkbox page clearing
     */
    purge() {
        document.querySelectorAll('div.remember').forEach((e) => {
            e.remove();
        });
    }
}
