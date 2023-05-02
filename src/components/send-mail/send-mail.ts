import {Component} from '@components/component';
import {reducerUser} from '@stores/userStore';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';

import template from '@components/send-mail/send-mail.hbs';
import '@components/send-mail/send-mail.scss';
import {dispatcher} from '@utils/dispatcher';

import {config, responseStatuses} from '@config/config';
import {IconButton} from '@uikits/icon-button/icon-button';
import {actionSendDraft, actionSendMail} from '@actions/newMail';
import {microEvents} from '@utils/microevents';
import {reducerNewMail} from '@stores/NewMailStore';
import {Validation} from '@utils/validation';
import {RecipientForm} from '@uikits/recipient-form/recipient-form';
import {showNotification} from '@components/notification/notification';
import {reducerLetters} from '@stores/LettersStore';


export interface SendMail {
    state: {
        element: Element,
        area: Element,
        footerButtons: Element[],
        iconButton: Element,

        topic: HTMLInputElement,
        recipientsInput: HTMLInputElement,
        recipients: Map<string, HTMLElement>,
        text: HTMLTextAreaElement,


    },
}

/**
 * class implementing component send-mail
 */
export class SendMail extends Component {
    /**
     * Constructor that creates a component class SendMail
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            area: document.createElement('div'),
            footerButtons: [],
            iconButton: document.createElement('div'),

            topic: document.createElement('input') as HTMLInputElement,
            recipientsInput: document.createElement('input') as HTMLInputElement,
            text: document.createElement('textarea') as HTMLTextAreaElement,
            recipients: new Map(),
        };
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    bottomButtonsClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            case config.buttons.newMailButtons.footerButtons.send.href:
                await this.sendMail();
                break;

            case config.buttons.newMailButtons.footerButtons.save.href:
                const draft = this.getMailInputs();
                dispatcher.dispatch(actionSendDraft(draft));
                break;

            case config.buttons.newMailButtons.footerButtons.cancel.href:
                this.purge();
                break;
            }
        }
    };

    getMailInputs() {
        return {
            title: this.state.topic.value,
            recipients: [...this.state.recipients.keys()],
            text: this.state.text.value,
        } as MailToSend;
    }

    /**
     * function that dispatches action to send mail
     */
    sendMail = async () => {
        const mail = this.getMailInputs();

        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.newMailButtons.footerButtons.send.href;
        });

        sendButton?.classList.add('skeleton__block');
        sendButton?.classList.add('contrast-button_disabled');

        await dispatcher.dispatch(actionSendMail(mail));
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getSendResponse = () => {
        const answerStatus = reducerNewMail._storage.get(reducerNewMail._storeNames.answerStatus);
        const answerBody = reducerNewMail._storage.get(reducerNewMail._storeNames.answerBody);

        switch (answerStatus) {
        case responseStatuses.OK:
            showNotification('Письмо отправлено успешно!');
            this.purge();
            return;
        case responseStatuses.BadRequest:
            showNotification('В списке получателей нет ни одного существующего!');
            break;
        case responseStatuses.Forbidden:
            showNotification('Заполните поля!');
            break;
        default:
            showNotification(answerBody.message);
        }
        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.newMailButtons.footerButtons.send.href;
        });

        sendButton?.classList.remove('skeleton__block');
        sendButton?.classList.remove('contrast-button_disabled');
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getDraftResponse = () => {
        const answerStatus = reducerNewMail._storage.get(reducerNewMail._storeNames.answerStatus);
        const answerBody = reducerNewMail._storage.get(reducerNewMail._storeNames.answerBody);

        switch (answerStatus) {
            case responseStatuses.OK:
                showNotification('Черновик сохранён.');
                this.purge();
                return;
            default:
                showNotification(answerBody.message);
        }
        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.newMailButtons.footerButtons.send.href;
        });

        sendButton?.classList.remove('skeleton__block');
        sendButton?.classList.remove('contrast-button_disabled');
    };

    /**
     * function that triggered when close button clicked
     * @param e - event
     */
    closeButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            case config.buttons.newMailButtons.closeButton.href:
                this.purge();
                break;
            }
        }
    };

    /**
     * function that triggered when user want to delete one of recipients
     * @param e - event
     */
    onRemoveRecipientClicked = async (e: Event) => {
        if (e.currentTarget) {
            let element: any = undefined;
            this.state.recipients.forEach((recipient, key) => {
                if (recipient.contains(e.currentTarget as HTMLElement)) {
                    element = recipient;
                }
            });

            if (element) {
                e.currentTarget.removeEventListener('click', this.onRemoveRecipientClicked);
                this.state.recipients.delete(element.dataset.section);
                element.remove();
            }
        }
    };

    /**
     * function that adds new recipients to input
     * @param e - event
     */
    addRecipient = async (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const newRecipients = e.target.value.split(' ');
            e.target.value = '';
            const recipientInput = document.getElementsByClassName(
                'send-mail__input-form')[0] as HTMLElement;
            newRecipients.forEach((recipient) => {
                if (recipient !== '' && !this.state.recipients.has(recipient)) {
                    if (!recipient.includes('@')) {
                        recipient += '@mailbx.ru';
                    }

                    recipientInput.insertAdjacentHTML('afterbegin', RecipientForm.renderTemplate({
                        text: recipient,
                        closeButton: IconButton.renderTemplate(
                            config.buttons.newMailButtons.closeButton),
                    }));

                    const foundElement = [
                        ...recipientInput.getElementsByClassName('recipient-form')].find((element) => {
                        return (element as HTMLElement).dataset.section === recipient;
                    })!;

                    const validator = new Validation;
                    if (!validator.validateLogin(recipient).status) {
                        foundElement.classList.add('input-form__error__border');
                    }

                    foundElement.getElementsByClassName('icon-button')[0]
                        .addEventListener('click', this.onRemoveRecipientClicked);
                    this.state.recipients.set(recipient, foundElement as HTMLElement);
                }
            });
        }
    };

    /**
     * function that triggered when recipient input changed
     * @param e - event
     */
    onContentChanged = async (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            if (e.target.value.includes(' ')) {
                if (e.target.value.length === 1) {
                    e.target.value = '';
                    return;
                }
                await this.addRecipient(e);
            }
        }
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    registerEventListener = () => {
        document.addEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.addEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.addEventListener('click', this.closeButtonClicked);
        microEvents.bind('mailSent', this.getSendResponse);
        microEvents.bind('draftSent', this.getDraftResponse);

        this.state.recipientsInput.addEventListener('input', this.onContentChanged);
        this.state.recipientsInput.addEventListener('focusout', this.addRecipient);
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    unregisterEventListener = () => {
        document.removeEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.removeEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.removeEventListener('click', this.closeButtonClicked);
        microEvents.unbind('draftSent', this.getDraftResponse);
        microEvents.unbind('mailSent', this.getSendResponse);

        this.state.recipientsInput.removeEventListener('input', this.onContentChanged);
        this.state.recipientsInput.removeEventListener('focusout', this.addRecipient);

        this.state.recipients.forEach((element, key) => {
            element.getElementsByClassName('icon-button')[0]
                .removeEventListener('click', this.onRemoveRecipientClicked);
        });
    };

    /**
     * method that fills inputs by values from stores
     */
    setInputsState = () => {
        this.state.topic.value = reducerNewMail._storage.get(reducerNewMail._storeNames.title);
        this.state.recipientsInput.value =
            reducerNewMail._storage.get(reducerNewMail._storeNames.recipients);
        this.state.text.value = reducerNewMail._storage.get(reducerNewMail._storeNames.text);
    };


    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: object[] = [];
        Object.values(config.buttons.newMailButtons.footerButtons).forEach((button) => {
            actionButtons.push(ContrastButton.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            inputs: config.forms.newMail,
            actionButtons: actionButtons,
            closeButton: IconButton.renderTemplate(config.buttons.newMailButtons.closeButton),
        }));

        this.state.element = this.parent.getElementsByClassName('send-mail')[0];
        this.state.area = this.state.element.getElementsByClassName('send-mail-area')[0];
        this.state.footerButtons = [...this.state.element.getElementsByClassName('contrast-button')];
        this.state.iconButton = this.state.element.getElementsByClassName('icon-button')[0];

        this.state.topic =
            this.state.element.getElementsByTagName('input').namedItem(config.forms.newMail.topic.name)!;
        this.state.recipientsInput = this.state.element.getElementsByTagName('input')
            .namedItem(config.forms.newMail.recipients.name)!;

        this.state.text = this.state.element.getElementsByTagName('textarea')[0];

        this.registerEventListener();
        this.setInputsState();

        if (reducerLetters.getCurrentLettersName() !== '/drafts') {
            const saveButton = this.state.footerButtons.find((button) => {
                return (button as HTMLElement).dataset.section ===
                    config.buttons.newMailButtons.footerButtons.save.href;
            });
            saveButton?.classList.add('element-hidden');
        }

        this.state.recipientsInput.dispatchEvent(new Event('focusout'));
    }

    /**
     * method that triggers when user click beyond the boundaries of a new letter
     * @param e - event
     */
    onSidebarClick = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (this.state.element === e.target as HTMLElement) {
                const draft = this.getMailInputs();
                dispatcher.dispatch(actionSendDraft(draft));
            }
        }
    };

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}
