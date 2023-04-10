import {Component} from '@components/component';
import {ProfileButton} from '@uikits/profile-button/profile-button';

import template from '@components/navbar/navbar.hbs';

import '@components/navbar/navbar.scss';
import {AccountSidebar} from '@components/account-sidebar/account-sidebar';
import {reducerUser} from '@stores/userStore';
import {microEvents} from '@utils/microevents';

export interface Navbar {
    state: {
        element: Element,
        profileButton: Element,
        sidebar: AccountSidebar,
    },
}

/**
 * class implementing component Navbar
 */
export class Navbar extends Component {
    /**
     * Constructor that creates a component class Navbar
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of children of current element
     */
    eventCatcher = (e: Event) => {
        e.preventDefault();
        this.state.sidebar.render();
    };

    /**
     * method registerEventListener
     * unregister listeners for each button in letter-list
     */
    registerEventListener() {
        microEvents.bind('profileChanged', this.rerenderProfileButton);
        this.state.profileButton.addEventListener('click', this.eventCatcher);
    }

    /**
     * method unregisterEventListener unregister events click on navbar
     */
    unregisterEventListener() {
        microEvents.unbind('profileChanged', this.rerenderProfileButton);
        this.state.profileButton.removeEventListener('click', this.eventCatcher);
    }

    /**
     * method insert form to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                profileButton: ProfileButton.renderTemplate(
                    reducerUser._storage.get(reducerUser._storeNames.profile)),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('navbar')[0];

        this.state.profileButton = this.state.element.getElementsByClassName('profile-button')[0];

        this.state.sidebar = new AccountSidebar({
            parent: this.state.element as HTMLElement,
        });

        this.registerEventListener();
    }

    rerenderProfileButton = () => {
        this.state.profileButton.removeEventListener('click', this.eventCatcher);
        this.state.profileButton.remove();
        this.state.element.getElementsByClassName('navbar__frame-right')[0].insertAdjacentHTML(
            'afterbegin',
            ProfileButton.renderTemplate(reducerUser._storage.get(reducerUser._storeNames.profile)),
        );
        this.state.profileButton = this.state.element.getElementsByClassName('profile-button')[0];
        this.state.profileButton.addEventListener('click', this.eventCatcher);
    };

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.state.sidebar.purge();
        this.state.element.remove();
    }
}

