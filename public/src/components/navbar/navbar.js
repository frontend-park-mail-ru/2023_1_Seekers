import '../templates.js';

/**
 * class implementing component navbar
 */
export default class Navbar {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }


    /**
     * method handle click on navbar TODO: async??
     * @param {object} e - event ???
     */
    eventCatcher = (e) => {
        console.log(e.currentTarget);
        console.log('click');
        e.preventDefault();
        e.currentTarget.dispatchEvent(new Event('toMainPage', {bubbles: true}));
    };

    /**
     * method register events click on navbar
     */
    registerEventListener() {
        console.log('register navbar');
        this.childs.forEach((child) => {
            child.addEventListener('click', this.eventCatcher);
        });
    }

    /**
     * method unregister events click on navbar
     */
    unregisterEventListener() {
        this.childs.forEach((child) => {
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

        this.childs = [...this.#parent.getElementsByClassName('icon-button')];
        console.log(this.childs);
        this.element = this.#parent.getElementsByClassName('navbar')[0];
    }

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.element.remove();
    }
}
