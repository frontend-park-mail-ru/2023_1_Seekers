import {View} from '@views/view';
import template from '@views/mailbox-page/mailbox-page.hbs';

import '@views/mailbox-page/mailbox-page.scss';

import {dispatcher} from '@utils/dispatcher';

import {microEvents} from '@utils/microevents';
import {Navbar} from '@components/navbar/navbar';
import {MailBoxArea} from '@components/mailbox-area/mailbox-area';
import {AccountArea} from '@components/account-area/account-area';
import {actionRedirect} from '@actions/user';
import {Footer} from "@components/footer/footer";


export interface MailBox {
    state: {
        element: HTMLElement,
        navbar: any,
        content: any,
        footer: any,
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
     * @param parent - HTML-element for including content
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
            footer: undefined,
        };
    }


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        microEvents.bind('renderMailbox', this.render);
        microEvents.bind('renderMailboxPage', this.renderMailbox);
        microEvents.bind('renderAccountPage', this.renderAccountArea);
        microEvents.bind('loggedOut', this.closePage);

        document.getElementById('footer-button')!.addEventListener('click', this.onFooterButtonClick);
    };


    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        microEvents.unbind('renderMailbox', this.render);
        microEvents.unbind('renderMailboxPage', this.renderMailbox);
        microEvents.unbind('renderAccountPage', this.renderAccountArea);
        microEvents.unbind('loggedOut', this.closePage);

        document.getElementById('footer-button')!.removeEventListener('click', this.onFooterButtonClick);
    };

    onFooterButtonClick = (e: Event) => {
        e.preventDefault();
        this.state.footer.render();
    }

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

        this.state.footer = new Footer({
            parent: this.state.element as HTMLElement,
        });

        // this.renderMailbox();
        this.registerEvents();
    };

    /**
     * method that renders account area
     */
    renderAccountArea = () => {
        if (this.state.element.hidden) {
            this.render();
        }
        if (this.state.content) {
            this.state.content.purge();
        }
        this.state.content = new AccountArea({
            parent: this.state.element,
        });
        this.state.content.render();
    };

    /**
     * method that renders mailbox
     */
    renderMailbox = () => {
        if (this.state.element.hidden) {
            this.render();
        }
        if (this.state.content) {
            this.state.content.purge();
        }
        this.state.content = new MailBoxArea({
            parent: this.state.element,
        });
        this.state.content.render();
    };

    /**
     * method that triggers whem page is closing
     */
    closePage = () => {
        dispatcher.dispatch(actionRedirect('/login', false, false));
    };

    /**
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
