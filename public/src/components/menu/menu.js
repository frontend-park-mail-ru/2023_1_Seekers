import '../precompiled.js';


/**
 * class implementing component Menu
 */
export class Menu {
    #parent;
    #buttons;

    /**
     * Constructor that creates a component class Menu
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method register
     * register listeners for each button in letter-list
     */
    registerEventListener() {
        this.#buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.dispatchEvent(new Event('toMainPage', {bubbles: true}));
            },
            );
        });
    }

    /**
     * method register
     * unregister listeners for each button in letter-list
     */
    unregisterEventListener() {
        this.#buttons.forEach((button) => {
            button.removeEventListener('click');
        });
    }

    /**
     * A method that draws a component into a parent HTML element according to a given template and context
     * @param {Object} context pattern rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['menu.hbs'](context));

        this.#buttons = [...this.#parent.getElementsByClassName('menu-button')];
    }
}
