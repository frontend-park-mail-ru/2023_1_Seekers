'use strict';

import {BasePage} from '../base-page.js';
import '../templates.js';
import {Navbar} from "../../components/navbar/navbar.js";
import {AccountNavigation} from "../../components/account-navigation/account-navigation.js";
import {AccountProfile} from "../../components/account-profile/account-profile.js";


/**
 * class implementing account
 */
export class Account extends BasePage {
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
            window.Handlebars.templates['account.hbs'],
        );

        this.#context = config;
        this.#connector = connector;

        super.render({});
        this.#element = document.getElementById('account-page');
    }

    /**
     * method register events
     */
    registerEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            child.registerEventListener();
        });

        addEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * method unregister events
     */
    unregisterEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            child.unregisterEventListener();
        });

        // removeEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * method insert account to HTML
     */
    render = () => {

        this.#childs['navbar'] = new Navbar(this.#element.children.namedItem('account-navbar'));
        this.#childs['navbar'].render(this.#context.navbarIconButtons);

        this.#childs['account-navigation'] = new AccountNavigation(document.getElementById('account-content__navigation'));
        this.#childs['account-navigation'].render(this.#context.accountFields.account);

        this.profile = new AccountProfile(document.getElementById('account-content__content'));
        this.profile.render(this.#context.accountFields.account)


        this.registerEventListener();
    };



    /**
     * method account page clearing
     */
    purge = () => {
        this.unregisterEventListener();
        Object.values(this.#childs).forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    };
}
