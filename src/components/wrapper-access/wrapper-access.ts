import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';


import template from '@components/wrapper-access/wrapper-access.hbs';

import '@components/wrapper-access/wrapper-access.scss';
import {Component} from "@components/component";
import {config} from "@config/config";
import {ListItem} from "@uikits/list-item/list-item";

export interface WrapperAccess {
    state: {
        forms:any,
        button: any
    },
}

/**
 * class implementing component wrapper-access
 */
export class WrapperAccess extends Component {
    constructor(context: componentContext) {
        super(context);
        this.state = {
            forms: {
                fields: config.forms.login.fields,
            },
            button: config.forms.login.button
        };
    }

    /**
     * method insert wrapper-access(signup and login) to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                title: config.forms.login.windowData.title,
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
                bottomText: config.forms.login.windowData.bottomText,
                bottomLink: config.forms.login.windowData.bottomLink,
                bottomLinkText: config.forms.login.windowData.bottomLinkText,
            }
        ));
    }
}
