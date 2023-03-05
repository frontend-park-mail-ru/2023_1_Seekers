/**
 * class implementing base page
 */
export class BasePage {
    #parent;
    #template;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} template - template rendering context
     */
    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    /**
     * method insert base page to HTML
     * @param {any} data data context
     */
    render(data) {
        this.#parent.innerHTML += this.#template(data);
    }
}
