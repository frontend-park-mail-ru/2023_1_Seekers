import {UiKit} from "@/ui-kit/ui-kit";

import template from '@uikit/button/button.hbs';

/**
 * class implementing component button
 */
export class Button extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
