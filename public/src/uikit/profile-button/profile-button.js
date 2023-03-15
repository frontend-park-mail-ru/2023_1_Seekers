import '../templates.js';


/**
 * class implementing component MenuButton
 */
export class ProfileButton {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

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
     * @param {string} context.img button icon (raw svg code)
     * @param {string} context.text text inside button
     * @param {string} context.href href of button to proceed
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['profile-button.hbs'](context));
    }

    /**
     * method button clearing
     */
    purge() {
        // this.element.remove();
    }
}
