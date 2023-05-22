import {UiKit} from '@uikits/uikit';
import template from '@uikits/text-area/text-area.hbs';
import '@uikits/text-area/text-area.scss';
/**
 * class implementing component sidebar-linkButton
 */
export class TextArea extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
