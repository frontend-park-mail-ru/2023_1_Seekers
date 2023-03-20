import {View} from "@views/view";
import template from "@views/login-page/login-page.hbs";
import {Validation} from "@utils/validation";
import userStore from "@stores/user-store";
import {WrapperAccess} from "@components/wrapper-access/wrapper-access";
import {PromoBox} from "@components/promo-box/promo-box";

export interface Signup {
    state: {
        promoBox: any;
        wrapperAccess: any;
    }
}

/**
 * class implementing signup page
 */
export class Signup extends View {
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

    // /**
    //  * promise handle button submit
    //  * @param {object} e - event click on button submit
    //  */
    // onSubmitHandler = async (e) => {
    //     const data = [];
    //     const validation = new Validation();
    //     const form = document.getElementById('wrapper-access__form');
    //     const fields = this.#context.forms.signup.fields;
    //
    //     e.preventDefault();
    //
    //     Object.keys(fields).forEach((input) => {
    //         data.push(form.querySelector(`[name=${fields[input].name}]`).value);
    //     });
    //
    //     const [firstName, lastName, login, password, repeatPw] = data;
    //
    //     if (validation.validateRegFields(login, password, repeatPw, firstName, lastName)) {
    //         const [status, body] = await this.#connector.makePostRequest('api/v1/signup',
    //             {first_name: firstName, last_name: lastName, login, password, repeat_pw: repeatPw})
    //             .catch((err) => console.log(err));
    //
    //         switch (status) {
    //         case 200:
    //             this.#context.authorised = true;
    //             this.#context.accountFields.account.login = body.email;
    //             this.#context.accountFields.account.firstName = body.firstName;
    //             this.#context.accountFields.account.lastName = body.lastName;
    //
    //             const notification = new Notification(document.getElementById('root'));
    //             notification.render('Вы успешно зарегестрировались!');
    //
    //             e.target.dispatchEvent(new Event('main', {bubbles: true}));
    //             break;
    //         case 403:
    //         case 401:
    //             if (body.message === 'invalid login') {
    //                 if (document.getElementById('loginError') === null) {
    //                     this.#validator.putErrorMessage(document.getElementById('login'),
    //                         'loginError', 'Некорректный логин');
    //                 }
    //             } else if (document.getElementById('passwordError') === null) {
    //                 this.#validator.putErrorMessage(document.getElementById('password'),
    //                     'passwordError', 'Пароль короче 5 символов');
    //             }
    //             break;
    //         case 409:
    //             if (document.getElementById('loginError') === null) {
    //                 this.#validator.putErrorMessage(document.getElementById('login'),
    //                     'loginError', 'Пользователь уже существует');
    //             }
    //             break;
    //         default:
    //             break;
    //         }
    //     }
    // };

    // /**
    //  * promise redirect to login page
    //  * @param {object} e - event on click redirect link
    //  */
    // onRedirectHandler = async (e) => {
    //     e.preventDefault();
    //     e.target.dispatchEvent(new Event('login', {bubbles: true}));
    // };
    //
    // /**
    //  * method register events button submit/input focus/redirect link
    //  */
    // registerEvents = () => {
    //     const form = document.getElementById('wrapper-access__form');
    //     form.addEventListener('submit', this.onSubmitHandler);
    //     form.addEventListener('focusout', this.#validator.focusValidator);
    //
    //     const redirect = document.getElementById('redirect-link');
    //     redirect.addEventListener('click', this.onRedirectHandler);
    // };
    //
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
     * method insert signup to HTML
     */
    override render = () => {

        this.context = userStore.getContext(userStore._storeNames.context);
        const context = this.context.forms.signup;
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
    };
}

