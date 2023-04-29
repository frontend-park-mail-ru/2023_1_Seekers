import {Component} from '@components/component';
import {ProfileButton} from '@uikits/profile-button/profile-button';

import template from '@components/navbar/navbar.hbs';

import '@components/navbar/navbar.scss';
import {AccountSidebar} from '@components/account-sidebar/account-sidebar';
import {reducerUser} from '@stores/userStore';
import {microEvents} from '@utils/microevents';
import {config} from "@config/config";
import {dispatcher} from "@utils/dispatcher";
import {actionCreateNewMail} from "@actions/newMail";

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

    onMenuButtonClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0].classList.add('letterList__hide');
        document.getElementsByClassName('menu')[0].classList.add('menu__show');

        document.getElementById('navbar__menu-button')!.classList.add('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')!.classList.add('navbar__send-mail__hide');

        document.getElementById('navbar__back-right-mail')!.classList.add('navbar__back-right-mail__show');
        document.getElementById('navbar__email')!.classList.add('navbar__email__show');

        document.getElementById('footer-button')!.classList.add('footer-button__show');
    }

    onBackRightClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0].classList.remove('letterList__hide');
        document.getElementsByClassName('menu')[0].classList.remove('menu__show');

        document.getElementById('navbar__menu-button')!.classList.remove('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')!.classList.remove('navbar__send-mail__hide');

        document.getElementById('navbar__back-right-mail')!.classList.remove('navbar__back-right-mail__show');
        document.getElementById('navbar__email')!.classList.remove('navbar__email__show');

        document.getElementById('footer-button')!.classList.remove('footer-button__show');
    }

    onBackLeftClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0].classList.remove('letterList__hide');
        document.getElementsByClassName('mail')[0].classList.remove('mail__show');

        document.getElementById('navbar__menu-button')!.classList.remove('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')!.classList.remove('navbar__send-mail__hide');

        document.getElementById('navbar__back-left-mail')!.classList.remove('navbar__back-left-mail__show');
        document.getElementById('navbar__actions')!.classList.remove('navbar__actions__show');
    }

    onSendMailClick = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(actionCreateNewMail());
            }
        }
    }

    /**
     * method registerEventListener
     * unregister listeners for each button in letter-list
     */
    registerEventListener() {
        microEvents.bind('profileChanged', this.rerenderProfileButton);
        this.state.profileButton.addEventListener('click', this.eventCatcher);

        document.getElementById('navbar__menu-button')!.addEventListener('click', this.onMenuButtonClick);
        document.getElementById('navbar__back-right-mail')!.addEventListener('click', this.onBackRightClick);
        document.getElementById('navbar__back-left-mail')!.addEventListener('click', this.onBackLeftClick);
        document.getElementById('navbar__send-mail')!.addEventListener('click', this.onSendMailClick);
    }

    /**
     * method unregisterEventListener unregister events click on navbar
     */
    unregisterEventListener() {
        microEvents.unbind('profileChanged', this.rerenderProfileButton);
        this.state.profileButton.removeEventListener('click', this.eventCatcher);

        document.getElementById('navbar__menu-button')!.removeEventListener('click', this.onMenuButtonClick);
        document.getElementById('navbar__back-right-mail')!.removeEventListener('click', this.onBackRightClick);
        document.getElementById('navbar__back-left-mail')!.removeEventListener('click', this.onBackLeftClick);
        document.getElementById('navbar__send-mail')!.removeEventListener('click', this.onSendMailClick);
    }

    /**
     * method insert form to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                menu: config.navbar.menu,
                send: config.navbar.send,
                profile: reducerUser._storage.get(reducerUser._storeNames.profile), //why
                backRight: config.navbar.backRight,
                backLeft: config.navbar.backLeft,
                actions: config.navbar.actions,
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

