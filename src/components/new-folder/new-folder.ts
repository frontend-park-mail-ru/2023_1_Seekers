import {Component} from '@components/component';
import {reducerUser} from '@stores/userStore';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';

import template from '@components/new-folder/new-folder.hbs';
import '@components/new-folder/new-folder.scss';

import {config, responseStatuses} from '@config/config';
import {IconButton} from '@uikits/icon-button/icon-button';
import {reducerNewMail} from '@stores/NewMailStore';
import {showNotification} from '@components/notification/notification';
import {microEvents} from '@utils/microevents';
import {dispatcher} from "@utils/dispatcher";
import {actionSendFolderToCreate} from "@actions/folders";
import {reducerFolder} from "@stores/FolderStore";


export interface NewFolder {
    state: {
        element: Element,
        area: Element,
        footerButtons: Element[],
        iconButton: Element,

        folderInput: HTMLInputElement,
    },
}

/**
 * class implementing component send-mail
 */
export class NewFolder extends Component {
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
            folderInput: document.createElement('input') as HTMLInputElement,
        };
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    bottomButtonsClicked = async (e: Event) => {
        e.preventDefault();
        console.log('bottom clicked');
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            case config.buttons.newFolderButtons.footerButtons.send.href:
                await this.createFolder();
                break;

            case config.buttons.newFolderButtons.footerButtons.cancel.href:
                this.purge();
                break;
            }
        }
    };

    /**
     * function that dispatches action to send mail
     */
    createFolder = async () => {
        console.log('create folder');
        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.newFolderButtons.footerButtons.send.href;
        });
        console.log(sendButton);
        sendButton?.classList.add('contrast-button_disabled');
        sendButton?.classList.add('skeleton__block');

        console.log(this.state.folderInput.value!);
        console.log(this.state.folderInput);

        await dispatcher.dispatch(actionSendFolderToCreate(this.state.folderInput.value!));
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getResponse = () => {
        const answerStatus = reducerFolder._storage.get(reducerFolder._storeNames.answerStatus);
        const answerBody = reducerFolder._storage.get(reducerFolder._storeNames.answerBody);

        switch (answerStatus) {
        case responseStatuses.OK:
            showNotification('Папка создана успешно!');
            document.getElementsByClassName('menu')[0].classList.add('menu__show');
            this.purge();
            return;
        case responseStatuses.BadRequest:
            showNotification('Заполните поля!');
            break;
        default:
            showNotification(answerBody.message);
        }
        const sendButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.newFolderButtons.footerButtons.send.href;
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
            case config.buttons.newFolderButtons.closeButton.href:
                this.purge();
                break;
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
        microEvents.bind('folderRequestSent', this.getResponse);
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
        microEvents.unbind('folderRequestSent', this.getResponse);
    };


    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: object[] = [];
        Object.values(config.buttons.newFolderButtons.footerButtons).forEach((button) => {
            actionButtons.push(ContrastButton.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            actionButtons: actionButtons,
            closeButton: IconButton.renderTemplate(config.buttons.newFolderButtons.closeButton),
            input: config.forms.newFolder.folderInput,
        }));

        this.state.element = this.parent.getElementsByClassName('new-folder')[0];
        this.state.area = this.state.element.getElementsByClassName('new-folder-area')[0];
        this.state.footerButtons = [...this.state.element.getElementsByClassName('contrast-button')];
        this.state.iconButton = this.state.element.getElementsByClassName('icon-button')[0];

        this.state.folderInput = this.state.element
            .querySelector(`input[name=${config.forms.newFolder.folderInput.name}]`) as HTMLInputElement;

        this.registerEventListener();
    }

    /**
     * method that triggers when user click beyond the boundaries of a new letter
     * @param e - event
     */
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
