import {Button} from '@uikits/button/button';

import template from '@components/account-anonymous/account-anonymous.hbs';
import '@components/account-anonymous/account-anonymous.scss';

import {Component} from '@components/component';
import {microEvents} from '@utils/microevents';
import {dispatcher} from '@utils/dispatcher';
import {reducerUser} from '@stores/userStore';
import {config, responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';
import {FormLocked} from "@uikits/form-locked/form-locked";
import {actionCreateAnonymous, actionDeleteAnonymous} from "@actions/user";
import {loginPage} from "@views/login-page/login-page";

export interface AccountAnonymous {
    state: {
        forms: any,
        button: any,
        inputs: any
        element: Element,
        deleteButtons: Element[],
    },
}

/**
 * class implementing component account-anonymous
 */
export class AccountAnonymous extends Component {

    /**
     * constructor
     * @param context - contains parent element
     * @param state - initialize start state for current object
     */
    constructor(context: componentContext) {
        super(context);
        this.state.button = config.accountFields.account.anonymous.button;
        this.rerender = this.rerender.bind(this);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatcher.dispatch(actionCreateAnonymous());
    };

    onDeleteHandler = async (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget) {
            const currentTarget = e.currentTarget as Element;
            if (currentTarget.parentElement) {
                [...currentTarget.parentElement.children].forEach((child) => {
                    if (child.tagName.toLowerCase() === 'input') {
                        dispatcher.dispatch(actionDeleteAnonymous((child as HTMLInputElement).value));
                    }
                });
            }
        }
    };


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('account-anonymous__form');
        this.state.inputs.forEach((emailLocked: any) => {
            emailLocked.addEventListener('click', this.saveOnEmailClick);
        });

        this.state.deleteButtons.forEach((button) => {
            button.addEventListener('click', this.onDeleteHandler);
        });

        form?.addEventListener('submit', this.onSubmitHandler);

        microEvents.bind('anonymousCreated', this.getCreateAnswer);
        microEvents.bind('anonymousDeleted', this.getDeleteAnswer);
    };

    getDeleteAnswer = () => {
        showNotification('email удалён успешно!');
        this.rerender();
    };

    getCreateAnswer = () => {
        showNotification('email создан успешно!');
        this.rerender();
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('account-anonymous__form');
        this.state.inputs.forEach((emailLocked: any) => {
            emailLocked.removeEventListener('click', this.saveOnEmailClick)
        });

        this.state.deleteButtons.forEach((button) => {
            button.removeEventListener('click', this.onDeleteHandler);
        });

        form?.removeEventListener('submit', this.onSubmitHandler);
        microEvents.unbind('anonymousCreated', this.getCreateAnswer);
        microEvents.unbind('anonymousDeleted', this.getDeleteAnswer);
    };

    saveOnEmailClick = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                navigator.clipboard.writeText(currentTarget.dataset.section).then(() => {
                        showNotification('Скопировано!');
                    }
                );
            }
        }
    }

    /**
     * method insert account-anonymous to HTML
     */
    render() {
        const anonymousItems: object[] = [];
        const forms: object[] = [];
        reducerUser.getAnonymousEmails().emails?.forEach((email) => {
            forms.push({value: email});
        });
        forms.forEach((button) => {
            anonymousItems.push(FormLocked.renderTemplate(button));
        });
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                anonymous: anonymousItems,
                button: Button.renderTemplate(this.state.button),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('account-anonymous')[0];
        this.state.inputs = [...document.getElementsByClassName('input-form-locked')];
        this.state.deleteButtons =
            [...this.state.element.getElementsByClassName('input-form-locked__icon')];

        this.registerEvents();
    }

    rerender() {
        this.purge();
        this.render();
    }

    /**
     * method purge
     * account-anonymous clearing
     * will purge all the content in account-anonymous
     */
    purge() {
        this.unregisterEvents();
        this.state.element.remove();
    }

    /**
     * method subscribeProfileStatus
     * show notification when answer to change password received
     */
    subscribeProfileStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        switch (status) {
            case responseStatuses.OK:
            case 500:
                showNotification('Пароль успешно изменён');
                break;
            default:
                if (body.message) {
                    showNotification(body.message);
                } else {
                    showNotification('что-то пошло не так');
                }
        }
    }
}
