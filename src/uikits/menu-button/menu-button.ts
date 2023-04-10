import {UiKit} from '@/uikits/uikit';

import template from '@uikits/menu-button/menu-button.hbs';

import '@uikits/menu-button/menu-button.scss';

/**
 * class implementing component Menu Button
 */
export class MenuButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
