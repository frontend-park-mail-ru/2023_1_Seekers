import {Component} from "@components/component";
import {reducerUser} from "@stores/userStore";
import {NewMailButton} from "@uikits/new-mail-button/new-mail-button";

import template from '@components/send-mail/send-mail.hbs';
import '@components/send-mail/send-mail.scss';
import {dispatcher} from "@utils/dispatcher";

import {config, responseStatuses} from "@config/config";
import {IconButton} from "@uikits/icon-button/icon-button";
import {actionLogin} from "@actions/user";
import {actionSendMail} from "@actions/newMail";
import {microEvents} from "@utils/microevents";
import {reducerNewMail} from "@stores/NewMailStore";
import {Validation} from "@utils/validation";
import {RecipientForm} from "@uikits/recipient-form/recipient-form";
import {text} from "express";
import {showNotification} from "@components/notification/notification";


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
 * class implementing uikit send-mail
 */
export class SendMail extends Component {


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
        }
    }

    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
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

                case config.buttons.newMailButtons.footerButtons.cancel.href:
                    this.purge();
                    break;
            }
        }
    }

    sendMail = async () => {
        const mail = {
            title: this.state.topic.value,
            recipients: [...this.state.recipients.keys()],
            text: this.state.text.value,
        } as MailToSend;

        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section === config.buttons.newMailButtons.footerButtons.send.href;
        });

        sendButton?.classList.add('skeleton__block');
        sendButton?.classList.add('new-mail-button_disabled');

        await dispatcher.dispatch(actionSendMail(mail));
    };

    getResponse = () => {
        const answerStatus = reducerNewMail._storage.get(reducerNewMail._storeNames.answerStatus);
        const answerBody = reducerNewMail._storage.get(reducerNewMail._storeNames.answerBody);

        switch (answerStatus) {
            case responseStatuses.OK:
                showNotification('Письмо отправлено успешно!');
                this.purge();
                return;
            case responseStatuses.BadRequest:
                showNotification('В списке получателей нет ни одного существующего!')
                break;
            case responseStatuses.Forbidden:
                showNotification('Заполните поля!');
                break;
            default:
                showNotification(answerBody.message);
        }
        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section === config.buttons.newMailButtons.footerButtons.send.href;
        });

        sendButton?.classList.remove('skeleton__block');
        sendButton?.classList.remove('new-mail-button_disabled');
    }

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
    }

    onRemoveRecipientClicked = async (e: Event) => {
        if (e.currentTarget) {
            let element: any = undefined;
                this.state.recipients.forEach((recipient, key) => {
                if (recipient.contains(e.currentTarget as HTMLElement)) {
                    element = recipient;
                }
            })

            if (element) {
                e.currentTarget.removeEventListener('click', this.onRemoveRecipientClicked);
                this.state.recipients.delete(element.dataset.section);
                element.remove();
            }
        }
    }

    addRecipient = async (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const newRecipients = e.target.value.split(' ');
            e.target.value = '';
            const recipientInput = document.getElementsByClassName('send-mail__input-form')[0] as HTMLElement;
            newRecipients.forEach((recipient) => {
                if (recipient !== '' && !this.state.recipients.has(recipient)) {

                    if (!recipient.includes('@')) {
                        recipient += '@mailbox.ru';
                    }

                    recipientInput.insertAdjacentHTML('afterbegin', RecipientForm.renderTemplate({
                        text: recipient,
                        closeButton: IconButton.renderTemplate(config.buttons.newMailButtons.closeButton),
                    }));

                    const foundElement = [...recipientInput.getElementsByClassName('recipient-form')].find(element => {
                        return (element as HTMLElement).dataset.section === recipient;
                    })!

                    const validator = new Validation;
                    if(validator.validateLogin(recipient).status === false){
                        foundElement.classList.add('input-form__error__border');
                    }

                    foundElement.getElementsByClassName('icon-button')[0].addEventListener('click', this.onRemoveRecipientClicked);
                    this.state.recipients.set(recipient, foundElement as HTMLElement);
                }
            })
        }
    }

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
    }

    registerEventListener = () => {
        document.addEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.addEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.addEventListener('click', this.closeButtonClicked);
        microEvents.bind('mailSent', this.getResponse);

        this.state.recipientsInput.addEventListener('input', this.onContentChanged);
        this.state.recipientsInput.addEventListener('focusout', this.addRecipient);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        document.removeEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.removeEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.removeEventListener('click', this.closeButtonClicked);
        microEvents.unbind('mailSent', this.getResponse);

        this.state.recipientsInput.removeEventListener('input', this.onContentChanged);
        this.state.recipientsInput.removeEventListener('focusout', this.addRecipient);

        this.state.recipients.forEach((element, key) => {
            element.getElementsByClassName('icon-button')[0]
                .removeEventListener('click', this.onRemoveRecipientClicked);
        })
    };

    setInputsState = () => {
        this.state.topic.value = reducerNewMail._storage.get(reducerNewMail._storeNames.title);
        this.state.recipientsInput.value = reducerNewMail._storage.get(reducerNewMail._storeNames.recipients);
        this.state.text.value = reducerNewMail._storage.get(reducerNewMail._storeNames.text);
    }


    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: Object[] = [];
        Object.values(config.buttons.newMailButtons.footerButtons).forEach((button) => {
            actionButtons.push(NewMailButton.renderTemplate(button));
        })

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            inputs: config.forms.newMail,
            actionButtons: actionButtons,
            closeButton: IconButton.renderTemplate(config.buttons.newMailButtons.closeButton),
        }));

        this.state.element = this.parent.getElementsByClassName('send-mail')[0];
        this.state.area = this.state.element.getElementsByClassName('send-mail-area')[0];
        this.state.footerButtons = [...this.state.element.getElementsByClassName('new-mail-button')];
        this.state.iconButton = this.state.element.getElementsByClassName('icon-button')[0];

        this.state.topic = this.state.element.getElementsByTagName('input').namedItem(config.forms.newMail.topic.name)!;
        this.state.recipientsInput = this.state.element.getElementsByTagName('input').namedItem(config.forms.newMail.recipients.name)!;

        this.state.text = this.state.element.getElementsByTagName('textarea')[0];

        this.registerEventListener();
        this.setInputsState();

        this.state.recipientsInput.dispatchEvent(new Event('focusout'));
    }

    onSidebarClick = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (this.state.element === e.target as HTMLElement) {
                this.purge();
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
