import {UiKit} from "@/uikits/uikit";

import template from '@uikits/letter-frame-loader/letter-frame-loader.hbs';

import '@uikits/letter-frame-loader/letter-frame-loader.scss'

/**
 * class implementing component Letter Frame Loader
 */
export class LetterFrameLoader extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
