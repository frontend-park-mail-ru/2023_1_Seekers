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
import {DataList} from '@components/data-list/data-list';
import {actionSearch} from '@actions/letters';


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

        editRecipient: HTMLElement
    },
    datalist: DataList,

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

            editRecipient: document.createElement('div'),
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

                if (draft.title === '' &&
                        draft.recipients.length === 0 &&
                        draft.text === '') {
                    this.purge();
                    return;
                }

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
                [...document.getElementsByClassName('data-list')].forEach((ctxMenu) => {
                    [...ctxMenu.children].forEach((child) => {
                        if (child.classList.contains('profile-data__item')) {
                            child.removeEventListener('click', this.buttonsClicked);
                            child.removeEventListener('mouseover', this.mouseOverButton);
                        }
                    });
                    ctxMenu.remove();
                });
                return;
            }
        }
    };

    /**
     * function that triggered when user want to delete one of recipients
     * @param e - event
     */
    onRemoveRecipientClicked = async (e: Event) => {
        e.preventDefault();
        if (e.currentTarget) {
            let element: any = undefined;
            this.state.recipients.forEach((recipient, key) => {
                if (recipient.contains(e.currentTarget as HTMLElement)) {
                    element = recipient;
                }
            });

            if (element) {
                e.currentTarget.removeEventListener('click', this.onRemoveRecipientClicked);
                element.removeEventListener('click', this.onRecipientClicked);
                this.state.recipients.delete(element.dataset.section);
                element.remove();
                e.stopPropagation();
            }
        }
    };

    onRecipientClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement && currentTarget.dataset.section) {

            currentTarget.getElementsByClassName('recipient-form__span')[0].classList.add('element-hidden');
            const input = currentTarget.getElementsByClassName('recipient-form__input')[0] as HTMLInputElement;

            input.classList.remove('element-hidden');
            input.focus();
            input.setSelectionRange(0, input.value.length);

            this.state.recipients.delete(currentTarget.dataset.section);

            currentTarget.removeEventListener('click', this.onRecipientClicked);
            input.addEventListener('keypress', this.editRecipient);
            input.addEventListener('focusout', this.focusOutRecipient);
            input.value = currentTarget.dataset.section;

            this.state.editRecipient = currentTarget as HTMLElement;
        }
    };

    editRecipient = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            this.changeRecipient(e);
        }
    };

    focusOutRecipient = async (e: Event) => {
        this.changeRecipient(e);
    };

    changeRecipient = (e: Event) => {
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLInputElement) {
            e.preventDefault();
            const input = currentTarget as HTMLInputElement;

            const span = this.state.editRecipient.getElementsByClassName('recipient-form__span')[0];
            input.removeEventListener('keypress', this.editRecipient);
            input.removeEventListener('focusout', this.focusOutRecipient);

            input.classList.add('element-hidden');
            span.classList.remove('element-hidden');
            if (input.value.length === 0 || this.state.recipients.has(input.value)) {
                this.state.editRecipient.getElementsByClassName('icon-button')[0]
                    .removeEventListener('click', this.onRemoveRecipientClicked);
                this.state.editRecipient.remove();
                e.stopPropagation();
            } else {
                this.state.recipients.set(input.value, this.state.editRecipient);
                this.state.editRecipient.dataset.section = input.value;
                span.textContent = input.value;
                this.state.editRecipient.addEventListener('click', this.onRecipientClicked);
            }
        }
    };

    showDataList = (e: Event) => {
        e.preventDefault();
        const me = e as MouseEvent;
        this.datalist = new DataList({parent: document.getElementById('root')!});
        e.stopPropagation();
        this.datalist.render(me.clientX, me.clientY);
    };

    removeDataList = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (!(document.getElementById('data-list') === e.target as HTMLElement ||
                document.getElementById('data-list')?.contains(e.target as HTMLElement))) {
                this.datalist?.purge();
                const recipientInput = document.getElementById('new-mail-recipients') as HTMLInputElement
                recipientInput.value = '';
            }
        }
    };

    _addRecipient = (recipient: string, recipientInput: HTMLElement) => {
        if (!this.state.recipients.has(recipient)) {
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
            if (!validator.validateEmail(recipient).status) {
                foundElement.classList.add('input-form__error__border');
            }

            foundElement.getElementsByClassName('icon-button')[0]
                .addEventListener('click', this.onRemoveRecipientClicked);
            this.state.recipients.set(recipient, foundElement as HTMLElement);

            (foundElement as HTMLElement).addEventListener('click', this.onRecipientClicked);
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
                'send-mail__recipients')[0] as HTMLElement;
            newRecipients.forEach((recipient) => {
                if (recipient !== '') {
                    if (!recipient.includes('@')) {
                        recipient += '@mailbx.ru';
                    }
                    this._addRecipient(recipient, recipientInput);
                }
            });
        }
    };

    pasteEmailToRecipient = () => {
        const recipientForm = document.getElementsByClassName(
            'send-mail__recipients')[0] as HTMLElement;
        this._addRecipient(reducerLetters.getEmailToPaste(), recipientForm);
        this.datalist.purge();
        const recipientInput = document.getElementById('new-mail-recipients') as HTMLInputElement;
        recipientInput.value = '';
        document.getElementById('new-mail-recipients')?.focus();
    };

    showPasteEmailToRecipient = () => {
        const recipientInput = document.getElementById('new-mail-recipients') as HTMLInputElement;
        recipientInput.value = reducerLetters.getEmailToPaste();
    };

    /**
     * function that triggered when recipient input changed
     * @param e - event
     */
    onContentChanged = async (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            this.datalist.purge();
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
        microEvents.bind('pasteEmailInRecipient', this.pasteEmailToRecipient);
        microEvents.bind('showPasteEmailInRecipient', this.showPasteEmailToRecipient);


        this.state.recipientsInput.addEventListener('input', this.onContentChanged);
        // this.state.recipientsInput.addEventListener('focusout', this.addRecipient);

        document.getElementById('new-mail-recipients')?.addEventListener('click', this.showDataList);
        this.state.element.addEventListener('click', this.removeDataList);
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
        microEvents.unbind('pasteEmailInRecipient', this.pasteEmailToRecipient);
        microEvents.unbind('showPasteEmailInRecipient', this.showPasteEmailToRecipient);

        this.state.recipientsInput.removeEventListener('input', this.onContentChanged);
        // this.state.recipientsInput.removeEventListener('focusout', this.addRecipient);

        this.state.recipients.forEach((element, key) => {
            element.getElementsByClassName('icon-button')[0]
                .removeEventListener('click', this.onRemoveRecipientClicked);
            element.removeEventListener('click', this.onRecipientClicked);
        });

        document.getElementById('new-mail-recipients')?.removeEventListener('click', this.showDataList);
        this.state.element.removeEventListener('click', this.removeDataList);
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

        // this.state.recipientsInput.dispatchEvent(new Event('focusout'));
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
                if (draft.title === '' &&
                    draft.recipients.length === 0 &&
                    draft.text === '') {
                    this.purge();
                    return;
                }
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
