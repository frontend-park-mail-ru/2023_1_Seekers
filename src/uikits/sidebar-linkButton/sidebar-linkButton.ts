import {UiKit} from '@uikits/uikit';
import template from '@uikits/sidebar-linkButton/sidebar-linkButton.hbs';
import '@uikits/sidebar-linkButton/sidebar-linkButton.scss';
/**
 * class implementing component sidebar-linkButton
 */
export class SidebarLinkButton extends UiKit {
    /**
     * method that render current kit
     * @param args - needed data to render template
     */
    static renderTemplate(args: any) {
        return template(args);
    }
}
