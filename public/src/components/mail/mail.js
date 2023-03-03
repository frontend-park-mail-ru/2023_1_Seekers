import '../templates.js';


/**
 * class implementing component Mail
 */
export class Mail {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

    /**
     * Constructor that creates a component class Mail
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method insert mail to HTML
     */
    render() {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['mail.hbs']());
    }

    /**
     * method register NOT IMPLEMENTED
     * will unregister listeners for each button in mail
     */
    registerEventListener() {
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will register listeners for each button in mail
     */
    unregisterEventListener() {
    }

    /**
     * method purge NOT IMPLEMENTED
     * mail page clearing
     * will purge all the content in mail
     */
    purge() {

    }
}
