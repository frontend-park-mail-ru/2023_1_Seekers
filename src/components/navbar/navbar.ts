import {Component} from "@components/component";
import {ProfileButton} from "@uikits/profile-button/profile-button";

import template from '@components/navbar/navbar.hbs';

import '@components/navbar/navbar.scss';

export interface Navbar {
    state: {
        profileButton: HTMLElement,
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
        // dispatcher.dispatch();
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

        this.element = this.parent.getElementsByClassName('navbar')[0];

        this.state = {
            profileButton: this.element.getElementsByClassName('profile-button')[0],
        };

        this.registerEventListener();
    }

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.element.remove();
    }
}

