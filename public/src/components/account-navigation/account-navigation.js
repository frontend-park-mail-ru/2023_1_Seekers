import '../templates.js';
import {SidebarLinkButton} from "../../uikit/sidebar-linkButton/sidebar-linkButton.js";

/**
 * class implementing uikit account-sidebar
 */
export class AccountNavigation {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method prepare ctx to send in handlebars
     * @param {object} ctx - template rendering context
     * @return {{Object}} - form filling
     */
    prepareForm(ctx) {
        return {
            ...ctx,
        };
    }

    registerEventListener = () => {

    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {

    };

    /**
     * method insert sidebar to HTML
     * @param {String} ctx - string to paste in template
     */
    render(ctx) {

        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['account-navigation.hbs'](data));

        this.sidebarLinkButton = new SidebarLinkButton(document.getElementById('account-navigation__hr'));
        this.sidebarLinkButton.render(ctx);

        this.registerEventListener();
    }

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        document.querySelectorAll('div.account-navigation').forEach((e) => {
            e.remove();
        });
    }
}
