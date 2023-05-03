import template from '@components/footer/footer.hbs';
import '@components/footer/footer.scss';
import {SidebarLinkButton} from '@uikits/sidebar-linkButton/sidebar-linkButton';
import {Component} from '@components/component';
import {config} from '@config/config';
import {reducerUser} from '@stores/userStore';
import {dispatcher} from '@utils/dispatcher';
import {actionLogout, actionGetAccountPage,
    actionGetMailboxPage, actionGetProfilePage, actionGetSecurityPage} from '@actions/user';

export interface Footer {
    state: {
        element: Element,
        children: Element[],
        isRendered: boolean,
    },
}

/**
 * class implementing uikit footer
 */
export class Footer extends Component {
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
                        break;
                    case config.buttons.sidebarButtons.logout.href:
                        await dispatcher.dispatch(actionLogout());
                        break;
                }
                this.removeFooter();
            }
        }
    };

    registerEventListener = () => {
        document.getElementById('footer-button-close')!.addEventListener('click', this.onFooterClick);

        this.state.children.forEach((button: Element) => {
            button.addEventListener('click', this.localEventCatcher);
        });

        this.state.element.addEventListener('transitionend', this.waitFooterTransition);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        document.getElementById('footer-button-close')!.removeEventListener('click', this.onFooterClick);

        this.state.children.forEach((button: Element) => {
            button.removeEventListener('click', this.localEventCatcher);
        });

        this.state.element.removeEventListener('transitionend', this.waitFooterTransition);
    };

    /**
     * method insert Footer to HTML
     */
    render() {
        if (this.state.isRendered) {
            this.removeFooter();
            return;
        }
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                profile: reducerUser._storage.get(reducerUser._storeNames.profile),
                buttons: SidebarLinkButton.renderTemplate(config.buttons.sidebarButtons),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('footer')[0];
        this.state.children = [...this.state.element.getElementsByClassName('footer__item')];

        this.state.children.push(
            this.state.element.getElementsByClassName('footer__avatar')[0]);

        this.registerEventListener();
        this.state.isRendered = true;
    }

    onFooterClick = (e: Event) => {
        e.preventDefault();
        this.removeFooter();

    };

    removeFooter = () => {
        this.state.element.classList.add('footer__delete');
    };

    waitFooterTransition = () => {
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
