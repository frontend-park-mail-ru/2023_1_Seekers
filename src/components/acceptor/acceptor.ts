import {Component} from '@components/component';
import {config} from '@config/config';

import template from '@components/acceptor/acceptor.hbs';

import '@components/acceptor/acceptor.scss';
import {ContrastButton} from '@uikits/contrast-button/contrast-button';
import {ActionButton} from '@uikits/action-button/action-button';

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

    /**
     * method registerEventListener
     * register listeners for each action that may happen
     */
    registerEventListener = () => {

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
    render(text: string) {
        const actionButtons: object[] = [];

        Object.values(config.buttons.newFolderButtons.footerButtons.contrastButtons).forEach((button) => {
            actionButtons.push(ContrastButton.renderTemplate(button));
        });
        Object.values(config.buttons.newFolderButtons.footerButtons.activeButtons).forEach((button) => {
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
        this.state.footerButtons = [...this.state.element.getElementsByClassName('contrast-button')];
        this.state.footerButtons.push(this.state.element.getElementsByClassName('action-button')[0]);

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
