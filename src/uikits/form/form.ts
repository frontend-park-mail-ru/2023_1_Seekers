import {UiKit} from '@/uikits/uikit';

import template from '@uikits/form/form.hbs';

import '@uikits/form/form.scss';

/**
 * class implementing component input form
 */
export class Form extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
