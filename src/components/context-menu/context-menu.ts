import {Component} from '@components/component';

import template from '@components/context-menu/context-menu.hbs';
import '@components/context-menu/context-menu.scss';

import {config, responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';
import {MenuButton} from '@uikits/menu-button/menu-button';
import {microEvents} from '@utils/microevents';
import {dispatcher} from "@utils/dispatcher";
import {
    actionCreateFolder,
    actionDeleteFolderByCtx,
    actionRenameFolderByCtx,
    actionRenameFolderForm
} from "@actions/folders";
import {Acceptor} from "@components/acceptor/acceptor";
import {actionSendDraft} from "@actions/newMail";


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

    cancelDelete = () => {
        microEvents.unbind('/cancel', this.cancelDelete);
        microEvents.unbind('/delete', this.delete);
        // this.purge();
    };

    delete = () => {
        microEvents.unbind('/cancel', this.cancelDelete);
        microEvents.unbind('/delete', this.delete);
        // this.purge();
        dispatcher.dispatch(actionDeleteFolderByCtx());
        return;
    };

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
            case config.buttons.contextMenuButtons.delete.folder_slug:
                microEvents.bind('/cancel', this.cancelDelete);
                microEvents.bind('/delete', this.delete);
                const acceptor = new Acceptor({parent: document.getElementById('root')!});
                acceptor.render('Вы действительно хотите удалить папку?', config.buttons.acceptorDeleteFolderButtons);
                this.purge();
                break;

            case config.buttons.contextMenuButtons.rename.folder_slug:
                dispatcher.dispatch(actionRenameFolderForm());
                break;
            }
        }
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getDeleteResponse = () => {
        showNotification('Папка удалена.');
        this.purge();
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
        microEvents.bind('folderDeleted', this.getDeleteResponse);
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
        microEvents.unbind('folderDeleted', this.getDeleteResponse);
    };


    /**
     * method insert sidebar to HTML
     */
    render(x: number, y: number) {
        [...document.getElementsByClassName('mailbox__context')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('menu-button')) {
                    child.removeEventListener('click', this.buttonsClicked);
                }
            });
            document.removeEventListener('click', this.onSidebarClick);
            document.removeEventListener('contextmenu', this.onSidebarClick);
            ctxMenu.remove();
        });

        const menuActionButtons: object[] = [];
        Object.values(config.buttons.contextMenuButtons).forEach((button) => {
            menuActionButtons.push(MenuButton.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template({
            menuActionButtons: menuActionButtons,
        }));

        // this.state.element = this.parent.getElementsByClassName('context-menu')[0];
        this.state.area = this.parent.getElementsByClassName('context-menu')[0];
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
