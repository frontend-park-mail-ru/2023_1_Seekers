import {SidebarLinkButton} from '@uikits/sidebar-linkButton/sidebar-linkButton';
import {Component} from "@components/component";
import {config} from "@config/config";

import template from '@components/account-navigation/account-navigation.hbs';

import '@components/account-navigation/account-navigation.scss';
import {dispatcher} from "@utils/dispatcher";
import {actionGetLetters} from "@actions/letters";
import {actionGetProfilePage, actionGetSecurityPage, actionLogout} from "@actions/user";

export interface AccountNavigation {
    state: {
        element: Element;
        navButtons: Element[],
    },
}

/**
 * class implementing uikit account-sidebar
 */
export class AccountNavigation extends Component {
    /**
     *
     * @param context
     */
    constructor(context: componentContext) {
        super(context);
    }

    navButtonClicked = async (e: Event) => {
        if(!e.isTrusted){
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        // e.target = currentTarget;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                e.stopPropagation();
                const data = currentTarget.dataset.section;
                switch (data) {
                    case config.buttons.accountButtons.profile.href:
                        dispatcher.dispatch(actionGetProfilePage());
                        currentTarget.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
                        break;
                    case config.buttons.accountButtons.security.href:
                        dispatcher.dispatch(actionGetSecurityPage());
                        currentTarget.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
                        break;
                    case config.buttons.accountButtons.logout.href:
                        dispatcher.dispatch(actionLogout());
                        break;
                }
            }
        }
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                buttons: SidebarLinkButton.renderTemplate(config.buttons.accountButtons),
            }
        ));

        this.state.element = this.parent.getElementsByClassName('account-navigation')[0];
        this.state.navButtons = [...this.state.element.getElementsByClassName('account-sidebar__item')]
        this.registerEventListener();
    }

    registerEventListener() {
        this.state.navButtons.forEach((child: Element) => {
            child.addEventListener('click', this.navButtonClicked);
        });
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        this.state.navButtons.forEach((child: Element) => {
            child.removeEventListener('click', this.navButtonClicked);
        })
    }

    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}
