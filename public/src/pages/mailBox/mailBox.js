'use strict';

import {BasePage} from '../base-page.js';
import '../templates.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {LetterList} from '../../components/letterList/letterList.js';
import {Mail} from '../../components/mail/mail.js';
import {Menu} from '../../components/menu/menu.js';


/**
 * class implementing mailBox
 */
export class MailBox extends BasePage {
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
     * Private field that contains request worker
     */
    #connector;

    /**
     * information for configuring page
     */
    #context;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} config - template rendering context
     * @param {Object} connector - connector to backend
     */
    constructor(parent, config, connector) {
        super(
            parent,
            window.Handlebars.templates['mailBox.hbs'],
        );

        this.#context = config;
        this.#connector = connector;
    }

    /**
     * method register events button submit and input focus
     */
    registerEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            child.registerEventListener();
        });

        addEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            child.unregisterEventListener();
        });

        removeEventListener('toMainPage', this.eventCatcher);
    };

    /**
     *
     * @param {string} listName type of letterList (inbox, outbox, ...))
     * @return {Promise<{}|{data: *, status: *}>}
     */
    getLetterList = async (listName) => {
        const [status, data] = await this.#connector.makeGetRequest('api/v1' + listName)
            .catch((err) => console.log(err));

        switch (status) {
        case 401:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};

        case 500:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};

        case 200:
            break;

        default:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};
        }
        return {status, data};
    };

    /**
     * Function that makes logout request
     * @return {Promise<void>}
     */
    logout = async () => {
        await this.#connector.makeGetRequest('api/v1/logout')
            .catch((err) => console.log(err));
    };

    /**
     * promise redirect to login page TODO:help
     * @param {object} e - event click on button logout
     */
    eventCatcher = async (e) => {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length);

        switch (rel) {
        case '/logout':
            this.logout().then(() => {
                this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            });
            return;
        default:

            const {status, data} = await this.getLetterList(rel);
            if (status !== 200) return;

            this.#childs['letterList'].purge();

            this.#childs['letterList'] = new LetterList(this.content);
            this.#childs['letterList'].render(data.messages);
        }
    };

    /**
     * method insert mailbox to HTML
     */
    render = async () => {
        super.render({});
        this.#element = document.getElementsByClassName('main-page')[0];

        const {status, data} = await this.getLetterList('/inbox');
        console.log(data);
        if (status !== 200) return;

        this.#childs['navbar'] = new Navbar(this.#element);
        this.#childs['navbar'].render({});

        this.content = document.createElement('div');
        this.content.classList.add('content');
        this.#element.appendChild(this.content);

        this.#childs['menu'] = new Menu(this.content);
        this.#childs['menu'].render({});

        this.line = document.createElement('div');
        this.line.classList.add('vertical-line');
        this.content.appendChild(this.line);

        this.#childs['letterList'] = new LetterList(this.content);
        this.#childs['letterList'].render(data.messages);

        this.#childs['mail'] = new Mail(this.content);
        this.#childs['mail'].render();

        this.registerEventListener();
    };

    /**
     * method mailbox page clearing
     */
    purge = () => {
        this.unregisterEventListener();
        Object.values(this.#childs).forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    };
}
