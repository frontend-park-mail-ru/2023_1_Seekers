import '../templates.js';
import {IconButton} from '../../uikit/icon-button/icon-button.js';
import {ProfileButton} from '../../uikit/profile-button/profile-button.js';

/**
 * class implementing component Navbar
 */
export class Navbar {
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
     * Private field that contains HTML-elements that inside of current element
     * @type {{}}
     */
    #childs = {};

    /**
     * Constructor that creates a component class Navbar
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
     * method registerEventListener
     * unregister listeners for each button in letter-list
     */
    registerEventListener() {
        this.#childs.forEach((child) => {
            child.addEventListener('click', this.eventCatcher);
        });
    }

    /**
     * method unregisterEventListener unregister events click on navbar
     */
    unregisterEventListener() {
        this.#childs.forEach((child) => {
            child.removeEventListener('click', this.eventCatcher);
        });
    }

    /**
     * method insert form to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['navbar.hbs'](ctx));

        this.#element = this.#parent.getElementsByClassName('navbar')[0];

        ctx.forEach((buttonCtx) => {
            const button =
                new IconButton(this.#element.getElementsByClassName('navbar__frame-right')[0]);
            button.render(buttonCtx);
        });
        this.profileButton = new ProfileButton(
            this.#element.getElementsByClassName('navbar__frame-right')[0]);
        this.profileButton.render({text: 'example@mailbox.com'});

        this.#childs = [...this.#element.getElementsByClassName('icon-button')];
    }

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.#element.remove();
    }
}
