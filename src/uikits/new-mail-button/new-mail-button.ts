import {UiKit} from '@/uikits/uikit';

import template from '@uikits/new-mail-button/new-mail-button.hbs';

import '@uikits/new-mail-button/new-mail-button.scss';

/**
 * class implementing component Menu Button
 */
export class NewMailButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
