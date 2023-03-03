'use strict';

import BasePage from '../base-page.js';
import '../templates.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {LetterList} from '../../components/letterList/letterList.js';
import {Mail} from '../../components/mail/mail.js';

/**
 * class implementing mailBox
 */
export default class mailBox extends BasePage {
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
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['mailBox.hbs'],
        );
    }

    /**
     * method register events button submit and input focus
     */
    registerEventListener() {
        Object.values(this.#childs).forEach((child) => {
            child.registerEventListener();
        });

        addEventListener('toMainPage', this.eventCatcher);
    }

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener() {
        Object.values(this.#childs).forEach((child) => {
            if (child.hasOwnProperty('unregisterEventListener')) {
                child.unregisterEventListener();
            }
        });

        removeEventListener('logout', this.eventCatcher);
    }

    /**
     * promise redirect to login page TODO:help
     * @param {object} e - event click on button logout
     */
    eventCatcher = (e) => {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length);

        if (rel === '/logout') {
            e.target.dispatchEvent(new Event('login', {bubbles: true}));
            return;
        }
        console.log('something is wrong!');
    };

    /**
     * method insert mailbox to HTML
     * @param {object} context - template rendering context
     */
    async render(context) {
        super.render(context);
        this.#element = document.getElementsByClassName('page')[0];

        this.#childs['navbar'] = new Navbar(this.#element);
        this.#childs['navbar'].render(context.profile);

        this.content = document.createElement('div');
        this.content.classList.add('content');
        this.#element.appendChild(this.content);

        this.#childs['letterList'] = new LetterList(this.content);
        this.#childs['letterList'].render(context);

        this.#childs['mail'] = new Mail(this.content);
        this.#childs['mail'].render(context);

        this.registerEventListener();
    }

    /**
     * method mailbox page clearing
     */
    purge() {
        this.unregisterEventListener();
        Object.values(this.#childs).forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    }
}
