import {UiKit} from '@/uikits/uikit';

import '@uikits/profile-data/profile-data.scss';

import template from '@uikits/profile-data/profile-data.hbs';

/**
 * class implementing uikit profile-data
 */
export class ProfileData extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
