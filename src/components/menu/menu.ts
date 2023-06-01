import {MenuButton} from '@uikits/menu-button/menu-button';
import template from '@components/menu/menu.hbs';
import {Component} from '@components/component';
import {reducerLetters} from '@stores/LettersStore';
import '@components/menu/menu.scss';
import {dispatcher} from '@utils/dispatcher';
import {actionCtxMail, actionGetLetters} from '@actions/letters';
import {config} from '@config/config';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';
import {actionCreateNewMail} from '@actions/newMail';
import {actionCreateFolder, actionCtxFolder} from '@actions/folders';
import {microEvents} from "@utils/microevents";
import {reducerFolder} from "@stores/FolderStore";
import {ContextDraft} from "@components/context-draft/context-draft";
import {ContextMenu} from "@components/context-menu/context-menu";

// import {actionRedirect} from "@actions/user";

export interface Menu {
    state: {
        element: Element,
        menuButtons: Element[],
        newMailButton: Element,
        newFolderButton: Element,
        activeButton: Element,
    },
}

/**
 * class implementing component LetterList
 */
export class Menu extends Component {
    /**
     * Constructor that creates a component class menuButton
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            menuButtons: [],
            newMailButton: document.createElement('div'),
            newFolderButton: document.createElement('div'),
            activeButton: document.createElement('div'),
        };
        this.rerender = this.rerender.bind(this);
    }

    /**
     * function that dispatches action to render New Mail Area
     * it happens when user clicks to menu buttons
     * @param e - event
     */
    menuButtonClicked = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        // e.target = currentTarget;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                const data = currentTarget.dataset.section;
                e.stopPropagation();
                currentTarget.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
                dispatcher.dispatch(actionGetLetters(data));
                this.state.activeButton.classList.remove('menu-button_color-active');
                this.state.activeButton = currentTarget;
                this.state.activeButton.classList.add('menu-button_color-active');

                document.getElementById('navbar__back-right-mail')!.click();
            }
        }
    };

    showMenuContext = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        const me = e as MouseEvent;
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                await dispatcher.dispatch(actionCtxFolder(currentTarget.dataset.section));
                const ctxMenu = new ContextMenu({parent: document.getElementById('root')!});
                ctxMenu.render(me.clientX, me.clientY);
                e.stopPropagation();
            }
        }
    };

    /**
     * function that dispatches action to render New Mail Area
     * @param e - event
     */
    newMailButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(actionCreateNewMail());
            }
        }
    };


    /**
     * function that dispatches action to render New Mail Area
     * @param e - event
     */
    newFolderButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(actionCreateFolder());
            }
        }
    };

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        const commonMenuButtons: object[] = [];
        const advancedMenuButtons: object[] = [];

        reducerFolder._storage.get(reducerFolder._storeNames.commonMenu).forEach((menuButton: Folder) => {
            commonMenuButtons.push(MenuButton.renderTemplate(menuButton));
        });

        reducerFolder._storage.get(reducerFolder._storeNames.menu).forEach((menuButton: object) => {
            advancedMenuButtons.push(MenuButton.renderTemplate(menuButton));
        });

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                newMailButton: ContrastButton.renderTemplate(
                    {href: '/new-mail', text: 'Новое письмо'}),
                commonMenuButtons: commonMenuButtons,
                newFolderButton: ContrastButton.renderTemplate(
                    {href: '/new-folder', text: 'Новая папка'}),
                advancedMenuButtons: advancedMenuButtons,
            },
        ));

        this.state.element = this.parent.getElementsByClassName('menu')[0];
        this.state.menuButtons = [...this.state.element.getElementsByClassName('menu-button')];
        this.state.newMailButton = [...this.state.element.getElementsByClassName('contrast-button')]
            .find((element) => {
                return (element as HTMLElement).dataset.section === '/new-mail';
            })!;

        this.state.newFolderButton = [...this.state.element.getElementsByClassName('contrast-button')]
            .find((element) => {
                return (element as HTMLElement).dataset.section === '/new-folder';
            })!;

        const activeButton = this.state.menuButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                reducerLetters._storage.get(reducerLetters._storeNames.currentLetters);
        });
        if (activeButton !== undefined) {
            this.state.activeButton = activeButton;
            this.state.activeButton.classList.add('menu-button_color-active');
        }
        this.registerEventListener();

        if (document.getElementsByClassName('letterList__hide')[0]) {
            document.getElementsByClassName('menu')[0].classList.add('menu__show');
        }
    }

    /**
     * method letterList page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }

    /**
     * method registerEventListener
     * register listeners for each menu button in menu
     */
    registerEventListener() {
        this.state.menuButtons.forEach((child: Element) => {
            child.addEventListener('click', this.menuButtonClicked);
        });
        this.state.newMailButton.addEventListener('click', this.newMailButtonClicked);
        this.state.newFolderButton.addEventListener('click', this.newFolderButtonClicked);

        [...document.getElementById('advanced-menu-buttons')!.children].forEach((child) => {
            if (child.classList.contains('menu-button')) {
                child.addEventListener('contextmenu', this.showMenuContext);
            }
        });
        microEvents.bind('menuChanged', this.rerender);
    }

    /**
     * method unregisterEventListener
     * unregister listeners for each menu button in menu
     */
    unregisterEventListener() {
        this.state.menuButtons.forEach((child: Element) => {
            child.removeEventListener('click', this.menuButtonClicked);
        });
        this.state.newMailButton.removeEventListener('click', this.newMailButtonClicked);
        this.state.newFolderButton.removeEventListener('click', this.newFolderButtonClicked);

        [...document.getElementById('advanced-menu-buttons')!.children].forEach((child) => {
            if (child.classList.contains('menu-button')) {
                child.removeEventListener('contextmenu', this.showMenuContext);
            }
        });

        microEvents.unbind('menuChanged', this.rerender);
    }

    rerender() {
        this.purge();
        this.render();
        // if (!document.getElementsByClassName('letterList__hide')[0]) {
        //     document.getElementsByClassName('menu')[0].classList.add('menu__show');
        // }
    }
}
