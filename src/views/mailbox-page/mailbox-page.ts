import {View} from '@views/view';
import template from '@views/mailbox-page/mailbox-page.hbs'

import '@views/mailbox-page/mailbox-page.scss';

import {config} from "@config/config";
import {dispatcher} from '@utils/dispatcher';

import {microEvents} from "@utils/microevents";
import {Navbar} from "@components/navbar/navbar";
import {MailBoxArea} from "@components/mailbox-area/mailbox-area";
import {AccountArea} from "@components/account-area/account-area";


export interface MailBox {
    state: {
        element: HTMLElement,
        navbar: any,
        content: any,
    }
}

/**
 * class implementing login page
 */
export class MailBox extends View {
    /**
     * Private field that contains a form validator
     */
    context: any;


    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent: Element) {
        super(
            parent,
            template,
        );

        this.state = {
            element: document.createElement('div'),
            navbar: undefined,
            content: undefined,
        }
    }


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        microEvents.bind('renderMailbox', this.render);
        microEvents.bind('renderMailboxPage', this.renderMailbox);
        microEvents.bind('renderAccountPage', this.renderAccountArea);
    }


    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        microEvents.unbind('renderMailbox', this.render);
        microEvents.unbind('renderMailboxPage', this.renderMailbox);
        microEvents.unbind('renderAccountPage', this.renderAccountArea);
    };

    /**
     * method insert login to HTML
     */
    override render = () => {

        super.render({});

        this.state.element = this.parent.getElementsByClassName('main-page')[0] as HTMLElement;

        this.state.navbar = new Navbar({
            parent: this.state.element,
        });
        this.state.navbar.render();
        // this.renderMailbox();
        this.registerEvents();
    };

    renderAccountArea = () => {
        if (this.state.element.hidden) {
            this.render();
        }
        if (this.state.content) {
            this.state.content.purge();
        }
        this.state.content = new AccountArea({
            parent: this.state.element
        });
        this.state.content.render();
    };

    renderMailbox = () => {
        if (this.state.element.hidden) {
            this.render();
        }
        if (this.state.content) {
            this.state.content.purge();
        }
        this.state.content = new MailBoxArea({
            parent: this.state.element
        });
        this.state.content.render();
    };

    /**\
     * method mailbox page clearing
     */
    purge() {
        this.unregisterEvents();

        this.state.content.purge();
        this.state.content = undefined;
        this.state.navbar.purge();
        this.state.navbar = undefined;

        this.state.element.remove();
    }
}

export const mailboxPage = new MailBox(document.getElementById('root')!);
