import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from "@components/account-security/account-security.hbs";
import "@components/account-security/account-security.scss"

import {Component} from "@components/component";

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
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
            }
        ));

        this.state.element = this.parent.getElementsByClassName('account-security')[0];
    }

    purge() {
        this.state.element.remove();
    }
}
