import template from '@components/account-sidebar/account-sidebar.hbs'
import '@components/account-sidebar/account-sidebar.scss'
import {SidebarLinkButton} from '@uikits/sidebar-linkButton/sidebar-linkButton';
import {Component} from "@components/component";
import {config} from "@config/config";
import {reducerUser} from "@stores/userStore";
import {dispatcher} from "@utils/dispatcher";
import {actionGetMail} from "@actions/letters";

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
export class AccountSidebar extends Component{

    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            children: [],
            isRendered: false,
        }
    }

    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    localEventCatcher = async (e: Event) => {
        console.log('catched sidebar');
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section){
                console.log('to another page');
                // dispatcher.dispatch(actionGetMail(currentTarget.dataset.section));
            }
        }
    }

    registerEventListener = () => {
        console.log('in register');
        document.addEventListener('click', this.onSidebarClick);

        this.state.children.forEach((button: Element) => {
            button.addEventListener('click', this.localEventCatcher);
        });

        this.state.element.addEventListener('transitionend', this.waitSidebarTransition);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        console.log('in unregister');
        document.removeEventListener('click', this.onSidebarClick);

        this.state.children.forEach((button: Element) => {
            button.removeEventListener('click', this.localEventCatcher);
        });

        this.state.element.removeEventListener('transitionend', this.waitSidebarTransition);
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        if (this.state.isRendered){
            this.removeSidebar();
            return;
        }
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                profile: reducerUser._storage.get(reducerUser._storeNames.profile),
                buttons: SidebarLinkButton.renderTemplate(config.buttons.sidebarButtons),
            }
        ));
        console.log('in render sidebar');

        this.state.element = this.parent.getElementsByClassName('account-sidebar')[0]
        this.state.children = [...this.state.element.getElementsByClassName('account-sidebar__item')];

        this.registerEventListener();
        this.state.isRendered = true;
    }

    onSidebarClick = (e: Event) => {
        e.preventDefault();
        console.log('onSidebarClick');
        if(e.target){
            if (!(this.state.element.contains(e.target as HTMLElement) ||
                (this.parent.contains(e.target as HTMLElement)))){
                this.removeSidebar();
            }
        }
    };

    removeSidebar = () => {
        this.state.element.classList.add('account-sidebar__delete');
    }

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
        this.state.isRendered = false;
    }
}
