import {UiKit} from '@/uikits/uikit';

import template from '@uikits/mail-content/mail-content.hbs';

import '@uikits/mail-content/mail-content.scss'

/**
 * class implementing component Letter Frame
 */
export class MailContent extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}