import template from "@views/profile-page/account-page.hbs";

import {View} from "@views/view";
import {Validation} from "@utils/validation";
import {Navbar} from "@components/navbar/navbar";
import {AccountNavigation} from "@components/account-navigation/account-navigation";

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
    };
}

export const profilePage = new Profile(document.getElementById('root')!);
