import {UiKit} from '@/uikits/uikit';

import template from '@uikits/contrast-button/contrast-button.hbs';

import '@uikits/contrast-button/contrast-button.scss';

/**
 * class implementing component Menu Button
 */
export class ContrastButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
