import '../templates.js';
import {SidebarLinkButton} from "../../uikit/sidebar-linkButton/sidebar-linkButton.js";

/**
 * class implementing uikit account-sidebar
 */
export class AccountSidebar {
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
        document.addEventListener('click', this.onSidebarClick);

        const sidebar = document.querySelector('.account-sidebar');
        sidebar.addEventListener('transitionend', this.waitSidebarTransition);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        document.removeEventListener('click', this.onSidebarClick);
    };

    /**
     * method insert sidebar to HTML
     * @param {String} ctx - string to paste in template
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['account-sidebar.hbs'](data));

        this.sidebarLinkButton = new SidebarLinkButton(document.getElementById('account-sidebar__hr'));
        this.sidebarLinkButton.render(ctx);

        this.registerEventListener();
    }

    onSidebarClick = (e) => {
        if(!document.querySelector('.account-sidebar').contains(e.target)){
            document.querySelector('.account-sidebar').classList.add('account-sidebar__delete');
        }
    }

    waitSidebarTransition = () => {
        this.purge();
    }

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        document.querySelectorAll('div.account-sidebar').forEach((e) => {
            e.remove();
        });
    }
}
