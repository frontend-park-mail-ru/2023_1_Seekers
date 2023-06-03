import {UiKit} from '@/uikits/uikit';

import template from '@uikits/action-button/action-button.hbs';

import '@uikits/action-button/action-button.scss';

/**
 * class implementing component Menu Button
 */
export class ActionButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
