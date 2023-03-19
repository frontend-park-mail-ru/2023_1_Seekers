import { View } from '@views/view';
import { Validation } from '@utils/validation'
import template from '@views/login-page/login-page.hbs'

import userStore from '@stores/user-store'
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
        console.log('hello from login page constructor')
        this.#validator = new Validation();
    }

    // /**
    //  * promise handle button submit
    //  * @param {object} e - event click on button submit
    //  */
    // onSubmitHandler = async (e) => {
    //     const data = [];
    //     const form = document.getElementById('wrapper-access__form');
    //     const fields = this.#context.forms.login.fields;
    //
    //     e.preventDefault();
    //
    //     Object.keys(fields).forEach((input) => {
    //         data.push(form.querySelector(`[name=${fields[input].name}]`).value);
    //     });
    //
    //
    //     const [login, password] = data;
    //
    //     if (this.#validator.validateRegFields(login, password)) {
    //         const [status, body] =
    //             await this.#connector.makePostRequest('api/v1/signin', {login, password})
    //                 .catch((err) => console.log(err));
    //
    //         switch (status) {
    //             case 200:
    //                 this.#context.authorised = true;
    //                 this.#context.accountFields.account.login = body.email;
    //                 this.#context.accountFields.account.firstName = body.firstName;
    //                 this.#context.accountFields.account.lastName = body.lastName;
    //
    //                 e.target.dispatchEvent(new Event('main', {bubbles: true}));
    //                 break;
    //             case 401:
    //                 if (body.message === 'invalid login') {
    //                     if (document.getElementById('loginError') === null) {
    //                         this.#validator.putErrorMessage(document.getElementById('login'),
    //                             'loginError', 'Некорректный логин');
    //                     }
    //                 } else if (document.getElementById('passwordError') === null) {
    //                     this.#validator.putErrorMessage(document.getElementById('password'),
    //                         'passwordError', 'Неправильный пароль');
    //                 }
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // };
    //
    // /**
    //  * promise redirect to signup page
    //  * @param {object} e - event click on redirect link
    //  */
    // onRedirectHandler = async (e) => {
    //     e.preventDefault();
    //     e.target.dispatchEvent(new Event('signup', {bubbles: true}));
    // };

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
     * method insert login to HTML
     */
    override render = () => {
        console.log('hello from render login page')
        this.context = userStore.getContext(userStore._storeNames.context);
        console.log(this.context)
        // super.render(context);




    };

    /**
     * method login page clearing
     */
    // purge() {
    //     this.unregisterEvents();
    //     this.accessComponent.purge();
    //     document.querySelectorAll('div.page').forEach((e) => {
    //         e.remove();
    //     });
    // }
}

