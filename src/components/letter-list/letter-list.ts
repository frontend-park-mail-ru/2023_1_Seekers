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
    actionChangeLetterStateToUnread, actionCtxMail, actionDeleteSelectedLetter, actionSearch,
    actionShowMail,
} from '@actions/letters';
import {LetterFrameLoader} from '@uikits/letter-frame-loader/letter-frame-loader';
import {ContextLetter} from '@components/context-letter/context-letter';
import {LetterListHeader} from '@uikits/letter-list-header/letter-list-header';
import {config} from '@config/config';
import {actionSelectDraft} from '@actions/newMail';
import {ContextDraft} from '@components/context-draft/context-draft';
import {Filter} from "@components/filter/filter";

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
        unchooseAllButton: Element;
        filterButton: Element;

        selectedLettersCount: number;
        search: HTMLInputElement;
        searchString: string;
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
            unchooseAllButton: document.createElement('div'),
            filterButton: document.createElement('div'),
            selectedLettersCount: 0,
            search: document.createElement('input') as HTMLInputElement,
            searchString: '',
        };

        this.rerender = this.rerender.bind(this);
        this.renderNotFound = this.renderNotFound.bind(this);
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

    getMessageInputs() {
        return {
            recipients: {}, // если будет поиск по пользователям - нужно сделать
            text: this.state.search.value,
        } as SearchMessage;
    }

    searchDone = () => {
        this.purge();
        this.renderLetterFrames(reducerLetters.getSearchedLetters());
        this.state.search.value = reducerLetters._storage.get(reducerLetters._storeNames.searchString);
    };

    onIconSearch = async (e: Event) => {
        e.preventDefault();
        const message = this.getMessageInputs();
        // this.state.searchString = message.text;
        await dispatcher.dispatch(actionSearch(message));
    }

    onSearch = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const message = this.getMessageInputs();
            // this.state.searchString = message.text;
            await dispatcher.dispatch(actionSearch(message));
        }
    };

    appendNewLetter = () => {
        const letter = reducerLetters.getNewMail();
        if (letter) {
            const line = document.createElement('div');
            line.classList.add('horizontal-line');
            const letterList = this.state.element.getElementsByClassName('letterList__scrollable')[0]!;
            letterList.insertAdjacentHTML('afterbegin', LetterFrame.renderTemplate(letter));
            const letterFrame = document.getElementById(`letter-frame-id-${letter.message_id}`)!;
            this.state.letters.unshift(
                {
                    letterElement: letterFrame,
                    stateElement: letterFrame.getElementsByClassName('letter-frame__read-state')[0],
                    checkbox_area: letterFrame.getElementsByClassName('letter-frame__checkbox_area')[0],
                });
            letterFrame.parentNode!.insertBefore(line, letterFrame.nextSibling);
            // letterList.prepend(line);

            this.state.letters[0].letterElement.addEventListener('click', this.chooseLetter);
            this.state.letters[0].letterElement.addEventListener('contextmenu', this.showLetterContext);
            this.state.letters[0].stateElement.addEventListener('click', this.changeState);
            this.state.letters[0].checkbox_area.addEventListener('click', this.selectLetter);
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

                document.getElementById('navbar__back-left-mail')!.classList.add('navbar__back-left-mail__show');
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

        if (this.state.selectedLettersCount === this.state.letters.length) {
            this.state.chooseAllButton.classList.remove('element-hidden');
            this.state.unchooseAllButton.classList.add('element-hidden');
        }
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
                this.state.selectedLettersCount--;
            } else {
                dispatcher.dispatch(actionAddSelectedLetter(letterId));
                letterFrame.classList.add('letter-frame_selected');
                checkbox.checked = true;
                this.state.selectedLettersCount++;
            }
        }
        if (this.state.selectedLettersCount === this.state.letters.length) {
            this.state.chooseAllButton.classList.add('element-hidden');
            this.state.unchooseAllButton.classList.remove('element-hidden');
        }


        e.stopPropagation();
    };

    selectAll = async (e: Event) => {
        e.preventDefault();
        if (this.state.selectedLettersCount === this.state.letters.length) {
            return;
        }
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
                this.state.selectedLettersCount++;
            }
        });
        this.state.chooseAllButton.classList.add('element-hidden');
        this.state.unchooseAllButton.classList.remove('element-hidden');
    };

    unselectAll = async (e: Event) => {
        e.preventDefault();
        if (this.state.selectedLettersCount === 0) {
            return;
        }
        this.state.letters.forEach((letter) => {
            const currentTarget = letter.checkbox_area;

            const checkbox = currentTarget.getElementsByClassName(
                'letter-frame__checkbox')[0]! as HTMLInputElement;
            const letterFrame = (checkbox as Element).closest('.letter-frame')!;
            const letterId = parseInt((letterFrame as HTMLElement).dataset.section!.split('/').pop()!);
            if (checkbox.checked) {
                dispatcher.dispatch(actionDeleteSelectedLetter(letterId));
                letterFrame.classList.remove('letter-frame_selected');
                checkbox.checked = false;
                this.state.selectedLettersCount--;
            }
        });

        this.state.chooseAllButton.classList.remove('element-hidden');
        this.state.unchooseAllButton.classList.add('element-hidden');
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

            document.getElementsByClassName('letterList')[0].classList.add('letterList__hide');
            document.getElementsByClassName('mail')[0]?.classList.add('mail__show');

            document.getElementById('navbar__menu-button')!.classList.add('navbar__menu-button__hide');
            document.getElementById('navbar__send-mail')!.classList.add('navbar__send-mail__hide');

            document.getElementById('navbar__back-left-mail')!.classList.add('navbar__back-left-mail__show');
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
            this.renderLetterFrames(letterObjs);
        } else {
            this.renderLoader();
        }
    }

    /**
     * A method that draws a letter list into a parent HTML element
     * according to a given template and context
     */
    renderLetterFrames(letterObjs: LetterFrameData[]) {
        const letterList: object[] = [];

        if (letterObjs) {
            letterObjs.forEach((letter) => {
                if (reducerLetters.getCurrentLettersName() === '/outbox') {
                    letter.showRecipient = true;
                }
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

        this.state.unchooseAllButton = this.state.element
            .getElementsByClassName('letter-list-header__b-area__unselect')[0]!;

        this.state.unchooseAllButton?.classList.add('element-hidden');

        this.state.filterButton = this.state.element
            .getElementsByClassName('letter-list-header__b-area__sort')[0]!;
        this.state.search = document.getElementById('search')! as HTMLInputElement;
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

    renderNotFound() {
        this.purge();
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                notFound: true,
            },
        ));
        this.state.element = this.parent.getElementsByClassName('letterList')[0];
        this.state.letters = [];
        this.registerEventListener();
    }

    onFilterClick= (e: Event) => {
        e.preventDefault();
        if(document.getElementById('filter')) {
            this.filter.purge();
            this.filter = null;
            return
        }
        this.filter = new Filter({parent: document.getElementById('letterList__top__area')!});
        e.stopPropagation();
        this.filter.render();
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
        if (this.state.letters.length) {
            this.state.chooseAllButton.addEventListener('click', this.selectAll);
            this.state.unchooseAllButton.addEventListener('click', this.unselectAll);
        }

        microEvents.bind('searchDone', this.searchDone);
        microEvents.bind('letterListChanged', this.rerender);
        microEvents.bind('folderNotFound', this.renderNotFound);
        microEvents.bind('newMailReceived', this.appendNewLetter);

        this.state.search.addEventListener('keypress', this.onSearch);
        document.getElementsByClassName('search-form__icon')[0]!
            .addEventListener('click', this.onIconSearch);
        // microEvents.bind('mailChanged', this.changeLetterToActive);

        document.getElementById('letter-list-filter')?.addEventListener('click', this.onFilterClick);
    }

    registerDefaultListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.chooseLetter);
            letter.letterElement.addEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.addEventListener('click', this.changeState);
            letter.checkbox_area.addEventListener('click', this.selectLetter);
        });
    }

    registerDraftListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.addEventListener('click', this.chooseDraft);
            letter.letterElement.addEventListener('contextmenu', this.showDraftContext);
            letter.stateElement.addEventListener('click', this.changeState);
            letter.checkbox_area.addEventListener('click', this.selectLetter);
        });
    }

    /**
     * method unregister
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        microEvents.unbind('letterListChanged', this.rerender);
        microEvents.unbind('folderNotFound', this.renderNotFound);
        microEvents.unbind('searchDone', this.searchDone);
        microEvents.unbind('newMailReceived', this.appendNewLetter);
        // microEvents.unbind('mailChanged', this.changeLetterToActive);
        if (this.state.letters.length) {
            this.state.unchooseAllButton.removeEventListener('click', this.unselectAll);
            this.state.chooseAllButton.removeEventListener('click', this.selectAll);
        }

        switch (this.state.currentLetters) {
        case config.buttons.commonMenuButtons.drafts.folder_slug:
            this.unregisterDraftListeners();
            break;
        default:
            this.unregisterDefaultListeners();
            break;
        }
        this.state.search.removeEventListener('keypress', this.onSearch);
        document.getElementsByClassName('search-form__icon')[0]!
            .removeEventListener('click', this.onIconSearch);

        document.getElementById('letter-list-filter')?.removeEventListener('click', this.onFilterClick);
    }

    unregisterDefaultListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.chooseLetter);
            letter.letterElement.removeEventListener('contextmenu', this.showLetterContext);
            letter.stateElement.removeEventListener('click', this.changeState);
            letter.checkbox_area.removeEventListener('click', this.selectLetter);
        });
    }

    unregisterDraftListeners() {
        this.state.letters.forEach((letter) => {
            letter.letterElement.removeEventListener('click', this.chooseDraft);
            letter.letterElement.removeEventListener('contextmenu', this.showDraftContext);
            letter.stateElement.removeEventListener('click', this.changeState);
            letter.checkbox_area.removeEventListener('click', this.selectLetter);
        });
    }
}
