import {UiKit} from '@/uikits/uikit';

import template from '@uikits/mail-content/mail-content.hbs';

import '@uikits/mail-content/mail-content.scss';

/**
 * class implementing uikit MailContent
 */
export class MailContent extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
