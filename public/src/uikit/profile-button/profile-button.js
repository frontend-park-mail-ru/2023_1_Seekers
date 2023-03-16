import '../templates.js';
import {AccountSidebar} from "../../components/account-sidebar/account-sidebar.js";


/**
 * class implementing component MenuButton
 */
export class ProfileButton {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

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
     * @param {string} context.img profile image
     * @param {string} context.login profile mail
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['profile-button.hbs'](context));
        this.element = this.#parent.getElementsByClassName('profile-button')[0];
    }

    /**
     * method button clearing
     */
    purge() {
        // this.element.remove();
    }
}
