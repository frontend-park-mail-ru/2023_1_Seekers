import {Component} from '@components/component';

import template from '@components/context-menu/context-menu.hbs';
import '@components/context-menu/context-menu.scss';

import {config, responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';
import {reducerFolder} from '@stores/FolderStore';
import {MenuButton} from '@uikits/menu-button/menu-button';
import {dispatcher} from '@utils/dispatcher';
import {actionForwardMail, actionReplyToMail} from '@actions/newMail';
import {actionTransmitToFolder} from "@actions/folders";
import {reducerLetters} from "@stores/LettersStore";
import {microEvents} from "@utils/microevents";
import {AdvancedContextMenu} from "@components/advanced-context-menu/advanced-context-menu";


export interface ContextMenu {
    state: {
        element: Element,
        area: Element,
        buttons: Element[],
    },
}

/**
 * class implementing component send-mail
 */
export class ContextMenu extends Component {
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
            case config.buttons.contextMenuButtons.mailActions.forward.folder_slug:
                dispatcher.dispatch(actionForwardMail());
                this.purge();
                break;

            case config.buttons.contextMenuButtons.mailActions.reply.folder_slug:
                dispatcher.dispatch(actionReplyToMail());
                this.purge();
                break;

            case config.buttons.contextMenuButtons.folderActions.another.folder_slug:
                const ctxMenu = new AdvancedContextMenu({parent: document.getElementById('root')!});
                ctxMenu.render((e as MouseEvent).clientX, (e as MouseEvent).clientY);
                e.stopPropagation();
                break;

            default:
                dispatcher.dispatch(actionTransmitToFolder(currentTarget.dataset.section.split('/')[1]));
            }
        }
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getResponse = () => {
        const [answerStatus] = reducerFolder.getAnswer();

        switch (answerStatus) {
        case responseStatuses.OK:
            showNotification('Письмо перенесено успешно!');
            this.purge();
            return;
        case responseStatuses.BadRequest:
            showNotification('Письмо уже в выбранной папке.');
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
        microEvents.bind('responseFromTransmitFolder', this.getResponse);
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
        microEvents.unbind('responseFromTransmitFolder', this.getResponse);
    };


    /**
     * method insert sidebar to HTML
     */
    render(x: number, y: number) {
        [...document.getElementsByClassName('context-menu__area')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('menu-button')) {
                    child.removeEventListener('click', this.buttonsClicked);
                }
            });
            document.removeEventListener('click', this.onSidebarClick);
            document.removeEventListener('contextmenu', this.onSidebarClick);
            ctxMenu.remove();
        });

        console.log(x, y);
        const mailActionButtons: object[] = [];
        Object.values(config.buttons.contextMenuButtons.mailActions).forEach((button) => {
            mailActionButtons.push(MenuButton.renderTemplate(button));
        });

        const folderActionButtons: object[] = [];
        Object.values(config.buttons.contextMenuButtons.folderActions).forEach((button) => {
            folderActionButtons.push(MenuButton.renderTemplate(button));
        });


        console.log(reducerFolder.getAdvancedMenu());
        if (reducerFolder.getAdvancedMenu().length === 0) {
            folderActionButtons.pop();
        }

        this.parent.insertAdjacentHTML('afterbegin', template({
            mailActionButtons: mailActionButtons,
            folderActionButtons: folderActionButtons,
        }));

        // this.state.element = this.parent.getElementsByClassName('context-menu')[0];
        this.state.area = this.parent.getElementsByClassName('context-menu__area')[0];
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
