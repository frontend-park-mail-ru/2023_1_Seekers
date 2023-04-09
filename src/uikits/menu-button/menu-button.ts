import {UiKit} from '@/uikits/uikit';

import template from '@uikits/menu-button/menu-button.hbs';

import '@uikits/menu-button/menu-button.scss';

/**
 * class implementing component Menu Button
 */
export class MenuButton extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
