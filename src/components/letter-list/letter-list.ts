import '../templates.js';
import {LetterFrame} from '@uikits/letter-frame/letter-frame';
import template from '@components/letter-list/letter-list.hbs'
import {Component} from "@components/component";
import {reducerLetters} from "@stores/LettersStore";
import {dispatcher} from "@utils/dispatcher";

export interface LetterList {
    state: {
        element: Element,
        children: Element[],
    },
}

/**
 * class implementing component LetterList
 */
export class LetterList extends Component {
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
        // dispatcher.dispatch()
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        let letterList: Object[] = [];

        reducerLetters._storage.get(reducerLetters._storeNames.letters).forEach((letter: Object) => {
            letterList.push(LetterFrame.renderTemplate(letter));
        })

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                letterFrames: letterList,
            }
        ));

        this.state.element = this.parent.getElementsByClassName('letterList')[0];
        this.state.children = [...this.state.element.getElementsByClassName('letter-frame')];
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
