import {UiKit} from "@/uikits/uikit";

import template from '@uikits/profile-button/profile-button.hbs';

import '@uikits/profile-button/profile-button.scss'

/**
 * class implementing component Letter Frame
 */
export class ProfileButton extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
