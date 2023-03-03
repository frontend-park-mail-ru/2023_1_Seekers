import '../templates.js';

/**
 * class implementing component LetterList
 */

export class LetterList {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

    /**
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    /**
     * Constructor that creates a component class menuButton
     * @param {Element} parent HTML element into which
     * will be rendered current element
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * A method that draws a component into a parent HTML element according to a given template and context
     * @param {Object} context pattern rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['letterList.hbs'](context));

        this.#element = this.#parent.getElementsByClassName('letterList')[0];
    }

    /**
     * method letterList page clearing
     */
    purge() {
        this.#element.remove();
    }

    /**
     * method register NOT IMPLEMENTED
     * will register listeners for each letter-frame in letter-list
     */
    registerEventListener() {
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
    }
}
