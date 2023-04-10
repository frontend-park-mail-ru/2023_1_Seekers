import {UiKit} from '@/uikits/uikit';

import template from '@uikits/icon-button/icon-button.hbs';

import '@uikits/icon-button/icon-button.scss';

/**
 * class implementing component input form
 */
export class IconButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
