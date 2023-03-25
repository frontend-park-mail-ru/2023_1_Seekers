import {View} from '@views/view';
import {Validation} from '@utils/validation'
import template from '@views/login-page/login-page.hbs'

import {reducerLetters} from "@stores/LettersStore";
import {reducerUser} from "@stores/userStore";

import '@views/login-page/login-page.scss';

import {PromoBox} from "@components/promo-box/promo-box";
import {WrapperAccess} from "@components/wrapper-access/wrapper-access";
import {config, ROOT} from "@config/config";
import { dispatcher } from '@utils/dispatcher';

import {actionLogin} from "@actions/user";
import {microEvents} from "@utils/microevents";
import {Form} from "@uikits/form/form";
import {Button} from "@uikits/button/button";

interface Login {
    state: {
        promoBox: any,
        wrapperAccess: any,
        statusLogin: number,
        isSubscribed: boolean,
    }
}

/**
 * class implementing login page
 */
class Login extends View {
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

        this.subscribeLoginStatus = this.subscribeLoginStatus.bind(this);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();

        console.log(reducerUser._storage.get('name'));
        console.log(reducerLetters._storage.get('letters'));

        const data = document.getElementById('wrapper-access__form') as HTMLElement;

        const login = data.querySelector('input[name=login]') as HTMLInputElement;
        const password = data.querySelector('input[name=password]') as HTMLInputElement;

        const user = {} as user;

        user.login = login.value;
        user.password = password.value;

        if (this.#validator.validateRegFields(user.login, user.password)) {
            console.log('validateRegFields');

            dispatcher.dispatch(actionLogin(user));
        }
    };
    onRedirectHandler = async (e: MouseEvent) => {
        e.preventDefault();
    };

    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('wrapper-access__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect?.addEventListener('click', this.onRedirectHandler);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('wrapper-access__form');
        form?.removeEventListener('submit', this.onSubmitHandler);
        form?.removeEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect?.removeEventListener('click', this.onRedirectHandler);
    };

    /**
     * method insert login to HTML
     */
    override render = () => {

        this.context = config;
        const context = this.context.forms.login;
        super.render(context);

        const mainContent = document.getElementById('main-content') as HTMLFormElement;

        this.state.wrapperAccess = new WrapperAccess({
            parent: mainContent,
        }, {
            title: config.forms.login.windowData.title,
            forms: config.forms.login,
            button: config.forms.login.button,
            bottomText: config.forms.login.windowData.bottomText,
            bottomLink: config.forms.login.windowData.bottomLink,
            bottomLinkText: config.forms.login.windowData.bottomLinkText,
        });

        this.state.wrapperAccess.render();

        this.state.promoBox = new PromoBox({
            parent: mainContent,
        });
        this.state.promoBox.render();

        this.registerEvents();

        if (!this.state.isSubscribed) {
            microEvents.bind('fromLogin', this.subscribeLoginStatus);
            this.state.isSubscribed = true;
        }

    };

    /**\
     * method login page clearing
     */
    purge() {
        document.querySelectorAll('div.page').forEach((e) => {
            e.remove();
        });
    }

    subscribeLoginStatus() {
        console.log('hi subscribeLoginStatus')
        // this.state.statusLogin = dispatcher.getState('statusLogin');
        this.render();
    }
}


export const loginPage = new Login(document.getElementById('root')!);

