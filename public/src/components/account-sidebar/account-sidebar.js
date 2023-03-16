import '../templates.js';
import {SidebarLinkButton} from '../../uikit/sidebar-linkButton/sidebar-linkButton.js';

/**
 * class implementing uikit account-sidebar
 */
export class AccountSidebar {
    #parent;

    #element;

    #buttons;

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
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    eventCatcher = (e) => {
        e.preventDefault();
        e.currentTarget.dispatchEvent(new Event('toMainPage', {bubbles: true}));
    };

    registerEventListener = () => {
        document.addEventListener('click', this.onSidebarClick);

        this.#buttons.forEach((button) => {
            console.log(button.href);
            button.addEventListener('click', this.eventCatcher);
        });

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
        this.#element = document.getElementById('account-sidebar');
        this.sidebarLinkButton = new SidebarLinkButton(document.getElementById('account-sidebar__hr'));
        this.sidebarLinkButton.render(ctx);

        this.#buttons = [...this.#element.getElementsByClassName('account-sidebar__item')];

        this.registerEventListener();
    }

    onSidebarClick = (e) => {
        if (!document.querySelector('.account-sidebar').contains(e.target) &&
            !document.querySelector('.profile-button').contains(e.target)) {
            document.querySelector('.account-sidebar').classList.add('account-sidebar__delete');
        }
    };

    waitSidebarTransition = () => {
        this.purge();
    };

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
