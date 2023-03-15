import '../templates.js';
import {MailContent} from '../../uikit/mail-content/mail-content.js';


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
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    /**
     * Private field that contains current HTML-element
     * @type {Object[]}
     */
    #childs = [];

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
        this.#element = this.#parent.getElementsByClassName('mail')[0];
        const mailContent = new MailContent(
            this.#element.getElementsByClassName('mail__content')[0]);
        mailContent.render({});
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
