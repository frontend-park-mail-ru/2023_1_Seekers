import {UiKit} from '@/uikits/uikit';

import template from '@uikits/formatter-line/formatter-line.hbs';

import '@uikits/formatter-line/formatter-line.scss';

/**
 * class implementing component formatter line
 */
export class FormatterLine extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
