import template from '@components/account-sidebar/account-sidebar.hbs';
import '@components/account-sidebar/account-sidebar.scss';
import {SidebarLinkButton} from '@uikits/sidebar-linkButton/sidebar-linkButton';
import {Component} from '@components/component';
import {config} from '@config/config';
import {reducerUser} from '@stores/userStore';
import {dispatcher} from '@utils/dispatcher';
import {actionLogout, actionGetAccountPage,
    actionGetMailboxPage, actionGetProfilePage, actionGetSecurityPage} from '@actions/user';
import {showNotification} from "@components/notification/notification";

export interface AccountSidebar {
    state: {
        element: Element,
        children: Element[],
        isRendered: boolean,
    },
}

/**
 * class implementing uikit account-sidebar
 */
export class AccountSidebar extends Component {
    /**
     * Constructor that creates a component class Mail
     * @param context - HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            children: [],
            isRendered: false,
        };
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of children of current element
     */
    localEventCatcher = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            const data = currentTarget.dataset.section;
            if (data) {
                e.stopPropagation();
                switch (data) {
                case config.buttons.sidebarButtons.profile.href:
                    await dispatcher.dispatch(actionGetAccountPage({path: data}));
                    await dispatcher.dispatch(actionGetProfilePage());
                    currentTarget.dispatchEvent(
                        new MouseEvent('click', {bubbles: true, cancelable: true}));
                    break;

                case config.buttons.sidebarButtons.mailbox.href:
                    await dispatcher.dispatch(actionGetMailboxPage({path: data}));
                    currentTarget.dispatchEvent(
                        new MouseEvent('click', {bubbles: true, cancelable: true}));
                    break;

                case config.buttons.sidebarButtons.security.href:
                    await dispatcher.dispatch(actionGetAccountPage({path: data}));
                    await dispatcher.dispatch(actionGetSecurityPage());
                    currentTarget.dispatchEvent(
                        new MouseEvent('click', {bubbles: true, cancelable: true}));
                    // this.purge();
                    // return;
                    break;
                case config.buttons.sidebarButtons.logout.href:
                    await dispatcher.dispatch(actionLogout());
                    break;
                }
                this.removeSidebar();
            }
        }
    };

    saveOnEmailClick = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                navigator.clipboard.writeText(currentTarget.dataset.section).then(() => {
                        showNotification('Скопировано!');
                    }
                );
            }
        }
    }

    registerEventListener = () => {
        document.addEventListener('click', this.onSidebarClick);

        this.state.children.forEach((button: Element) => {
            button.addEventListener('click', this.localEventCatcher);
        });

        this.state.element.addEventListener('transitionend', this.waitSidebarTransition);
        document.getElementById('account-sidebar__desc')?.addEventListener('click', this.saveOnEmailClick);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        document.removeEventListener('click', this.onSidebarClick);

        this.state.children.forEach((button: Element) => {
            button.removeEventListener('click', this.localEventCatcher);
        });

        this.state.element.removeEventListener('transitionend', this.waitSidebarTransition);
        document.getElementById('account-sidebar__desc')?.removeEventListener('click', this.saveOnEmailClick);
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        if (this.state.isRendered) {
            this.removeSidebar();
            return;
        }
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                profile: reducerUser._storage.get(reducerUser._storeNames.profile),
                buttons: SidebarLinkButton.renderTemplate(config.buttons.sidebarButtons),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('account-sidebar')[0];
        this.state.children = [...this.state.element.getElementsByClassName('account-sidebar__item')];

        this.state.children.push(
            this.state.element.getElementsByClassName('account-sidebar__avatar')[0]);

        this.registerEventListener();
        this.state.isRendered = true;
    }

    onSidebarClick = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (!(this.state.element.contains(e.target as HTMLElement) ||
                (this.parent.contains(e.target as HTMLElement))) ||
                (this.parent === (e.target as HTMLElement))) {
                this.removeSidebar();
            }
        }
    };

    removeSidebar = () => {
        this.state.element.classList.add('account-sidebar__delete');
    };

    waitSidebarTransition = () => {
        this.purge();
    };

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
        this.state.isRendered = false;
    }
}
