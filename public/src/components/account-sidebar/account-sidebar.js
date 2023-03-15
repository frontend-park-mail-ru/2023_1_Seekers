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

    /**
     * method insert sidebar to HTML
     * @param {String} ctx - string to paste in template
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['account-sidebar.hbs'](data));

        this.sidebarLinkButton = new SidebarLinkButton(document.getElementById('account-sidebar__hr'));
        this.sidebarLinkButton.render(ctx)
    }

    /**
     * method sidebar clearing from page
     */
    purge() {
        document.querySelectorAll('div.account-sidebar').forEach((e) => {
            e.remove();
        });
    }
}
