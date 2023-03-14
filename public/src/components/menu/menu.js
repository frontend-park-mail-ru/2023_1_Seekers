import '../templates.js';
import {MenuButtton} from '../../uikit/menu-button/menu-button.js';


/**
 * class implementing component Menu
 */
export class Menu {
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
     * Private field that contains current HTML-element
     * @type {Element[]}
     */
    #childs = [];

    /**
     * Constructor that creates a component class Menu
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    eventCatcher = (e) => {
        e.preventDefault();
        e.currentTarget.dispatchEvent(new Event('toMainPage', {bubbles: true}));
    };

    /**
     * method register
     * register listeners for each button in letter-list
     */
    registerEventListener() {
        this.#childs.forEach((child) => {
            child.addEventListener('click', this.eventCatcher);
        });
    }

    /**
     * method unregister
     * unregister listeners for each button in letter-list
     */
    unregisterEventListener() {
        this.#childs.forEach((button) => {
            button.removeEventListener('click', this.eventCatcher);
        });
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     * @param {Object[]} context pattern rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['menu.hbs'](context));

        this.#element = this.#parent.getElementsByClassName('menu')[0];

        context.forEach((buttonCtx) => {
            const button = new MenuButtton(document.getElementById('common-menu-buttons'));
            button.render(buttonCtx);
        });
        this.#childs = [...this.#element.getElementsByClassName('menu-button')];

        this.registerEventListener();
    }

    /**
     * method menu clearing
     */
    purge() {
        this.#element.remove();
    }
}
