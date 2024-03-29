import {View} from '@views/view';
import {Validation} from '@utils/validation';
import template from '@views/signup-page/signup-page.hbs';

import {reducerUser} from '@stores/userStore';

import '@views/signup-page/signup-page.scss';

import {PromoBox} from '@components/promo-box/promo-box';
import {WrapperAccess} from '@components/wrapper-access/wrapper-access';
import {config, responseStatuses} from '@config/config';
import {dispatcher} from '@utils/dispatcher';

import {actionRedirect, actionSignup, actionToLogin} from '@actions/user';
import {microEvents} from '@utils/microevents';

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
        };

        this.subscribeSignupStatus = this.subscribeSignupStatus.bind(this);
        microEvents.bind('fromSignup', this.subscribeSignupStatus);

        this.subscribeRenderSignUp = this.subscribeRenderSignUp.bind(this);
        microEvents.bind('renderSignup', this.subscribeRenderSignUp);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();

        const data = document.getElementById('wrapper-access__form') as HTMLElement;

        const firstName = data.querySelector('input[name=first-name]') as HTMLInputElement;
        const lastName = data.querySelector('input[name=last-name]') as HTMLInputElement;
        const loginForm = data.querySelector('input[name=login]') as HTMLInputElement;
        const passwordForm = data.querySelector('input[name=password]') as HTMLInputElement;
        const repeatPasswordForm = data
            .querySelector('input[name=repeat_password]') as HTMLInputElement;

        const user = {} as user;
        user.firstName = firstName.value;
        user.lastName = lastName.value;
        user.login = loginForm.value;
        user.password = passwordForm.value;
        user.repeatPw = repeatPasswordForm.value;

        if (this.#validator.validateRegFields(
            user.login,
            user.password,
            user.repeatPw,
            user.firstName,
            user.lastName)) {
            await dispatcher.dispatch(actionSignup(user));
        }
    };
    onRedirectHandler = async (e: MouseEvent) => {
        e.preventDefault();
        await dispatcher.dispatch(actionToLogin());
    };

    showPassword = () => {
        const password_input = document.getElementById('password') as HTMLInputElement;

        if (password_input.type === 'password')
        {
            password_input.type = 'text';
        }
        else if(password_input.type === 'text')
        {
            password_input.type = 'password';
        }
    }

    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('wrapper-access__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect?.addEventListener('click', this.onRedirectHandler);
        document.getElementById('passwordEye')?.addEventListener('click', this.showPassword);
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

        document.getElementById('passwordEye')?.removeEventListener('click', this.showPassword);
    };

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

        this.registerEvents();
    };

    /**
     * method remove element from page
     */
    purge() {
        document.querySelectorAll('div.page').forEach((e) => {
            e.remove();
        });
    }

    /**
     * method calls when signup event end
     */
    subscribeSignupStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        switch (status) {
        case responseStatuses.OK:
            this.unregisterEvents();
            this.purge();
            dispatcher.dispatch(actionRedirect( '/inbox', true, false));
            break;
        case responseStatuses.UnauthorizedError:
        case responseStatuses.Forbidden:
            if (body.message === 'invalid login') {
                if (document.getElementById('loginError') === null) {
                    this.#validator.putErrorMessage(document.getElementById('login')!,
                        'loginError', 'Некорректный логин');
                }
            } else if (document.getElementById('passwordError') === null) {
                this.#validator.putErrorMessage(document.getElementById('password')!,
                    'passwordError', 'Неправильный пароль');
            }
            break;
        case responseStatuses.Conflict:
            if (document.getElementById('loginError') === null) {
                this.#validator.putErrorMessage(document.getElementById('login')!,
                    'loginError', 'Пользователь уже существует');
            }
            break;
        default:
            break;
        }
    }

    subscribeRenderSignUp = () => {
        this.purge();
        this.render();
    };
}
export const signupPage = new Signup(document.getElementById('root')!);
