import {Component} from '@components/component';

import template from '@components/data-list/data-list.hbs';
import '@components/data-list/data-list.scss';

import {config, responseStatuses} from '@config/config';
import {ProfileData} from "@uikits/profile-data/profile-data";
import {dispatcher} from "@utils/dispatcher";
import {actionCreateFolder} from "@actions/folders";
import {actionPasteEmail, actionShowPasteEmail} from "@actions/letters";


export interface DataList {
    state: {
        element: Element,
        isRendered: boolean,
        buttons: Element[],
    },
}

/**
 * class implementing component data-list
 */
export class DataList extends Component {
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
                dispatcher.dispatch(actionPasteEmail(currentTarget.dataset.section));
            }
        }
    };

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    mouseOverButton = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(actionShowPasteEmail(currentTarget.dataset.section));
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
            button.addEventListener('mouseover', this.mouseOverButton);

        })
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    unregisterEventListener = () => {
        this.state.buttons.forEach((button) => {
            button.removeEventListener('click', this.buttonsClicked);
            button.removeEventListener('mouseover', this.mouseOverButton);
        })
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        if (this.state.isRendered) {
            // this.removeDataList();
            return;
        }
        const menuActionButtons: object[] = [];
        Object.values(config.buttons.DELETETHISBUTTONS).forEach((button) => { // fix
            menuActionButtons.push(ProfileData.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                menuActionButtons: menuActionButtons,
            },
        ));

        this.state.element = document.getElementById('data-list') as HTMLElement;
        this.state.buttons = [...document.getElementsByClassName('profile-data__item')];

        this.state.isRendered = true;

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
