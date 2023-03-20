import {UiKit} from "@/ui-kit/ui-kit";

import template from '@uikit/checkbox/checkbox.hbs';

/**
 * class implementing component checkbox
 */
export class Checkbox extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
