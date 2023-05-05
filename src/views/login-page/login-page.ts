import {View} from '@views/view';
import {Validation} from '@utils/validation';
import template from '@views/login-page/login-page.hbs';

import {reducerUser} from '@stores/userStore';

import '@views/login-page/login-page.scss';

import {PromoBox} from '@components/promo-box/promo-box';
import {WrapperAccess} from '@components/wrapper-access/wrapper-access';
import {config, responseStatuses} from '@config/config';
import {dispatcher} from '@utils/dispatcher';

import {actionLogin, actionRedirect, actionToSignUp} from '@actions/user';
import {microEvents} from '@utils/microevents';

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
     * @param parent - HTML-element for including content
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
        this.subscribeLoginStatus = this.subscribeLoginStatus.bind(this);
        microEvents.bind('fromLogin', this.subscribeLoginStatus);

        this.subscribeRenderLogin = this.subscribeRenderLogin.bind(this);
        microEvents.bind('renderLogin', this.subscribeRenderLogin);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        const data = document.getElementById('wrapper-access__form') as HTMLElement;

        const loginForm = data.querySelector('input[name=login]') as HTMLInputElement;
        const passwordForm = data.querySelector('input[name=password]') as HTMLInputElement;

        const user = {} as user;
        user.login = loginForm.value;
        user.password = passwordForm.value;

        if (this.#validator.validateRegFields(user.login, user.password)) {
            await dispatcher.dispatch(actionLogin(user));
        }
    };

    /**
     * promise handle click password icon
     * @param  e - event click password icon
     */
    onClickPasswordIcon = async (e: SubmitEvent) => {
        e.preventDefault();
        const data = document.getElementById('wrapper-access__form') as HTMLElement;
        const passwordForm = data.querySelector('input[name=password]') as HTMLInputElement;

        passwordForm.insertAdjacentHTML('afterbegin', config.forms.login.passwordIcons.close.img)
    };
    onRedirectHandler = async (e: MouseEvent) => {
        e.preventDefault();
        await dispatcher.dispatch(actionToSignUp());
    };

    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('wrapper-access__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('input', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect?.addEventListener('click', this.onRedirectHandler);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('wrapper-access__form');
        form?.removeEventListener('submit', this.onSubmitHandler);
        form?.removeEventListener('input', this.#validator.focusValidator);

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

        const data = document.getElementById('wrapper-access__form') as HTMLElement;
        const passwordForm = data.querySelector('input[name=password]') as HTMLInputElement;

        passwordForm.insertAdjacentHTML('afterbegin', '<div class="passwordIcon" id="passwordIcon">'
            + config.forms.login.passwordIcons.close.img
            + '</div>');

        this.registerEvents();
    };

    /**
     * method login page clearing
     */
    purge() {
        document.querySelectorAll('div.page').forEach((e) => {
            e.remove();
        });
    }

    /**
     * method that triggers when answer from backend received
     */
    subscribeLoginStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        switch (status) {
        case responseStatuses.OK:
            this.unregisterEvents();
            this.purge();
            dispatcher.dispatch(actionRedirect( '/inbox', true, false));
            break;
        case 401:
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
        default:
            break;
        }
    }

    subscribeRenderLogin = () => {
        this.purge();
        this.render();
    };
}


export const loginPage = new Login(document.getElementById('root')!);

