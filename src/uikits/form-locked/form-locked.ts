import {UiKit} from '@/uikits/uikit';

import template from '@uikits/form-locked/form-locked.hbs';

import '@uikits/form-locked/form-locked.scss';

/**
 * class implementing component input form-locked
 */
export class FormLocked extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
