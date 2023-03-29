import {MenuButton} from '@uikits/menu-button/menu-button';
import template from '@components/menu/menu.hbs'
import {Component} from "@components/component";
import {reducerLetters} from "@stores/LettersStore";
import '@components/menu/menu.scss';
import {dispatcher} from "@utils/dispatcher";
import {actionGetLetters} from "@actions/letters";
import {config} from "@config/config";
import {NewMailButton} from "@uikits/new-mail-button/new-mail-button";
import {SendMail} from "@components/send-mail/send-mail";

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
     * @param {componentContext} context HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            menuButtons: [],
            newMailButton: document.createElement('div'),
            activeButton: document.createElement('div'),
        }
    }

    menuButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section){
                dispatcher.dispatch(actionGetLetters(currentTarget.dataset.section)).then(() => {
                    this.state.activeButton.classList.remove('menu__button_active');
                    this.state.activeButton = currentTarget;
                    this.state.activeButton.classList.add('menu__button_active');
                    }
                );
            }
        }
    }

    newMailButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section) {
                const sendMAil = new SendMail({parent: document.getElementById('root')!})
                sendMAil.render();
            }
        }
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        const commonMenuButtons: Object[] = [];
        const advancedMenuButtons: Object[] = [];

        config.buttons.commonMenuButtons.forEach((menuButton) => {
            commonMenuButtons.push(MenuButton.renderTemplate(menuButton));
        })

        reducerLetters._storage.get(reducerLetters._storeNames.menu).forEach((menuButton: Object) => {
            advancedMenuButtons.push(MenuButton.renderTemplate(menuButton));
        })

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                newMailButton: NewMailButton.renderTemplate({href: '/new-mail', text: 'Новое письмо'}),
                commonMenuButtons: commonMenuButtons,
                advancedMenuButtons: advancedMenuButtons,
            }
        ));

        this.state.element = this.parent.getElementsByClassName('menu')[0];
        this.state.menuButtons = [...this.state.element.getElementsByClassName('menu-button')];
        this.state.newMailButton = this.state.element.getElementsByClassName('new-mail-button')[0];

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
     * method register NOT IMPLEMENTED
     * will register listeners for each letter-frame in letter-list
     */
    registerEventListener() {
        this.state.menuButtons.forEach((child: Element) => {
            child.addEventListener('click', this.menuButtonClicked);
        });
        this.state.newMailButton.addEventListener('click', this.newMailButtonClicked);
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        this.state.menuButtons.forEach((child: Element) => {
            child.removeEventListener('click', this.menuButtonClicked);
        })
    }
}
