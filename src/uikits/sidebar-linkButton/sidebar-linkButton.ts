import {UiKit} from "@uikits/uikit";
import template from "@uikits/sidebar-linkButton/sidebar-linkButton.hbs";
import '@uikits/sidebar-linkButton/sidebar-linkButton.scss'
/**
 * class implementing component sidebar-linkButton
 */
export class SidebarLinkButton extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
