'use strict';

import '../templates.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {MailArea} from '../../components/mail-area/mail-area.js';
import {AccountSidebar} from '../../components/account-sidebar/account-sidebar.js';
import {Account} from '../account/account.js';


/**
 * class implementing popout
 */
export class Popout {

    #parent;

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
        this.#parent = parent;
        this.#context = config;
        this.#connector = connector;
    }

    /**
     * method register events button submit and input focus
     */
    registerEventListener = () => {
        addEventListener('popout', this.eventCatcher);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        removeEventListener('popout', this.eventCatcher);
    };


    /**
     * promise redirect to login page TODO:help
     * @param {object} e - event click on button logout
     */
    eventCatcher = async (e) => {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length);

        switch (rel) {
            case '/compose':

                return;
            case '/':

                break;
            default:
        }
    };

    /**
     * method prepare ctx to send in handlebars
     * @param {object} ctx - template rendering context
     * @return {Object} - form filling
     */
    prepareForm(ctx) {
        return {
            ...ctx, //TODO: delete
        };
    }

    /**
     * method insert mailbox to HTML
     */
    render = async () => {
        const data = this.prepareForm(ctx.windowData);
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['popout.hbs'](data));


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

        document.querySelectorAll('div.popout').forEach((e) => {
            e.remove();
        });
        this.unregisterEventListener();
    };
}
