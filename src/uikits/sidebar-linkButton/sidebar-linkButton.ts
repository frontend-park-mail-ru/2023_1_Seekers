import {UiKit} from "@uikits/uikit";
import template from "@uikits/profile-button/profile-button.hbs";

/**
 * class implementing component sidebar-linkButton
 */
export class SidebarLinkButton extends UiKit {
    static renderTemplate(args: any) {
        return template(args);
    }
}
