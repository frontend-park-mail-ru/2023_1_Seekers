import {UiKit} from "@/ui-kit/ui-kit";

import template from '@uikit/list-item/list-item.hbs';

/**
 * class implementing component list-item
 */
export class ListItem extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
