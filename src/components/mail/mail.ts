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
import {actionCtxMail, actionShowPasteEmail} from '@actions/letters';
import {ContextLetter} from '@components/context-letter/context-letter';
import {showNotification} from "@components/notification/notification";
import {AttachmentList} from "@components/attachment-list/attachment-list";


export interface Mail {
    state: {
        element: Element,
        actionButtons: Element[],
        attachmentsList: any,
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
            attachmentsList: null,
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
                    title: reducerLetters.getCurrentMail().title,
                    mail: reducerLetters.getCurrentMail(),
                    mailContent: MailContent.renderTemplate(reducerLetters.getCurrentMail()),
                    actionButtons: actionButtons,
                },
            ));

            this.state.element = this.parent.getElementsByClassName('mail')[0];

            this.state.actionButtons = [...this.state.element.getElementsByClassName('icon-button')];
            this.state.element.classList.add('mail__show');

            if (document.getElementById('attachment-list') &&
                reducerLetters.getCurrentMail().attachments.length != 0) {
                this.state.attachmentsList = new AttachmentList({
                    parent: document.getElementById('attachment-list')!,
                });
                this.state.attachmentsList.render();
            }
        }
        this.registerEventListener();
    }

    /**
     * method letterList page rerender
     */
    rerenderMail() {
        this.purge();
        this.render();
    }

    saveOnEmailClick = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                navigator.clipboard.writeText(currentTarget.dataset.section).then(() => {
                        showNotification('Скопировано!');
                    }
                );
            }
        }
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
        document.getElementById('mail__contact')?.addEventListener('click', this.saveOnEmailClick);
    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {
        microEvents.unbind('mailChanged', this.rerenderMail);
        this.state.actionButtons.forEach((button) => {
            button.removeEventListener('click', this.letterAction);
        });
        document.getElementById('mail__contact')?.removeEventListener('click', this.saveOnEmailClick);
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
