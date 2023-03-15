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
    #sidebar

    #context;

    /**
     * Constructor that creates a component class Menu
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * promise handle profile button
     * @param e - event click on profile button
     * @returns {Promise<void>}
     */
    onClick = async (e) => {
        e.preventDefault();
        if (this.#sidebar !== null) {
            this.#sidebar.purge()
        }else{
            this.content = document.getElementsByClassName('main-page__content')[0];
            this.#sidebar = new AccountSidebar(this.content);
            this.#sidebar.render(this.#context)
        }
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
        this.#context = context;
    }

    /**
     * method button clearing
     */
    purge() {
        // this.element.remove();
    }
}
