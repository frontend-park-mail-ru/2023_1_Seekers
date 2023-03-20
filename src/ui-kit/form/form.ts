import {UiKit} from "@/ui-kit/ui-kit";

import template from '@uikit/form/form.hbs';

/**
 * class implementing component input form
 */
export class Form extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
