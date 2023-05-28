import {Component} from '@components/component';

import template from '@components/filter/filter.hbs';
import '@components/filter/filter.scss';

import {dispatcher} from "@utils/dispatcher";
import {actionPasteEmail} from "@actions/letters";


export interface Filter {
    state: {
        element: Element,
        isRendered: boolean,
        buttons: Element[],
    },
}

/**
 * class implementing component filter
 */
export class Filter extends Component {
    /**
     * Constructor that creates a component class SendMail
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            isRendered: false,
            buttons: [],
        };
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    buttonsClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                //dispatcher.dispatch(actionPasteEmail(currentTarget.dataset.section));
            }
        }
    };

    onFilterClick = (e: Event) => {
        e.preventDefault();
        if (e.target) {
            if (!(this.state.element.contains(e.target as HTMLElement) ||
                    (this.parent.contains(e.target as HTMLElement))) ||
                (this.parent === (e.target as HTMLElement))) {
                this.purge();
            }
        }
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    registerEventListener = () => {
        this.state.buttons.forEach((button) => {
            button.addEventListener('click', this.buttonsClicked);
        })

        document.addEventListener('click', this.onFilterClick);
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    unregisterEventListener = () => {
        this.state.buttons.forEach((button) => {
            button.removeEventListener('click', this.buttonsClicked);
        })

        document.removeEventListener('click', this.onFilterClick);
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        [...document.getElementsByClassName('filter')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('filter__item')) {
                    child.removeEventListener('click', this.buttonsClicked);
                }
            });
            ctxMenu.remove();
        });

        this.parent.insertAdjacentHTML('afterbegin', template({}));

        this.state.element = document.getElementById('filter') as HTMLElement;
        this.state.buttons = [...document.getElementsByClassName('filter__item')];


        this.registerEventListener();
    }

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
        this.state.isRendered = false;
    }
}
