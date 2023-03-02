import '../precompiled.js';


/**
 * class implementing component letterList
 */
export default class Menu {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * register events menu button click
     */
    registerEventListener() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.dispatchEvent(new Event('toMainPage', {bubbles: true}));
            },
            );
        });
    }

    /**
     * unregister events menu button click
     */
    unregisterEventListener() {
        this.buttons.forEach((button) => {
            button.removeEventListener('click');
        });
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['menu.hbs'](context));

        this.buttons = [...this.#parent.getElementsByClassName('menu-button')];
    }
}
