import {UiKit} from '@/uikits/uikit';

import template from '@uikits/attachment/attachment.hbs';

import '@uikits/attachment/attachment.scss';

/**
 * class implementing component attachment
 */
export class Attachment extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
