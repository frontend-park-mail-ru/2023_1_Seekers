import {LetterFrame} from '@uikits/letter-frame/letter-frame';
import template from '@components/letter-list/letter-list.hbs';
import {Component} from '@components/component';
import {reducerLetters} from '@stores/LettersStore';
import '@components/letter-list/letter-list.scss';
import {dispatcher} from '@utils/dispatcher';
import {microEvents} from '@utils/microevents';
import {
    actionAddSelectedLetter,
    actionChangeLetterStateToRead,
    actionChangeLetterStateToUnread, actionCtxMail, actionDeleteMail, actionDeleteSelectedLetter,
    actionShowMail,
} from '@actions/letters';
import {LetterFrameLoader} from '@uikits/letter-frame-loader/letter-frame-loader';
import {ContextLetter} from '@components/context-letter/context-letter';
import {LetterListHeader} from '@uikits/letter-list-header/letter-list-header';
import {config} from '@config/config';
import {actionCreateNewMail, actionSelectDraft} from '@actions/newMail';
import {ContextDraft} from '@components/context-draft/context-draft';

// import {actionChangeURL} from "@actions/user";


export interface LetterList {
    state: {
        element: Element,
        letters: {
            letterElement: Element,
            stateElement: Element,
            checkbox_area: Element,
        }[],
        activeLetter: Element | undefined,
        currentLetters: string;
        chooseAllButton: Element;
        filterButton: Element;
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
            currentLetters: '',
            chooseAllButton: document.createElement('div'),
            filterButton: document.createElement('div'),
        };

        this.rerender = this.rerender.bind(this);
    }

    showLetterContext = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        const me = e as MouseEvent;
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                await dispatcher.dispatch(actionCtxMail(currentTarget.dataset.section));
                const ctxMenu = new ContextLetter({parent: document.getElementById('root')!});
                ctxMenu.render(me.clientX, me.clientY);
                e.stopPropagation();
            }
        }
    };

    showDraftContext = async (e: Event) => {
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
                const ctxMenu = new ContextDraft({parent: document.getElementById('root')!});
                ctxMenu.render(me.clientX, me.clientY);
                e.stopPropagation();
            }
        }
    };

    chooseLetter = async (e: Event) => {
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

                document.getElementsByClassName('letterList')[0].classList.add('letterList__hide');
                document.getElementsByClassName('mail')[0].classList.add('mail__show');

                document.getElementById('navbar__menu-button')!.classList.add('navbar__menu-button__hide');
                document.getElementById('navbar__send-mail')!.classList.add('navbar__send-mail__hide');
            }
        }
    };

    chooseDraft = async (e: Event) => {
        if (!e.isTrusted) {
            return;
        }
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                await dispatcher.dispatch(actionSelectDraft(currentTarget.dataset.section));
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

    selectLetter = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            const checkbox = currentTarget.getElementsByClassName(
                'letter-frame__checkbox')[0]! as HTMLInputElement;
            const letterFrame = (checkbox as Element).closest('.letter-frame')!;
            const letterId = parseInt((letterFrame as HTMLElement).dataset.section!.split('/').pop()!);
            if (checkbox.checked) {
                dispatcher.dispatch(actionDeleteSelectedLetter(letterId));
                letterFrame.classList.remove('letter-frame_selected');
                checkbox.checked = false;
            } else {
                dispatcher.dispatch(actionAddSelectedLetter(letterId));
                letterFrame.classList.add('letter-frame_selected');
                checkbox.checked = true;
            }
        }

        e.stopPropagation();
    };

    selectAll = async (e: Event) => {
        e.preventDefault();
        this.state.letters.forEach((letter) => {
            const currentTarget = letter.checkbox_area;

            const checkbox = currentTarget.getElementsByClassName(
                'letter-frame__checkbox')[0]! as HTMLInputElement;
            const letterFrame = (checkbox as Element).closest('.letter-frame')!;
            const letterId = parseInt((letterFrame as HTMLElement).dataset.section!.split('/').pop()!);
            if (!checkbox.checked) {
                dispatcher.dispatch(actionAddSelectedLetter(letterId));
                letterFrame.classList.add('letter-frame_selected');
                checkbox.checked = true;
            }
        });
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
        const letterObjs = reducerLetters.getCurrentLettersArray();
        this.state.currentLetters =
            reducerLetters._storage.get(reducerLetters._storeNames.currentLetters);

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
        const letterObjs = reducerLetters.getCurrentLettersArray();


        if (letterObjs) {
            letterObjs.forEach((letter: any) => {
                letterList.push(LetterFrame.renderTemplate(letter));
            });
        }

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                letterListHeader: LetterListHeader.renderTemplate(config.buttons.letterListHeader),
                currentLetters: this.state.currentLetters,
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
                    checkbox_area: letterFrame.getElementsByClassName('letter-frame__checkbox_area')[0],
                });
        });
        this.state.chooseAllButton = this.state.element
            .getElementsByClassName('letter-list-header__b-area__select')[0]!;

        console.log(this.state.chooseAllButton);

        this.state.filterButton = this.state.element
            .getElementsByClassName('letter-list-header__b-area__sort')[0]!;
        this.changeLetterToActive();

        this.registerEventListener();
    }

    /**
     * A method that draws a loader into a parent HTML element
     */
    renderLoader() {
        const loaderList = [];

        for (let i = 0; i < 10; i++) {
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
        switch (this.state.currentLetters) {
        case config.buttons.commonMenuButtons.drafts.folder_slug:
            this.registerDraftListeners();
            break;
        default:
            this.registerDefaultListeners();
            break;
        }
    }

    registerDefaultListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.chooseLetter);
            letter.letterElement.addEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.addEventListener('click', this.changeState);
            letter.checkbox_area.addEventListener('click', this.selectLetter);
        });

        this.state.chooseAllButton.addEventListener('click', this.selectAll);

        microEvents.bind('letterListChanged', this.rerender);
        // microEvents.bind('mailChanged', this.changeLetterToActive);
    }

    registerDraftListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.chooseDraft);
            letter.letterElement.addEventListener('contextmenu', this.showDraftContext);
            letter.stateElement.addEventListener('click', this.changeState);
            letter.checkbox_area.addEventListener('click', this.selectLetter);
        });

        this.state.chooseAllButton.addEventListener('click', this.selectAll);

        microEvents.bind('letterListChanged', this.rerender);
        // microEvents.bind('mailChanged', this.changeLetterToActive);
    }

    /**
     * method unregister
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        this.unregisterDefaultListeners();
        this.unregisterDraftListeners();
    }

    unregisterDefaultListeners() {
        microEvents.unbind('letterListChanged', this.rerender);
        microEvents.unbind('mailChanged', this.changeLetterToActive);

        this.state.chooseAllButton.removeEventListener('click', this.selectAll);

        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.chooseLetter);
            letter.letterElement.removeEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.removeEventListener('click', this.changeState);
            letter.checkbox_area.removeEventListener('click', this.selectLetter);
        });
    }

    unregisterDraftListeners() {
        microEvents.unbind('letterListChanged', this.rerender);
        microEvents.unbind('mailChanged', this.changeLetterToActive);

        this.state.chooseAllButton.removeEventListener('click', this.chooseAll);

        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.chooseDraft);
            letter.letterElement.removeEventListener('contextmenu', this.showDraftContext);
            letter.stateElement.removeEventListener('click', this.changeState);
            letter.checkbox_area.removeEventListener('click', this.selectLetter);
        });
    }
}
