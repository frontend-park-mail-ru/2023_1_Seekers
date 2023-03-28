import {MenuButton} from '@uikits/menu-button/menu-button';
import template from '@components/menu/menu.hbs'
import {Component} from "@components/component";
import {reducerLetters} from "@stores/LettersStore";
import '@components/menu/menu.scss';
import {dispatcher} from "@utils/dispatcher";
import {actionGetLetters} from "@actions/letters";
import {config} from "@config/config";

export interface Menu {
    state: {
        element: Element,
        children: Element[],
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
            children: [],
        }
    }

    localEventCatcher = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section){
                dispatcher.dispatch(actionGetLetters(currentTarget.dataset.section));
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
                commonMenuButtons: commonMenuButtons,
                advancedMenuButtons: advancedMenuButtons,
            }
        ));

        this.state.element = this.parent.getElementsByClassName('menu')[0];
        this.state.children = [...this.state.element.getElementsByClassName('menu-button')];
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
        this.state.children.forEach((child: Element) => {
            child.addEventListener('click', this.localEventCatcher);
        })
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        this.state.children.forEach((child: Element) => {
            child.removeEventListener('click', this.localEventCatcher);
        })
    }
}
