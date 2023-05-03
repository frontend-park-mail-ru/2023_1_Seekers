import {Component} from '@components/component';

import template from '@components/advanced-context-menu/advanced-context-menu.hbs';
import '@components/advanced-context-menu/advanced-context-menu.scss';

import {config, responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';
import {reducerFolder} from '@stores/FolderStore';
import {MenuButton} from '@uikits/menu-button/menu-button';
import {dispatcher} from '@utils/dispatcher';
import {actionTransmitToFolder} from '@actions/folders';
import {microEvents} from '@utils/microevents';


export interface AdvancedContextMenu {
    state: {
        element: Element,
        area: Element,
        buttons: Element[],
    },
}

/**
 * class implementing component send-mail
 */
export class AdvancedContextMenu extends Component {
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
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
            default:
                dispatcher.dispatch(actionTransmitToFolder(currentTarget.dataset.section.split('/')[1]));
                document.getElementsByClassName('context-letter')[0]!.classList.remove('context-letter__hide');
            }
        }
    };

    /**
     * function that triggers when the answer got from the backend
     */
    getResponse = () => {
        const answerStatus = reducerFolder._storage.get(reducerFolder._storeNames.answerStatus);
        const answerBody = reducerFolder._storage.get(reducerFolder._storeNames.answerBody);
        console.log('123123123123123123')
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
            this.purge();
            return;
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

        const advancedMenuButtons: object[] = [];

        reducerFolder._storage.get(reducerFolder._storeNames.menu).forEach((menuButton: Folder) => {
            if (!menuButton.folder_slug.includes('to_')){
                menuButton.folder_slug = '/to_' + menuButton.folder_slug.split('/')[1];
            }
            advancedMenuButtons.push(MenuButton.renderTemplate(menuButton));
        });

        [...document.getElementsByClassName('advanced-context-menu')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('menu-button')) {
                    child.removeEventListener('click', this.buttonsClicked);
                }
            });
            document.removeEventListener('click', this.onSidebarClick);
            document.removeEventListener('contextmenu', this.onSidebarClick);
            ctxMenu.remove();
        });

        this.parent.insertAdjacentHTML('afterbegin', template({
            folderActionButtons: advancedMenuButtons,
        }));

        // this.state.element = this.parent.getElementsByClassName('context-menu')[0];
        this.state.area = this.parent.getElementsByClassName('advanced-context-menu')[0];
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

        if (y < 0) {
            y = 30;
        }

        if((windowHeight < y)) {
            y = windowHeight;
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
