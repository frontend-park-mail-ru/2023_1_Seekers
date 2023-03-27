import {LetterFrame} from '@uikits/letter-frame/letter-frame';
import template from '@components/letter-list/letter-list.hbs'
import {Component} from "@components/component";
import {reducerLetters} from "@stores/LettersStore";
import '@components/letter-list/letter-list.scss';
import {dispatcher} from "@utils/dispatcher";
import {microEvents} from "@utils/microevents";
import {actionGetLetters, actionGetMail} from "@actions/letters";

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

        this.rerender = this.rerender.bind(this);

        microEvents.bind('letterListChanged', this.rerender);
    }

    localEventCatcher = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section){
                dispatcher.dispatch(actionGetMail(currentTarget.dataset.section));
            }
        }
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        console.log('render letterList');
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

    rerender() {
        this.purge();
        this.render();
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
