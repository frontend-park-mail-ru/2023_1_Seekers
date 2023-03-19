'use strict';

import {BasePage} from '../base-page.js';
import '../templates.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {MailArea} from '../../components/mail-area/mail-area.js';
import {AccountSidebar} from '../../components/account-sidebar/account-sidebar.js';
import {Account} from '../account/account.js';


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
        addEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        removeEventListener('toMainPage', this.eventCatcher);
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
        case '/profile':
            this.#childs['content'].purge();
            this.#childs['content'] = new Account(this.#element, this.#context, this.#connector);
            this.#childs['content'].render();
            break;
        case '/security':
            this.#childs['content'].purge();
            this.#childs['content'] = new Account(this.#element, this.#context, this.#connector);
            this.#childs['content'].render();
            break;
        case '/sidebar':
            if (document.getElementById('account-sidebar') !== null) {
                document.querySelector('.account-sidebar').classList.add('account-sidebar__delete');
            } else {
                this.#childs['sidebar'] = new AccountSidebar(this.#element);
                this.#childs['sidebar'].render(this.#context.accountFields.account);
            }
            break;
        default:
        }
    };

    /**
     * method insert mailbox to HTML
     */
    render = async () => {
        super.render({});
        this.#element = document.getElementsByClassName('main-page')[0];

        this.#childs['navbar'] = new Navbar(this.#element);
        this.#childs['navbar'].render(this.#context.accountFields.account);

        this.#childs['content'] = new MailArea(this.#element, this.#context, this.#connector);
        this.#childs['content'].render();
        this.registerEventListener();
    };


    /**
     * method mailbox page clearing
     */
    purge = () => {
        Object.values(this.#childs).forEach((child) => {
            console.log(child);
            child.purge();
        });
        this.#element.remove();
        this.unregisterEventListener();
    };
}
