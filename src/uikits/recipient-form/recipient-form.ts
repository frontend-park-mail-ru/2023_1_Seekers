import {UiKit} from "@/uikits/uikit";

import '@uikits/recipient-form/recipient-form.scss'

import template from '@uikits/recipient-form/recipient-form.hbs';

/**
 * class implementing component Letter Frame
 */
export class RecipientForm extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
