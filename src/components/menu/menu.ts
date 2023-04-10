import {MenuButton} from '@uikits/menu-button/menu-button';
import template from '@components/menu/menu.hbs';
import {Component} from '@components/component';
import {reducerLetters} from '@stores/LettersStore';
import '@components/menu/menu.scss';
import {dispatcher} from '@utils/dispatcher';
import {actionGetLetters} from '@actions/letters';
import {config} from '@config/config';
import {NewMailButton} from '@uikits/new-mail-button/new-mail-button';
import {actionCreateNewMail} from '@actions/newMail';

// import {actionRedirect} from "@actions/user";

export interface Menu {
    state: {
        element: Element,
        menuButtons: Element[],
        newMailButton: Element,
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
            activeButton: document.createElement('div'),
        };
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
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        const commonMenuButtons: object[] = [];
        // const advancedMenuButtons: object[] = [];

        Object.values(config.buttons.commonMenuButtons).forEach((menuButton) => {
            commonMenuButtons.push(MenuButton.renderTemplate(menuButton));
        });

        // reducerLetters._storage.get(reducerLetters._storeNames.menu).forEach((menuButton: object) => {
        //     advancedMenuButtons.push(MenuButton.renderTemplate(menuButton));
        // });

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                newMailButton: NewMailButton.renderTemplate({href: '/new-mail', text: 'Новое письмо'}),
                commonMenuButtons: commonMenuButtons,
                // advancedMenuButtons: advancedMenuButtons,
            },
        ));

        this.state.element = this.parent.getElementsByClassName('menu')[0];
        this.state.menuButtons = [...this.state.element.getElementsByClassName('menu-button')];
        this.state.newMailButton = this.state.element.getElementsByClassName('new-mail-button')[0];

        const activeButton = this.state.menuButtons.find((button) => {
            return (button as HTMLElement).dataset.section ===
                    reducerLetters._storage.get(reducerLetters._storeNames.currentLetters);
        },
        );
        if (activeButton !== undefined) {
            this.state.activeButton = activeButton;
            this.state.activeButton.classList.add('menu-button_color-active');
        }

        this.registerEventListener();
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
    }

    /**
     * method unregisterEventListener
     * unregister listeners for each menu button in menu
     */
    unregisterEventListener() {
        this.state.menuButtons.forEach((child: Element) => {
            child.removeEventListener('click', this.menuButtonClicked);
        });
    }
}
