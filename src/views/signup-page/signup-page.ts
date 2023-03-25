import {View} from '@views/view';
import {Validation} from '@utils/validation'
import template from '@views/signup-page/signup-page.hbs'

import {reducerLetters} from "@stores/LettersStore";
import {reducerUser} from "@stores/userStore";

import '@views/signup-page/signup-page.scss';

import {PromoBox} from "@components/promo-box/promo-box";
import {WrapperAccess} from "@components/wrapper-access/wrapper-access";
import {config, ROOT} from "@config/config";
import { dispatcher } from '@utils/dispatcher';

import {actionLogin} from "@actions/user";
import {microEvents} from "@utils/microevents";

interface Signup {
    state: {
        promoBox: any,
        wrapperAccess: any,
        statusLogin: number,
        isSubscribed: boolean,
    }
}

/**
 * class implementing signup page
 */
class Signup extends View {
    /**
     * Private field that contains a form validator
     */
    context: any;

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
            promoBox: null,
            wrapperAccess: null,
            statusLogin: 0,
            isSubscribed: false,
        }
    }

    /**
     * method insert signup to HTML
     */
    override render = () => {

        this.context = config;
        const context = this.context.forms.signup;
        super.render(context);

        const mainContent = document.getElementById('main-content') as HTMLFormElement;

        this.state.wrapperAccess = new WrapperAccess({
            parent: mainContent,
        }, {
            title: config.forms.signup.windowData.title,
            forms: config.forms.signup,
            button: config.forms.signup.button,
            bottomText: config.forms.signup.windowData.bottomText,
            bottomLink: config.forms.signup.windowData.bottomLink,
            bottomLinkText: config.forms.signup.windowData.bottomLinkText,
        });

        this.state.wrapperAccess.render();

        this.state.promoBox = new PromoBox({
            parent: mainContent,
        });
        this.state.promoBox.render();

        // this.registerEvents();
        //
        // if (!this.state.isSubscribed) {
        //     microEvents.bind('fromLogin', this.subscribeLoginStatus);
        //     this.state.isSubscribed = true;
        // }
    };

    purge() {
        document.querySelectorAll('div.page').forEach((e) => {
            e.remove();
        });
    }
}
export const signupPage = new Signup(document.getElementById('root')!);
