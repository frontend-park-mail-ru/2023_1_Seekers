import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from "@components/account-profile/account-profile.hbs";
import "@components/account-profile/account-profile.scss"

import {Component} from "@components/component";

export interface AccountProfile {
    state: {
        element: Element,
        firstName: string,
        lastName: string,
        login: string,
        avatar: any,
        forms: any,
        button: any,
    },
}

/**
 * class implementing component account-profile
 */
export class AccountProfile extends Component {
    constructor(context: componentContext, state: any) {
        super(context);
        this.state = state;
    }

    /**
     * method insert account-profile to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                login: this.state.login,
                avatar: this.state.avatar,
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
            }
        ));
        this.state.element = this.parent.getElementsByClassName('account-profile')[0];
    }

    purge() {
        this.state.element.remove();
    }
}
