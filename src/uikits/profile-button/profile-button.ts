import {UiKit} from '@/uikits/uikit';

import '@uikits/profile-button/profile-button.scss';

import template from '@uikits/profile-button/profile-button.hbs';

/**
 * class implementing component Letter Frame
 */
export class ProfileButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
