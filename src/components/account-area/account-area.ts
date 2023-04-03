import template from "@components/account-area/account-area.hbs";

import "@components/account-area/account-area.scss"
import {Component} from "@components/component";
import {AccountNavigation} from "@components/account-navigation/account-navigation";
import {AccountProfile} from "@components/account-profile/account-profile";
import {config} from "@config/config";
import {reducerUser} from "@stores/userStore";
import {AccountSecurity} from "@components/account-security/account-security";
import {microEvents} from "@utils/microevents";
import {reducerLetters} from "@stores/LettersStore";

export interface AccountArea {
    state: {
        element: Element,
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

        this.state.element = this.parent.getElementsByClassName('account-area')[0];
        this.state.navigation = new AccountNavigation({
            parent: document.getElementById('account-area-content__navigation')!,
        });
        this.state.navigation.render();
        if(!this.state.content) {
            switch (reducerLetters._storage.get(reducerLetters._storeNames.currentAccountPage)){
                case '/profile':
                    this.renderProfile();
                    break;
                case '/security':
                    this.renderSecurity();
                    break;
            }
        }
        this.registerEventListener();
    }

    renderProfile = () => {
        if(!this.state.element) {
            this.render();
        }
        console.log('renderProfile');
        if (this.state.content) {
            this.state.content.purge();
        }
        console.log('help me pls')
        const profile = reducerUser._storage.get(reducerUser._storeNames.profile)

        this.state.content = new AccountProfile({
            parent: document.getElementById('account-area-content__content')!,
        }, {
            firstName: profile.firstName,
            lastName: profile.lastName,
            login: profile.email,
            avatar: profile.avatar,
            forms: config.accountFields.account.profile,
            button: config.accountFields.account.profile.button,
        });
        this.state.content.render();
    }

    renderSecurity = () => {
        if(!this.state.element) {
            this.render();
        }
        if (this.state.content) {
            this.state.content.purge();
        }
        this.state.content = new AccountSecurity({
            parent:  document.getElementById('account-area-content__content')!,
        }, {
            forms: config.accountFields.account.security,
            button: config.accountFields.account.security.button,
        });
        this.state.content.render();
    }

    registerEventListener() {
        microEvents.bind('renderProfilePage', this.renderProfile);
        microEvents.bind('renderSecurityPage', this.renderSecurity);
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
        microEvents.unbind('renderProfilePage', this.renderProfile);
        microEvents.unbind('renderSecurityPage', this.renderSecurity);
    }

    purge = () => {
        this.unregisterEventListener();
        this.state.navigation.purge();
        this.state.content.purge();
        this.state.element.remove();
    };
}
