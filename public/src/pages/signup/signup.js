import {BasePage} from '../base-page.js';
import '../templates.js';
import {Validation} from '../../modules/validation.js';
import {WrapperAccess} from '../../components/wrapper-access/wrapper-access.js';

/**
 * class implementing signup page
 */
export class Signup extends BasePage {
    #validator;
    #context;

    #connector

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} context - template rendering context
     * @param {Object} connector - connector to backend
     */
    constructor(parent, context, connector) {
        super(parent, window.Handlebars.templates['signup.hbs']);

        this.#validator = new Validation();
        this.#context = context;
        this.#connector = connector;
    }

    /**
     * promise handle button submit
     * @param {object} e - event click on button submit
     */
    onSubmitHandler = async (e) => {
        const data = [];
        const validation = new Validation();
        const form = document.getElementById('wrapper-access-form');
        const fields = this.#context.forms.signup.fields;

        e.preventDefault();

        Object.keys(fields).forEach((input) => {
            data.push(form.querySelector(`[name=${fields[input].name}]`).value);
        });

        const [first_name, last_name, email, password, repeat_pw] = data;

        if (validation.validateRegFields(email, password, repeat_pw, first_name, last_name)) {
            const [status, data] = await this.#connector.makePostRequest('api/v1/signup',
                {first_name, last_name, email, password, repeat_pw})
                .catch((err) => console.log(err))

            switch (status) {
                case 200:
                    e.target.dispatchEvent(new Event('login', {bubbles: true}));
                    break;
                case 403:
                case 401:
                    if (document.getElementById('passwordError') === null) {
                        this.#validator.putErrorMessage(document.getElementById('password'),
                            'passwordError', data.message);
                    }
                    break;
                case 409:
                    if (document.getElementById('emailError') === null) {
                        console.log(data.message)
                        this.#validator.putErrorMessage(document.getElementById('email'),
                            'emailError', data.message);
                    }
                    break;
                default:
                    console.log('redirect to bad page');
                    break
            }
        }
    };

    /**
     * promise redirect to login page
     * @param {object} e - event on click redirect link
     */
    onRedirectHandler = async (e) => {
        e.preventDefault();
        e.target.dispatchEvent(new Event('login', {bubbles: true}));
    };

    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('wrapper-access-form');
        form.addEventListener('submit', this.onSubmitHandler);
        form.addEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect.addEventListener('click', this.onRedirectHandler);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('wrapper-access-form');
        form.removeEventListener('submit', this.onSubmitHandler);
        form.removeEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect.removeEventListener('click', this.onRedirectHandler);
    };

    /**
     * method insert signup to HTML
     */
    render = () => {
        const context = this.#context.forms.signup;
        super.render(context);

        this.accessComponent = new WrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);

        const fields = context.fields;
        document.getElementById(fields.firstName.name).focus();

        this.registerEvents();
    };

    /**
     * method signup page clearing
     */
    purge() {
        this.unregisterEvents();
        this.accessComponent.purge();
        document.querySelectorAll('div.main-side').forEach((e) => {
            e.remove();
        });
    }
}

