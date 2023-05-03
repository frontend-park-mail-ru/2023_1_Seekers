import {UiKit} from '@/uikits/uikit';

import '@uikits/navbar-user-info/navbar-user-info.scss';

import template from '@uikits/navbar-user-info/navbar-user-info.hbs';

/**
 * class implementing component Letter Frame
 */
export class NavbarUserInfo extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
