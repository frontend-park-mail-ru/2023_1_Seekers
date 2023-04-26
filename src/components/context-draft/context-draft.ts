import {Component} from '@components/component';

import template from '@components/context-draft/context-draft.hbs';
import '@components/context-draft/context-draft.scss';

import {config, responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';
import {reducerFolder} from '@stores/FolderStore';
import {MenuButton} from '@uikits/menu-button/menu-button';
import {dispatcher} from '@utils/dispatcher';
import {actionForwardMail, actionReplyToMail, actionSelectDraft} from '@actions/newMail';
import {microEvents} from '@utils/microevents';
import {actionDeleteMail} from "@actions/letters";
import {reducerLetters} from "@stores/LettersStore";


export interface ContextDraft {
    state: {
        element: Element,
        area: Element,
        buttons: Element[],
    },
}

/**
 * class implementing component send-mail
 */
export class ContextDraft extends Component {
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
            buttons: [],
        };
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    buttonsClicked = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            case config.buttons.contextDraftButtons.trash.folder_slug:
                dispatcher.dispatch(actionDeleteMail(reducerLetters.getCurrentContextMail().message_id));
                break;
            }
        }
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getDeleteResponse = () => {
        const [answerStatus] = reducerFolder.getAnswer();

        switch (answerStatus) {
        case responseStatuses.OK:
            showNotification('Письмо удалено успешно!');
            this.purge();
            return;
        default:
            showNotification('Что-то пошло не так.');
        }
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    registerEventListener = () => {
        document.addEventListener('click', this.onSidebarClick);
        document.addEventListener('contextmenu', this.onSidebarClick);

        this.state.buttons.forEach((button: Element) => {
            button.addEventListener('click', this.buttonsClicked);
        });
        microEvents.bind('responseFromDelete', this.getDeleteResponse);
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    unregisterEventListener = () => {
        document.removeEventListener('click', this.onSidebarClick);
        document.removeEventListener('contextmenu', this.onSidebarClick);

        this.state.buttons.forEach((button: Element) => {
            button.removeEventListener('click', this.buttonsClicked);
        });
        microEvents.unbind('responseFromDelete', this.getDeleteResponse);
    };


    /**
     * method insert sidebar to HTML
     */
    render(x: number, y: number) {
        [...document.getElementsByClassName('context-draft__area')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('menu-button')) {
                    child.removeEventListener('click', this.buttonsClicked);
                }
            });
            document.removeEventListener('click', this.onSidebarClick);
            document.removeEventListener('contextmenu', this.onSidebarClick);
            ctxMenu.remove();
        });

        const draftActionButtons: object[] = [];
        Object.values(config.buttons.contextDraftButtons).forEach((button) => {
            draftActionButtons.push(MenuButton.renderTemplate(button));
        });


        console.log(reducerFolder.getAdvancedMenu());
        if (reducerFolder.getAdvancedMenu().length === 0) {
            draftActionButtons.pop();
        }

        this.parent.insertAdjacentHTML('afterbegin', template({
            draftActionButtons: draftActionButtons,
        }));

        // this.state.element = this.parent.getElementsByClassName('context-menu')[0];
        this.state.area = this.parent.getElementsByClassName('context-draft__area')[0];
        this.state.buttons = [...this.state.area.getElementsByClassName('menu-button')];
        const ctxHeight = (this.state.area as HTMLDivElement).offsetHeight;
        const ctxWidth = (this.state.area as HTMLDivElement).offsetWidth;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if ((windowWidth - x) < ctxWidth) {
            x = x - ctxWidth;
        }

        if ((windowHeight - y) < ctxHeight) {
            y = y - ctxHeight;
        }

        (this.state.area as HTMLDivElement).style.top = y.toString() + 'px';
        (this.state.area as HTMLDivElement).style.left = x.toString() + 'px';

        this.registerEventListener();
    }

    /**
     * method that triggers when user click beyond the boundaries of a new letter
     * @param e - event
     */
    onSidebarClick = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (!(this.state.area === e.target as HTMLElement ||
                this.state.area.contains(e.target as HTMLElement))) {
                this.purge();
            }
        }
    };

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.area.remove();
    }
}
