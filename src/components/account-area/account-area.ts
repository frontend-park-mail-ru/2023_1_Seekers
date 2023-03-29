import template from "@components/account-area/account-area.hbs";

import "@components/account-area/account-area.scss"
import {Component} from "@components/component";
import {AccountNavigation} from "@components/account-navigation/account-navigation";
import {AccountProfile} from "@components/account-profile/account-profile";
import {config} from "@config/config";
import {reducerUser} from "@stores/userStore";

export interface AccountArea {
    state: {
        navbar: any,
        navigation: any,
        content: any;
    }
}

/**
 * class implementing account
 */
export class AccountArea extends Component {

    /**
     *
     * @param {componentContext} context HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        // this.#validator = new Validation();
        //
        // this.state = {
        //     navbar: undefined,
        //     navigation: undefined,
        //     content: undefined,
        // }
    }

    /**
     * method insert account to HTML
     */
    render = () => {
        this.parent.insertAdjacentHTML('afterbegin', template({}));

        this.state.navigation = new AccountNavigation({
            parent:  document.getElementById('account-area-content__navigation')!,
        });
        this.state.navigation.render();

        const profile = reducerUser._storage.get(reducerUser._storeNames.profile)

        this.state.content = new AccountProfile({
            parent:  document.getElementById('account-area-content__content')!,
        }, {
            firstName: profile.firstName,
            lastName: profile.lastName,
            login: profile.email,
            avatar: profile.avatar,
            forms: config.accountFields.account.profile,
            button: config.accountFields.account.profile.button,
        });
        this.state.content.render();

        // this.state.content = new AccountSecurity({
        //     parent:  document.getElementById('account-content__content')!,
        // }, {
        //     forms: config.accountFields.account.security,
        //     button: config.accountFields.account.security.button,
        // });
        // this.state.content.render();
    };
}
