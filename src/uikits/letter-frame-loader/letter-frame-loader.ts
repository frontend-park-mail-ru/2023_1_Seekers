import {UiKit} from '@/uikits/uikit';

import template from '@uikits/letter-frame-loader/letter-frame-loader.hbs';

import '@uikits/letter-frame-loader/letter-frame-loader.scss';

/**
 * class implementing component Letter Frame Loader
 */
export class LetterFrameLoader extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
