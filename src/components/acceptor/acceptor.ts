import {Component} from '@components/component';
import {config} from '@config/config';

import template from '@components/acceptor/acceptor.hbs';

import '@components/acceptor/acceptor.scss';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';
import {ActionButton} from '@uikits/action-button/action-button';
import {microEvents} from "@utils/microevents";

export interface Acceptor {
    state: {
        element: Element,
        area: Element,
        footerButtons: Element[],
    },
}

/**
 * class implementing component Acceptor
 */
export class Acceptor extends Component {
    /**
     * Constructor that creates a component class Acceptor
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            area: document.createElement('div'),
            footerButtons: [],
        };
    }

    buttonsClicked = (e: Event) => {
        const currentTarget = e.currentTarget;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            e.preventDefault();
            e.stopPropagation();
            this.purge();
            microEvents.trigger(currentTarget.dataset.section);
        }
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen
     */
    registerEventListener = () => {
        this.state.footerButtons.forEach((button) => {
            button.addEventListener('click', this.buttonsClicked);
        })
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen
     */
    unregisterEventListener = () => {

    };

    /**
     * method insert form to HTML
     */
    render(text: string, buttons: any) {
        const actionButtons: object[] = [];

        Object.values(buttons.contrastButtons).forEach((button) => {
            actionButtons.push(ContrastButton.renderTemplate(button));
        });
        Object.values(buttons.activeButtons).forEach((button) => {
            actionButtons.push(ActionButton.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                text: text,
                actionButtons: actionButtons,
            },
        ));

        this.state.element = this.parent.getElementsByClassName('acceptor')[0];
        this.state.area = this.state.element.getElementsByClassName('acceptor-area')[0];
        this.state.footerButtons = [...this.state.element.getElementsByClassName('action-button')];
        this.state.footerButtons.push(this.state.element.getElementsByClassName('contrast-button')[0]);

        this.registerEventListener();
    }

    /**
     * method acceptor clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}
