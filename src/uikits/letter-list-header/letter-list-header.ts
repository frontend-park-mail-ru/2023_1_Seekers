import {UiKit} from '@/uikits/uikit';

import template from '@uikits/letter-list-header/letter-list-header.hbs';

import '@uikits/letter-list-header/letter-list-header.scss';

/**
 * class implementing component letter-list-header
 */
export class LetterListHeader extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
