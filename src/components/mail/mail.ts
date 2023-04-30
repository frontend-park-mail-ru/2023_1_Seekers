import {Component} from '@components/component';
import '@components/mail/mail.scss';
import template from '@components/mail/mail.hbs';
import {reducerLetters} from '@stores/LettersStore';
import {MailContent} from '@uikits/mail-content/mail-content';
import {microEvents} from '@utils/microevents';
import {config} from '@config/config';
import {IconButton} from '@uikits/icon-button/icon-button';
import {dispatcher} from '@utils/dispatcher';
import {actionForwardMail, actionReplyToMail} from '@actions/newMail';
import {actionCtxMail} from '@actions/letters';
import {ContextLetter} from '@components/context-letter/context-letter';


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
     * @param context - HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            actionButtons: [],
        };

        this.rerenderMail = this.rerenderMail.bind(this);
    }

    /**
     * method insert mail to HTML
     */
    render() {
        if (reducerLetters._storage.get(reducerLetters._storeNames.shownMail) === undefined) {
            this.parent.insertAdjacentHTML('afterbegin', template({}));
            this.state.element = this.parent.getElementsByClassName('mail')[0];
        } else if (reducerLetters.getCurrentMail() !== undefined) {
            const actionButtons: object[] = [];
            Object.values(config.buttons.mailActionButtons).forEach((button: object) => {
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
            this.state.element.classList.add('mail__show');
        }
        this.registerEventListener();
    }

    /**
     * method letterList page rerender
     */
    rerenderMail() {
        console.log('rerender mail');
        this.purge();
        this.render();
    }

    /**
     * method registerEventListener
     * register listeners for current object
     */
    registerEventListener() {
        microEvents.bind('mailChanged', this.rerenderMail);
        this.state.actionButtons.forEach((button) => {
            button.addEventListener('click', this.letterAction);
        });
        console.log(microEvents);
    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {
        console.log('unregister events');
        microEvents.unbind('mailChanged', this.rerenderMail);
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



    /**
     * function that binds to the bottom buttons click
     * @param e - event
     */
    letterAction(e: Event) {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                switch (currentTarget.dataset.section) {
                case config.buttons.mailActionButtons.forward.href:
                    dispatcher.dispatch(actionCtxMail(reducerLetters.getCurrentMailPath()));
                    dispatcher.dispatch(actionForwardMail());
                    break;

                case config.buttons.mailActionButtons.reply.href:
                    dispatcher.dispatch(actionCtxMail(reducerLetters.getCurrentMailPath()));
                    dispatcher.dispatch(actionReplyToMail());
                    break;

                case config.buttons.mailActionButtons.more.href:
                    dispatcher.dispatch(actionCtxMail(reducerLetters.getCurrentMailPath()));
                    const ctxMenu = new ContextLetter({parent: document.getElementById('root')!});
                    ctxMenu.render((e as MouseEvent).clientX, (e as MouseEvent).clientY);
                    break;
                }
                e.stopPropagation();
                // currentTarget.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
            }
        }
    }
}
