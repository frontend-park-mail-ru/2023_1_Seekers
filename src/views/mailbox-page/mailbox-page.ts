import {View} from '@views/view';
import template from '@views/mailbox-page/mailbox-page.hbs'

import '@views/mailbox-page/mailbox-page.scss';

import {config} from "@config/config";
import { dispatcher } from '@utils/dispatcher';

import {microEvents} from "@utils/microevents";
import {Navbar} from "@components/navbar/navbar";
import {Menu} from "@components/menu/menu";
import {LetterList} from "@components/letter-list/letter-list";
import {Mail} from "@components/mail/mail";
import {MenuButton} from "@uikits/menu-button/menu-button";
import {SendMail} from "@components/send-mail/send-mail";

export interface MailBox {
    state: {
        element: HTMLElement,
        navbar: any,
        menu: any,
        letterList: any,
        mail: any,
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
            menu: undefined,
            letterList: undefined,
            mail: undefined,
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

        const content = this.state.element.getElementsByClassName('main-page__content')[0] as HTMLElement;

        this.state.menu = new Menu({
            parent: content,
        });
        this.state.menu.render();

        this.state.letterList = new LetterList({
            parent: content,
        });
        this.state.letterList.render();

        this.state.mail = new Mail({
            parent: content,
        });
        this.state.mail.render();

        this.registerEvents();
    };

    /**\
     * method mailbox page clearing
     */
    purge() {
        this.state.mail.purge();
        this.state.letterList.purge();
        this.state.menu.purge();
        this.state.navbar.purge();

        this.state.element.remove();
    }
}

export const mainPage = new MailBox(document.getElementById('root')!);
