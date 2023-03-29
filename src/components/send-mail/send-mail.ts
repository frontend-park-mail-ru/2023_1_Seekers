import {Component} from "@components/component";
import {reducerUser} from "@stores/userStore";
import {NewMailButton} from "@uikits/new-mail-button/new-mail-button";

import template from '@components/send-mail/send-mail.hbs';
import '@components/send-mail/send-mail.scss';
import {dispatcher} from "@utils/dispatcher";

import {config} from "@config/config";
import {IconButton} from "@uikits/icon-button/icon-button";


export interface SendMail {
    state: {
        element: Element,
        area: Element,
        footerButtons: Element[],
        iconButton: Element,
    },
}

/**
 * class implementing uikit send-mail
 */
export class SendMail extends Component {

    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            area: document.createElement('div'),
            footerButtons: [],
            iconButton: document.createElement('div'),
        }
    }

    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    bottomButtonsClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
                case config.buttons.newMailButtons.footerButtons.send.href:
                    // dispatcher.dispatch()
                    break;

                case config.buttons.newMailButtons.footerButtons.cancel.href:
                    this.purge();
                    break;
            }
        }
    }

    closeButtonClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
                case config.buttons.newMailButtons.closeButton.href:
                    this.purge();
                    break;
            }
        }
    }

    registerEventListener = () => {
        console.log('in register');
        document.addEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.addEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.addEventListener('click', this.closeButtonClicked);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        console.log('in unregister');
        document.removeEventListener('click', this.onSidebarClick);

        this.state.footerButtons.forEach((button: Element) => {
            button.removeEventListener('click', this.bottomButtonsClicked);
        });

        this.state.iconButton.removeEventListener('click', this.closeButtonClicked);
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: Object[] = [];
        console.log(config);
        Object.values(config.buttons.newMailButtons.footerButtons).forEach((button) => {
            actionButtons.push(NewMailButton.renderTemplate(button));
        })

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            inputs: config.forms.newMail,
            actionButtons: actionButtons,
            closeButton: IconButton.renderTemplate(config.buttons.newMailButtons.closeButton),
        }));

        this.state.element = this.parent.getElementsByClassName('send-mail')[0];
        this.state.area = this.state.element.getElementsByClassName('send-mail-area')[0];
        this.state.footerButtons = [...this.state.element.getElementsByClassName('new-mail-button')];
        this.state.iconButton = this.state.element.getElementsByClassName('icon-button')[0];

        this.registerEventListener();
    }

    onSidebarClick = (e: Event) => {
        e.preventDefault();
        console.log('onSidebarClick');
        if (e.target) {
            if (this.state.element === e.target as HTMLElement) {
                this.purge();
            }
        }
    };

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}
