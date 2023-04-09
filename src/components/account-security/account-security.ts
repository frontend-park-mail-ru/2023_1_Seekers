import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from "@components/account-security/account-security.hbs";
import "@components/account-security/account-security.scss"

import {Component} from "@components/component";
import {Validation} from "@utils/validation";
import {microEvents} from "@utils/microevents";
import {dispatcher} from "@utils/dispatcher";
import {actionPostProfile, actionPostSecurity} from "@actions/user";
import {reducerUser} from "@stores/userStore";
import {responseStatuses} from "@config/config";

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

        const password_old = data.querySelector('input[name=password_old]') as HTMLInputElement;
        const password_form = data.querySelector('input[name=password]') as HTMLInputElement;
        const repeat_password_form = data.querySelector('input[name=repeat_password]') as HTMLInputElement;

        const userPwForm = {} as userPwForm;
        userPwForm.passwordOld = password_old.value;
        userPwForm.password = password_form.value;
        userPwForm.repeatPw = repeat_password_form.value;

        if ((this.#validator.validatePassword(userPwForm.passwordOld).status)
            && (this.#validator.validateRePassword(userPwForm.password, userPwForm.repeatPw).status)) {
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
            }
        ));

        this.state.element = this.parent.getElementsByClassName('account-security')[0];

        this.registerEvents();
    }

    purge() {
        this.unregisterEvents();
        this.state.element.remove();
    }

    subscribeProfileStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        switch (status) {
            case responseStatuses.OK:

                break;
            default:
                break;
        }
    }
}
