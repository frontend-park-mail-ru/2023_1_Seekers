import {Component} from '@components/component';

import template from '@components/data-list-from/data-list-from.hbs';
import '@components/data-list-from/data-list-from.scss';

import {config, responseStatuses} from '@config/config';
import {ProfileData} from "@uikits/profile-data/profile-data";
import {dispatcher} from "@utils/dispatcher";
import {actionCreateFolder} from "@actions/folders";
import {actionFreePasteEmail, actionPasteEmail, actionShowPasteEmail} from "@actions/letters";
import {reducerUser} from "@stores/userStore";


export interface DataList {
    state: {
        element: Element,
        isRendered: boolean,
        buttons: Element[],
        emails: string[],
    },
}

/**
 * class implementing component data-list
 */
export class DataListFrom extends Component {
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
            emails: [],
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
                (document.getElementById('send-mail__from') as HTMLInputElement)
                    .textContent = currentTarget.dataset.section;
                this.purge();
                e.stopPropagation();
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
                (document.getElementById('send-mail__from') as HTMLInputElement)
                    .textContent = currentTarget.dataset.section;
            }
        }
    };

    /**
     * method handle click on navbar
     * @param e - event that goes from one of childs of current element
     */
    mouseOutButton = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                (document.getElementById('send-mail__from') as HTMLInputElement)
                    .textContent = reducerUser.getMyProfile().email;
            }
        }
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    registerEventListener = () => {
        this.state.buttons.forEach((button: any) => {
            button.addEventListener('click', this.buttonsClicked);
            button.addEventListener('mouseover', this.mouseOverButton);
            button.addEventListener('mouseout', this.mouseOutButton);

        })
    };

    /**
     * method registerEventListener
     * register listeners for each action that may happen in send mail
     */
    unregisterEventListener = () => {
        this.state.buttons.forEach((button: any) => {
            button.removeEventListener('click', this.buttonsClicked);
            button.removeEventListener('mouseover', this.mouseOverButton);
            button.removeEventListener('mouseout', this.mouseOutButton);
        })
    };

    /**
     * method insert sidebar to HTML
     */
    render(x: number, y: number) {
        if (reducerUser.getAnonymousEmails().count === 0) {
            return;
        }

        [...document.getElementsByClassName('data-list')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('profile-data__item')) {
                    child.removeEventListener('click', this.buttonsClicked);
                    child.removeEventListener('mouseover', this.mouseOverButton);
                    child.removeEventListener('mouseout', this.mouseOutButton);
                }
            });
            ctxMenu.remove();
        });

        [...document.getElementsByClassName('data-list-from')].forEach((ctxMenu) => {
            [...ctxMenu.children].forEach((child) => {
                if (child.classList.contains('profile-data__item')) {
                    child.removeEventListener('click', this.buttonsClicked);
                    child.removeEventListener('mouseover', this.mouseOverButton);
                    child.removeEventListener('mouseout', this.mouseOutButton);
                }
            });
            ctxMenu.remove();
        });

        this.state.emails.push({
            email: reducerUser.getMyProfile().email,
            avatar: reducerUser.getAvatar(reducerUser.getMyProfile().email),
        });
        reducerUser.getAnonymousEmails().emails?.forEach((email) => {
            this.state.emails.push({
                email: email,
                avatar: reducerUser.getAvatar(email),
            });
        });


        const menuActionButtons: object[] = [];
        this.state.emails.forEach((button: any) => {
            menuActionButtons.push(ProfileData.renderTemplate(button));
        });

        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                menuActionButtons: menuActionButtons,
            },
        ));

        this.state.element = document.getElementById('data-list-from') as HTMLElement;
        this.state.buttons = [...this.state.element.getElementsByClassName('profile-data__item')];

        const ctxHeight = (this.state.element as HTMLDivElement).offsetHeight;
        const ctxWidth = (this.state.element as HTMLDivElement).offsetWidth;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if ((windowWidth - x) < ctxWidth) {
            x = x - ctxWidth;
        }

        if ((windowHeight - y) < ctxHeight) {
            y = y - ctxHeight;
        }

        (this.state.element as HTMLDivElement).style.top = y.toString() + 'px';
        (this.state.element as HTMLDivElement).style.left = x.toString() + 'px';

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
