import {UiKit} from '@/uikits/uikit';

import template from '@uikits/folder-name/folder-name.hbs';

import '@uikits/folder-name/folder-name.scss';

/**
 * class implementing component list-item
 */
export class FolderName extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
