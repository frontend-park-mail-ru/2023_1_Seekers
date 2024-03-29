import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';


import template from '@components/wrapper-access/wrapper-access.hbs';
import '@components/wrapper-access/wrapper-access.scss';

import {Component} from '@components/component';

export interface WrapperAccess {
    state: {
        title: string
        forms: any,
        button: any,
        bottomText: string,
        bottomLink: string,
        bottomLinkText: string,
    },
}

/**
 * class implementing component wrapper-access
 */
export class WrapperAccess extends Component {
    /**
     * Constructor that creates a component class WrapperAccess
     * @param context - HTML element into which
     * @param state - initial state of object
     * will be rendered current element
     */
    constructor(context: componentContext, state: any) {
        super(context);
        this.state = state;
    }

    /**
     * method insert wrapper-access(signup and login) to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                title: this.state.title,
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
                bottomText: this.state.bottomText,
                bottomLink: this.state.bottomLink,
                bottomLinkText: this.state.bottomLinkText,
            },
        ));
    }
}
