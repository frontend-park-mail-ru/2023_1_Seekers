'use strict';

import {BasePage} from '../base-page.js';
import '../templates.js';
import {Navbar} from "../../components/navbar/navbar.js";
import {AccountNavigation} from "../../components/account-navigation/account-navigation.js";
import {AccountProfile} from "../../components/account-profile/account-profile.js";


/**
 * class implementing account
 */
export class Account {
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

    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} config - template rendering context
     * @param {Object} connector - connector to backend
     */
    constructor(parent, config, connector) {
        this.#parent = parent;

        this.#context = config;
        this.#connector = connector;
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
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['account.hbs']());

        this.#element = document.getElementById('account-page');

        this.#childs['account-navigation'] = new AccountNavigation(document.getElementById('account-content__navigation'));
        this.#childs['account-navigation'].render(this.#context.accountFields.account);

        this.profile = new AccountProfile(document.getElementById('account-content__content'));
        this.profile.render(this.#context.accountFields.account);


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
