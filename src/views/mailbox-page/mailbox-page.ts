import {View} from '@views/view';
import template from '@views/mailbox-page/mailbox-page.hbs'

import '@views/mailbox-page/mailbox-page.scss';

import {config} from "@config/config";
import { dispatcher } from '@utils/dispatcher';

import {microEvents} from "@utils/microevents";
import {Navbar} from "@components/navbar/navbar";
import {MailBoxArea} from "@components/mailbox-area/mailbox-area";
import {AccountArea} from "@components/account-area/account-area";
import {AccountNavigation} from "@components/account-navigation/account-navigation";
import {AccountSidebar} from "@components/account-sidebar/account-sidebar";

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

        microEvents.bind('renderMailbox', this.render);
    }


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {

    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {

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

        this.renderMailbox();

        this.registerEvents();
    };

    renderAccountArea = () => {
        if (this.state.content){
            this.state.content.purge();
        }
        this.state.content = new AccountArea({
            parent: this.state.element
        });
        this.state.content.render();
    };

    renderMailbox = () => {
        if (this.state.content){
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
        this.state.content.purge();
        this.state.content = undefined;
        this.state.navbar.purge();
        this.state.navbar = undefined;

        this.state.element.remove();
    }
}

export const mailboxPage = new MailBox(document.getElementById('root')!);
