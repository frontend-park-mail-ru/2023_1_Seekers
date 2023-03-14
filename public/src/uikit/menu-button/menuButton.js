import '../templates.js';


/**
 * class implementing component MenuButton
 */
export class MenuButtton {
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
     * @param context.img button icon (raw svg code)
     * @param context.text text inside button
     * @param context.count count of unread messages
     * @param context.href href of button to proceed
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['menuButton.hbs'](context));

        // this.element = document.getElementById(`letter-frame-id-${context.message_id}`);
    }

    /**
     * method button clearing
     */
    purge() {
        // this.element.remove();
    }
}
