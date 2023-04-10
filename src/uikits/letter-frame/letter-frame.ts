import {UiKit} from '@/uikits/uikit';

import template from '@uikits/letter-frame/letter-frame.hbs';

import '@uikits/letter-frame/letter-frame.scss';

/**
 * class implementing component Letter Frame
 */
export class LetterFrame extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
