import {UiKit} from '@/uikits/uikit';

import template from '@uikits/button/button.hbs';

import '@uikits/button/button.scss';

/**
 * class implementing component button
 */
export class Button extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
