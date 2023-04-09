import {Component} from '@components/component';
import template from '@components/mailbox-area/mailbox-area.hbs';
import '@components/mailbox-area/mailbox-area.scss';

import {config} from '@config/config';
import {dispatcher} from '@utils/dispatcher';

import {microEvents} from '@utils/microevents';
import {Menu} from '@components/menu/menu';
import {LetterList} from '@components/letter-list/letter-list';
import {Mail} from '@components/mail/mail';
import {SendMail} from '@components/send-mail/send-mail';


export interface MailBoxArea {
    state: {
        element: HTMLElement,
        menu: any,
        letterList: any,
        mail: any,
    }
}

/**
 * class implementing login page
 */
export class MailBoxArea extends Component {
    /**
     * Private field that contains a form validator
     */
    context: any;

    /**
     *
     * @param {componentContext} context HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);

        this.state = {
            element: document.createElement('div'),
            menu: undefined,
            letterList: undefined,
            mail: undefined,
        };
    }


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        microEvents.bind('createNewMail', this.renderNewMail);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        microEvents.unbind('createNewMail', this.renderNewMail);
    };

    renderNewMail = () => {
        const sendMail = new SendMail({parent: document.getElementById('root')!});
        sendMail.render();
    };

    /**
     * method insert login to HTML
     */
    render = () => {
        this.parent.insertAdjacentHTML('afterbegin', template({}));

        this.state.element = this.parent.getElementsByClassName('mailbox-area')[0] as HTMLElement;

        this.state.menu = new Menu({
            parent: this.state.element,
        });
        this.state.menu.render();

        this.state.letterList = new LetterList({
            parent: this.state.element,
        });
        this.state.letterList.render();

        this.state.mail = new Mail({
            parent: this.state.element,
        });
        this.state.mail.render();

        this.registerEvents();
    };

    /** \
     * method mailbox page clearing
     */
    purge() {
        this.unregisterEvents();
        this.state.mail.purge();
        this.state.letterList.purge();
        this.state.menu.purge();

        this.state.element.remove();
    }
}
