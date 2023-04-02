import {LetterFrame} from '@uikits/letter-frame/letter-frame';
import template from '@components/letter-list/letter-list.hbs'
import {Component} from "@components/component";
import {reducerLetters} from "@stores/LettersStore";
import '@components/letter-list/letter-list.scss';
import {dispatcher} from "@utils/dispatcher";
import {microEvents} from "@utils/microevents";
import {
    actionChangeLetterStateToRead,
    actionChangeLetterStateToUnread,
    actionGetLetters,
    actionGetMail
} from "@actions/letters";
import {actionChangeURL} from "@actions/user";

export interface LetterList {
    state: {
        element: Element,
        letters: {
            letterElement: Element,
            stateElement: Element,
        }[],
        activeLetter: Element,
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
            letters: [],
            activeLetter: document.createElement('div'),
        }

        this.rerender = this.rerender.bind(this);

        microEvents.bind('letterListChanged', this.rerender);
    }

    selectLetter = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                const path = reducerLetters._storage.get(reducerLetters._storeNames.currentLetters);

                await dispatcher.dispatch(actionGetMail(currentTarget.dataset.section));
                await dispatcher.dispatch(actionChangeURL({path: path, props: '/' + currentTarget.dataset.section}));

                this.state.activeLetter.classList.remove('letter-frame_color-active');
                this.state.activeLetter = currentTarget;
                this.state.activeLetter.classList.add('letter-frame_color-active');

                const letterState = currentTarget.getElementsByClassName('letter-read-state-frame')[0] as HTMLElement;

                if(letterState.classList.contains('letter-is-unread')){
                    dispatcher.dispatch(actionChangeLetterStateToRead(letterState.dataset.section!));
                    letterState.classList.remove('letter-is-unread');
                    letterState.classList.add('letter-is-read');
                }
            }
        }
    }

    changeState = async (e: Event) => {
        console.log('changing state...');
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                if (currentTarget.classList.contains('letter-is-unread')) {
                    dispatcher.dispatch(actionChangeLetterStateToRead(currentTarget.dataset.section));
                    currentTarget.classList.remove('letter-is-unread');
                    currentTarget.classList.add('letter-is-read');
                } else if (currentTarget.classList.contains('letter-is-read')) {
                    dispatcher.dispatch(actionChangeLetterStateToUnread(currentTarget.dataset.section));
                    currentTarget.classList.remove('letter-is-read');
                    currentTarget.classList.add('letter-is-unread');
                }
            }
        }
        e.stopPropagation();
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        console.log('render letterList');
        let letterList: Object[] = [];
        const letterObjs = reducerLetters._storage
            .get(reducerLetters._storeNames.letters)
            .get(reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));

        if (letterObjs) {
            letterObjs.forEach((letter: any) => {
                console.log(letter);
                // letter.seen = true;
                letterList.push(LetterFrame.renderTemplate(letter));
            })
        }

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                letterFrames: letterList,
            }
        ));

        this.state.element = this.parent.getElementsByClassName('letterList')[0];
        [...this.state.element.getElementsByClassName('letter-frame')].forEach(letterFrame => {
            this.state.letters.push({letterElement: letterFrame, stateElement: letterFrame.getElementsByClassName('letter-read-state-frame')[0]});
        });

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
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.selectLetter);
            letter.stateElement.addEventListener('click', this.changeState);
        });
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.selectLetter);
            letter.stateElement.removeEventListener('click', this.changeState);
        });
    }
}
