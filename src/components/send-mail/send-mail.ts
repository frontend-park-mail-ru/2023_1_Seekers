import template from '@components/send-mail/send-mail.hbs'
import '@components/send-mail/send-mail.scss'

import {Component} from "@components/component";


export interface SendMail {
    // state: {
    //     element: Element,
    //     children: Element[],
    //     isRendered: boolean,
    // },
}

/**
 * class implementing uikit send-mail
 */
export class SendMail extends Component {

    constructor(context: componentContext) {
        super(context);
        // this.state = {
        //     element: document.createElement('div'),
        //     children: [],
        //     isRendered: false,
        // }
    }

    // /**
    //  * method handle click on navbar
    //  * @param {Event} e - event that goes from one of childs of current element
    //  */
    // localEventCatcher = async (e: Event) => {
    //     console.log('catched sidebar');
    //     e.preventDefault();
    //     const {currentTarget} = e;
    //     if (currentTarget instanceof HTMLElement) {
    //         if (currentTarget.dataset.section) {
    //             console.log('to another page');
    //             this.removeSidebar();
    //             // dispatcher.dispatch(actionGetMail(currentTarget.dataset.section));
    //         }
    //     }
    // }

    // registerEventListener = () => {
    //     console.log('in register');
    //     document.addEventListener('click', this.onSidebarClick);
    //
    //     this.state.children.forEach((button: Element) => {
    //         button.addEventListener('click', this.localEventCatcher);
    //     });
    //
    //     this.state.element.addEventListener('transitionend', this.waitSidebarTransition);
    // };

    // /**
    //  * method unregister events button submit and input focus
    //  */
    // unregisterEventListener = () => {
    //     console.log('in unregister');
    //     document.removeEventListener('click', this.onSidebarClick);
    //
    //     this.state.children.forEach((button: Element) => {
    //         button.removeEventListener('click', this.localEventCatcher);
    //     });
    //
    //     this.state.element.removeEventListener('transitionend', this.waitSidebarTransition);
    // };

    /**
     * method insert sidebar to HTML
     */
    render() {
        // if (this.state.isRendered) {
        //     this.removeSidebar();
        //     return;
        // }
        this.parent.insertAdjacentHTML('afterbegin', template(

        ));
    }

    // onSidebarClick = (e: Event) => {
    //     e.preventDefault();
    //     console.log('onSidebarClick');
    //     if (e.target) {
    //         if (!(this.state.element.contains(e.target as HTMLElement) ||
    //             (this.parent.contains(e.target as HTMLElement)))) {
    //             this.removeSidebar();
    //         }
    //     }
    // };
    //
    // removeSidebar = () => {
    //     this.state.element.classList.add('account-sidebar__delete');
    // }
    //
    // waitSidebarTransition = () => {
    //     this.purge();
    // };
    //
    // /**
    //  * method sidebar clearing from page
    //  */
    // purge() {
    //     this.unregisterEventListener();
    //     document.querySelectorAll('div.account-sidebar').forEach((e) => {
    //         e.remove();
    //     });
    //     this.state.isRendered = false;
    // }
}
