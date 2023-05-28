import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from '@components/account-anonymous/account-anonymous.hbs';
import '@components/account-anonymous/account-anonymous.scss';

import {Component} from '@components/component';
import {microEvents} from '@utils/microevents';
import {dispatcher} from '@utils/dispatcher';
import {reducerUser} from '@stores/userStore';
import {responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';

export interface AccountAnonymous {
    state: {
        forms: any,
        button: any,
        element: Element,
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
    constructor(context: componentContext, state: any) {
        super(context);
        this.state = state;

        this.subscribeProfileStatus = this.subscribeProfileStatus.bind(this);
        microEvents.bind('fromSecurity', this.subscribeProfileStatus);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();

    };


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('account-anonymous__form');

        form?.addEventListener('submit', this.onSubmitHandler);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('account-anonymous__form');
        form?.removeEventListener('submit', this.onSubmitHandler);
    };

    /**
     * method insert account-profile to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                button: Button.renderTemplate(this.state.button),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('account-anonymous')[0];

        this.registerEvents();
    }

    /**
     * method purge
     * account security clearing
     * will purge all the content in account security
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
