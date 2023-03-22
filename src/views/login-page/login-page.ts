import {View} from '@views/view';
import {Validation} from '@utils/validation'
import template from '@views/login-page/login-page.hbs'

import '@views/login-page/login-page.scss';

import {PromoBox} from "@components/promo-box/promo-box";
import {WrapperAccess} from "@components/wrapper-access/wrapper-access";
import {config} from "@config/config";

export interface Login {
    state: {
        promoBox: any;
        wrapperAccess: any;
    }
}

/**
 * class implementing login page
 */
export class Login extends View {
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
        }
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        console.log('login-page -onSubmitHandler - hi')
        e.preventDefault();

        const data = this.parent.querySelector('.wrapper-access__form') as HTMLElement;

        const login = data.querySelector('input[type=email]') as HTMLInputElement;
        const password = data.querySelector('input[type=password]') as HTMLInputElement;

        const user = {} as user;

        user.login = login.value;
        user.password = password.value;

        if (this.#validator.validateRegFields(user.login, user.password)) {
            console.log('validateRegFields');
        }
    };


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('wrapper-access__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);
        // const redirect = document.getElementById('redirect-link');
        // redirect.addEventListener('click', this.onRedirectHandler);

    };

    // /**
    //  * method unregister events button submit/input focus/redirect link
    //  */
    // unregisterEvents = () => {
    //     const form = document.getElementById('wrapper-access__form');
    //     form.removeEventListener('submit', this.onSubmitHandler);
    //     form.removeEventListener('focusout', this.#validator.focusValidator);
    //
    //     const redirect = document.getElementById('redirect-link');
    //     redirect.removeEventListener('click', this.onRedirectHandler);
    // };

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
        });
        this.state.wrapperAccess.render();

        this.state.promoBox = new PromoBox({
            parent: mainContent,
        });
        this.state.promoBox.render();

        this.registerEvents();

    };
}

