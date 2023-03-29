import {SidebarLinkButton} from '@uikits/sidebar-linkButton/sidebar-linkButton';
import {Component} from "@components/component";
import {config} from "@config/config";

import template from '@components/account-navigation/account-navigation.hbs';

import '@components/account-navigation/account-navigation.scss';

export interface AccountNavigation {
    state: {
        buttons: any,
    },
}

/**
 * class implementing uikit account-sidebar
 */
export class AccountNavigation extends Component {
    /**
     *
     * @param context
     */
    constructor(context: componentContext) {
        super(context);
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                buttons: SidebarLinkButton.renderTemplate(config.buttons.accountButtons),
            }
        ));
    }
}
