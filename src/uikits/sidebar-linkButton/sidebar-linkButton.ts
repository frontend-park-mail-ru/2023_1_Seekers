import {UiKit} from "@uikits/uikit";
import template from "@uikits/sidebar-linkButton/sidebar-linkButton.hbs";

/**
 * class implementing component sidebar-linkButton
 */
export class SidebarLinkButton extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
