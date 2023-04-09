import {Component} from '@components/component';
import '@components/mail/mail.scss';
import template from '@components/mail/mail.hbs';
import {reducerLetters} from '@stores/LettersStore';
import {MailContent} from '@uikits/mail-content/mail-content';
import {microEvents} from '@utils/microevents';
import {config} from '@config/config';
import {IconButton} from '@uikits/icon-button/icon-button';
import {dispatcher} from '@utils/dispatcher';
import {actionGetLetters} from '@actions/letters';
import {reducerUser} from '@stores/userStore';
import {actionForwardMail, actionReplyToMail} from '@actions/newMail';


export interface Mail {
    state: {
        element: Element,
        actionButtons: Element[],
    },
}

/**
 * class implementing component Mail
 */
export class Mail extends Component {

    /**
     * Constructor that creates a component class Mail
     * @param {componentContext} context HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            actionButtons: [],
        };

        this.rerender = this.rerender.bind(this);
    }

    /**
     * method insert mail to HTML
     */
    render() {
        if (reducerLetters._storage.get(reducerLetters._storeNames.currentMail) === undefined) {
            this.parent.insertAdjacentHTML('afterbegin', template({}));
            this.state.element = this.parent.getElementsByClassName('mail')[0];
        } else if (reducerLetters.getCurrentMail() !== undefined) {
            const actionButtons: Object[] = [];
            Object.values(config.buttons.mailActionButtons).forEach((button: Object) => {
                actionButtons.push(IconButton.renderTemplate(button));
            });
            this.parent.insertAdjacentHTML('afterbegin', template(
                {
                    mail: reducerLetters.getCurrentMail(),
                    mailContent: MailContent.renderTemplate(reducerLetters.getCurrentMail()),
                    actionButtons: actionButtons,
                },
            ));

            this.state.element = this.parent.getElementsByClassName('mail')[0];

            this.state.actionButtons = [...this.state.element.getElementsByClassName('icon-button')];
        }
        this.registerEventListener();
    }

    /**
     * method registerEventListener
     * register listeners for current object
     */
    registerEventListener() {
        microEvents.bind('mailChanged', this.rerender);
        this.state.actionButtons.forEach((button) => {
            button.addEventListener('click', this.letterAction);
        });
    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {
        microEvents.unbind('mailChanged', this.rerender);
        this.state.actionButtons.forEach((button) => {
            button.removeEventListener('click', this.letterAction);
        });
    }

    /**
     * method purge
     * mail page clearing
     * will purge all the content in mail
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }

    rerender() {
        this.purge();
        this.render();
    }

    letterAction(e: Event) {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                switch (currentTarget.dataset.section) {
                case config.buttons.mailActionButtons.forward.href:
                    dispatcher.dispatch(actionForwardMail());
                    break;

                case config.buttons.mailActionButtons.reply.href:
                    dispatcher.dispatch(actionReplyToMail());
                    break;
                }
            }
        }
    }
}
