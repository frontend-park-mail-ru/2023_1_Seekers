import {LetterFrame} from '@uikits/letter-frame/letter-frame';
import template from '@components/letter-list/letter-list.hbs';
import {Component} from '@components/component';
import {reducerLetters} from '@stores/LettersStore';
import '@components/letter-list/letter-list.scss';
import {dispatcher} from '@utils/dispatcher';
import {microEvents} from '@utils/microevents';
import {
    actionChangeLetterStateToRead,
    actionChangeLetterStateToUnread, actionCtxMail,
    actionShowMail,
} from '@actions/letters';
import {LetterFrameLoader} from '@uikits/letter-frame-loader/letter-frame-loader';
import {ContextMenu} from '@components/context-menu/context-menu';
import {LetterListHeader} from "@uikits/letter-list-header/letter-list-header";
import {config} from "@config/config";

// import {actionChangeURL} from "@actions/user";


export interface LetterList {
    state: {
        element: Element,
        letters: {
            letterElement: Element,
            stateElement: Element,
        }[],
        activeLetter: Element | undefined,
    },
}

/**
 * class implementing component LetterList
 */
export class LetterList extends Component {
    /**
     * Constructor that creates a component class menuButton
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            letters: [],
            activeLetter: document.createElement('div'),
        };

        this.rerender = this.rerender.bind(this);
    }

    showLetterContext = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        const me = e as MouseEvent;
        console.log(me.clientX, me.clientY);
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                await dispatcher.dispatch(actionCtxMail(currentTarget.dataset.section));
                const ctxMenu = new ContextMenu({parent: document.getElementById('root')!});
                ctxMenu.render(me.clientX, me.clientY);
                e.stopPropagation();
                // currentTarget.dispatchEvent(new MouseEvent('contextmenu', {bubbles: true, cancelable: true}));
            }
        }
    };

    selectLetter = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                await dispatcher.dispatch(actionShowMail(currentTarget.dataset.section));
                e.stopPropagation();
                currentTarget.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));

                const letterState = currentTarget.getElementsByClassName(
                    'letter-frame__read-state')[0] as HTMLElement;

                if (letterState.classList.contains('letter-is-unread')) {
                    dispatcher.dispatch(actionChangeLetterStateToRead(letterState.dataset.section!));
                    letterState.classList.remove('letter-is-unread');
                    letterState.classList.add('letter-is-read');
                }
                this.state.activeLetter?.classList.remove('letter-frame_color-active');
                this.state.activeLetter = currentTarget;
                this.state.activeLetter?.classList.add('letter-frame_color-active');
            }
        }
    };

    changeState = async (e: Event) => {
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
    };

    changeLetterToActive = () => {
        const mail = reducerLetters.getCurrentMail();
        if (mail) {
            this.state.activeLetter?.classList.remove('letter-frame_color-active');
            this.state.activeLetter = this.state.letters.find((letter) => {
                return letter.letterElement.id === 'letter-frame-id-' + mail.message_id;
            })?.letterElement;
            this.state.activeLetter?.classList.add('letter-frame_color-active');
        }
    };

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     */
    render() {
        const letterObjs = reducerLetters._storage
            .get(reducerLetters._storeNames.letters)
            .get(reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));

        if (letterObjs) {
            this.renderLetterFrames();
        } else {
            this.renderLoader();
        }
    }

    /**
     * A method that draws a letter list into a parent HTML element
     * according to a given template and context
     */
    renderLetterFrames() {
        const letterList: object[] = [];
        const letterObjs = reducerLetters._storage
            .get(reducerLetters._storeNames.letters)
            .get(reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));


        if (letterObjs) {
            letterObjs.forEach((letter: any) => {
                letterList.push(LetterFrame.renderTemplate(letter));
            });
        }

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                letterListHeader: LetterListHeader.renderTemplate(config.buttons.letterListHeader),
                currentLetters: reducerLetters._storage.get(reducerLetters._storeNames.currentLetters),
                letterFrames: letterList,
            },
        ));
        this.state.letters = [];
        this.state.element = this.parent.getElementsByClassName('letterList')[0];
        [...this.state.element.getElementsByClassName('letter-frame')].forEach((letterFrame) => {
            this.state.letters.push(
                {
                    letterElement: letterFrame,
                    stateElement: letterFrame.getElementsByClassName('letter-frame__read-state')[0],
                });
        });

        this.changeLetterToActive();

        this.registerEventListener();
    }

    /**
     * A method that draws a loader into a parent HTML element
     */
    renderLoader() {
        const loaderList = [];

        for (let i = 0; i < 10; i++) { // выведет 0, затем 1, затем 2
            loaderList.push(LetterFrameLoader.renderTemplate({}));
        }

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                letterFrames: loaderList,
            },
        ));

        this.state.element = this.parent.getElementsByClassName('letterList')[0];
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
     * method letterList page rerender
     */
    rerender() {
        this.purge();
        this.render();
    }

    /**
     * method register
     * will register listeners for each letter-frame in letter-list
     */
    registerEventListener() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.selectLetter);
            letter.letterElement.addEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.addEventListener('click', this.changeState);
        });
        microEvents.bind('letterListChanged', this.rerender);
        microEvents.bind('mailChanged', this.changeLetterToActive);
    }

    /**
     * method unregister
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        microEvents.unbind('letterListChanged', this.rerender);
        microEvents.unbind('mailChanged', this.changeLetterToActive);
        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.selectLetter);
            letter.letterElement.removeEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.removeEventListener('click', this.changeState);
        });
    }
}
