import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from '@components/account-security/account-security.hbs';
import '@components/account-security/account-security.scss';

import {Component} from '@components/component';
import {Validation} from '@utils/validation';
import {microEvents} from '@utils/microevents';
import {dispatcher} from '@utils/dispatcher';
import {actionPostSecurity} from '@actions/user';
import {reducerUser} from '@stores/userStore';
import {responseStatuses} from '@config/config';
import {showNotification} from '@components/notification/notification';

export interface AccountSecurity {
    state: {
        forms: any,
        button: any,
        element: Element,
    },
}

/**
 * class implementing component account-security
 */
export class AccountSecurity extends Component {
    #validator;

    /**
     * constructor
     * @param context - contains parent element
     * @param state - initialize start state for current object
     */
    constructor(context: componentContext, state: any) {
        super(context);
        this.state = state;

        this.#validator = new Validation();

        this.subscribeProfileStatus = this.subscribeProfileStatus.bind(this);
        microEvents.bind('fromSecurity', this.subscribeProfileStatus);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        const data = document.getElementById('account-security__form') as HTMLElement;

        const passwordOld =
            data.querySelector('input[name=password_old]') as HTMLInputElement;
        const passwordForm =
            data.querySelector('input[name=password]') as HTMLInputElement;
        const repeatPasswordForm =
            data.querySelector('input[name=repeat_password]') as HTMLInputElement;

        const userPwForm = {} as userPwForm;
        userPwForm.passwordOld = passwordOld.value;
        userPwForm.password = passwordForm.value;
        userPwForm.repeatPw = repeatPasswordForm.value;

        if ((this.#validator.validatePassword(userPwForm.passwordOld).status) &&
            (this.#validator.validateRePassword(userPwForm.password, userPwForm.repeatPw).status)) {
            await dispatcher.dispatch(actionPostSecurity(userPwForm));
        }
    };


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('account-security__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('account-security__form');
        form?.removeEventListener('submit', this.onSubmitHandler);
        form?.removeEventListener('focusout', this.#validator.focusValidator);
    };

    /**
     * method insert account-profile to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('account-security')[0];

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
