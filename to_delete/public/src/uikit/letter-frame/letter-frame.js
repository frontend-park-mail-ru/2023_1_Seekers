import '../templates.js';


/**
 * class implementing component LetterFrame
 */
export class LetterFrame {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

    /**
     * field that contains current HTML-element
     * @type {Element}
     */
    element;

    /**
     * Constructor that creates a component class Menu
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     * @param {Object} context pattern rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['letter-frame.hbs'](context));

        this.element = document.getElementById(`letter-frame-id-${context.message_id}`);
    }

    /**
     * method menu clearing
     */
    purge() {
        this.element.remove();
    }
}
