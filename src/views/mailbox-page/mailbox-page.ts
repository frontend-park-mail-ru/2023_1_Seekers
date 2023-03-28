import {View} from '@views/view';
import template from '@views/mailbox-page/mailbox-page.hbs'

import '@views/mailbox-page/mailbox-page.scss';

import {config} from "@config/config";
import { dispatcher } from '@utils/dispatcher';

import {microEvents} from "@utils/microevents";
import {Navbar} from "@components/navbar/navbar";
import {MailBoxArea} from "@components/mailbox-area/mailbox-area";
import {AccountNavigation} from "@components/account-navigation/account-navigation";

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

        this.state.content = new AccountNavigation({
            parent: this.state.element
        });
        this.state.content.render();

        this.registerEvents();
    };

    /**\
     * method mailbox page clearing
     */
    purge() {
        this.state.content.purge();
        this.state.navbar.purge();

        this.state.element.remove();
    }
}

export const mainPage = new MailBox(document.getElementById('root')!);
