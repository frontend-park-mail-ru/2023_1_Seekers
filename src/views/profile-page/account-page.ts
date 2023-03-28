import template from "@views/profile-page/account-page.hbs";

import "@views/profile-page/account-page.scss"

import {View} from "@views/view";
import {Validation} from "@utils/validation";
import {Navbar} from "@components/navbar/navbar";
import {AccountNavigation} from "@components/account-navigation/account-navigation";
import {AccountProfile} from "@components/account-profile/account-profile";
import {config} from "@config/config";
import {reducerUser} from "@stores/userStore";
import {AccountSecurity} from "@components/account-security/account-security";

interface Profile {
    state: {
        navbar: any,
        navigation: any,
        content: any;
    }
}

/**
 * class implementing account
 */
class Profile extends View {
    /**
     * Private field that contains a form validator
     */
    #validator;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent: Element) {
        super(
            parent,
            template,
        );
        this.#validator = new Validation();

        this.state = {
            navbar: undefined,
            navigation: undefined,
            content: undefined,
        }
    }

    /**
     * method insert account to HTML
     */
    render = () => {
        super.render({}); //TODO: fix it

        this.state.navbar = new Navbar({
            parent:  document.getElementById('account-navbar')!,
        });
        this.state.navbar.render();

        this.state.navigation = new AccountNavigation({
            parent:  document.getElementById('account-content__navigation')!,
        });
        this.state.navigation.render();

        // const profile = reducerUser._storage.get(reducerUser._storeNames.profile)
        //
        // this.state.content = new AccountProfile({
        //     parent:  document.getElementById('account-content__content')!,
        // }, {
        //     firstName: profile.firstName,
        //     lastName: profile.lastName,
        //     login: profile.email,
        //     avatar: profile.avatar,
        //     forms: config.accountFields.account.profile,
        //     button: config.accountFields.account.profile.button,
        // });
        // this.state.content.render();

        this.state.content = new AccountSecurity({
            parent:  document.getElementById('account-content__content')!,
        }, {
            forms: config.accountFields.account.security,
            button: config.accountFields.account.security.button,
        });
        this.state.content.render();
    };
}

export const profilePage = new Profile(document.getElementById('root')!);
