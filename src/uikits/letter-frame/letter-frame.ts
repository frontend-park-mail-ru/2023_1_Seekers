import {UiKit} from '@/uikits/uikit';

import template from '@uikits/letter-frame/letter-frame.hbs';

import '@uikits/letter-frame/letter-frame.scss';

/**
 * class implementing component Letter Frame
 */
export class LetterFrame extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
