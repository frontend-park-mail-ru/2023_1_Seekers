import {Component} from '@components/component';
import {reducerUser} from '@stores/userStore';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';

import template from '@components/rename-folder/rename-folder.hbs';
import '@components/rename-folder/rename-folder.scss';

import {config, responseStatuses} from '@config/config';
import {IconButton} from '@uikits/icon-button/icon-button';
import {reducerNewMail} from '@stores/NewMailStore';
import {showNotification} from '@components/notification/notification';
import {microEvents} from '@utils/microevents';
import {dispatcher} from "@utils/dispatcher";
import {actionRenameFolderByCtx, actionSendFolderToCreate} from "@actions/folders";
import {reducerFolder} from "@stores/FolderStore";


export interface RenameFolder {
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
export class RenameFolder extends Component {
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
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            case config.buttons.renameFolderButtons.footerButtons.rename.href:
                await this.renameFolder();
                break;

            case config.buttons.renameFolderButtons.footerButtons.cancel.href:
                this.purge();
                break;
            }
        }
    };

    /**
     * function that dispatches action to send mail
     */
    renameFolder = async () => {
        const renameButton = this.state.footerButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                config.buttons.renameFolderButtons.footerButtons.rename.href;
        });
        renameButton?.classList.add('contrast-button_disabled');
        renameButton?.classList.add('skeleton__block');

        await dispatcher.dispatch(actionRenameFolderByCtx(this.state.folderInput.value!));
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getResponse = () => {
        const answerStatus = reducerFolder._storage.get(reducerFolder._storeNames.answerStatus);
        const answerBody = reducerFolder._storage.get(reducerFolder._storeNames.answerBody);

        switch (answerStatus) {
        case responseStatuses.OK:
            showNotification('Папка переименована успешно!');
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
                config.buttons.renameFolderButtons.footerButtons.rename.href;
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
            case config.buttons.renameFolderButtons.closeButton.href:
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
        microEvents.bind('folderRenamed', this.getResponse);
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
        microEvents.unbind('folderRenamed', this.getResponse);
    };


    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: object[] = [];
        Object.values(config.buttons.renameFolderButtons.footerButtons).forEach((button) => {
            actionButtons.push(ContrastButton.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            actionButtons: actionButtons,
            closeButton: IconButton.renderTemplate(config.buttons.renameFolderButtons.closeButton),
            input: config.forms.newFolder.folderInput,
        }));

        this.state.element = this.parent.getElementsByClassName('rename-folder')[0];
        this.state.area = this.state.element.getElementsByClassName('rename-folder-area')[0];
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
