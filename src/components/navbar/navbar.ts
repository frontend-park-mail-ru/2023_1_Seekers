import {Component} from "@components/component";
import {ProfileButton} from "@uikits/profile-button/profile-button";

import template from '@components/navbar/navbar.hbs';

import '@components/navbar/navbar.scss';
import {SidebarLinkButton} from "@uikits/sidebar-linkButton/sidebar-linkButton";
import {AccountSidebar} from "@components/account-sidebar/account-sidebar";

export interface Navbar {
    state: {
        element: Element,
        profileButton: Element,
    },
}

/**
 * class implementing component PromoBox
 */
export class Navbar extends Component {
    constructor(context: componentContext) {
        super(context);
    }
    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    eventCatcher = (e: Event) => {
        e.preventDefault();
        console.log('in navbar clicked');
        const sidebar = new AccountSidebar({
            parent: this.parent as HTMLElement,
        });
        sidebar.render();
    };

    /**
     * method registerEventListener
     * unregister listeners for each button in letter-list
     */
    registerEventListener() {
        this.state.profileButton.addEventListener('click', this.eventCatcher);
    }

    /**
     * method unregisterEventListener unregister events click on navbar
     */
    unregisterEventListener() {
        this.state.profileButton.removeEventListener('click', this.eventCatcher);
    }

    /**
     * method insert form to HTML
     * @param {Object} ctx - template rendering context
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                profileButton: ProfileButton.renderTemplate({}),
            }
        ));

        this.state.element = this.parent.getElementsByClassName('navbar')[0];

        this.state.profileButton = this.state.element.getElementsByClassName('profile-button')[0];

        this.registerEventListener();
    }

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}
