import {UiKit} from '@/uikits/uikit';

import template from '@uikits/list-item/list-item.hbs';

import '@uikits/list-item/list-item.scss';

/**
 * class implementing component list-item
 */
export class ListItem extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
