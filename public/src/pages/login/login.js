import {BasePage} from '../base-page.js';
import '../templates.js';
import {Validation} from '../../modules/validation.js';
import {WrapperAccess} from '../../components/wrapper-access/wrapper-access.js';
import {Checkbox} from '../../uikit/checkbox/checkbox.js';

/**
 * class implementing login page
 */
export class Login extends BasePage {
    /**
     * Private field that contains a form validator
     */
    #validator;

    /**
     * Private field that contains request worker
     */
    #connector;

    /**
     * information for configuring page
     */
    #context;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} context - template rendering context
     * @param {Object} connector - connector to backend
     */
    constructor(parent, context, connector) {
        super(
            parent,
            window.Handlebars.templates['login.hbs'],
        );
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
        const form = document.getElementById('wrapper-access-form');
        const fields = this.#context.forms.login.fields;

        e.preventDefault();

        Object.keys(fields).forEach((input) => {
            data.push(form.querySelector(`[name=${fields[input].name}]`).value);
        });

        data.push(form.querySelector(`[name='remember']`).checked)

        const [email, password, remember] = data;

        if (this.#validator.validateRegFields(email, password)) {
            const [status, data] = await this.#connector.makePostRequest('api/v1/signin', {email, password, remember})
                .catch((err) => console.log(err))

            switch (status) {
                case 200:
                    this.#context.authorised = true;
                    e.target.dispatchEvent(new Event('main', {bubbles: true}));
                    break;
                case 401:
                    if (document.getElementById('passwordError') === null) {
                        this.#validator.putErrorMessage(document.getElementById('password'),
                            'passwordError', data.message);
                    }
                    break;
                default:
                    console.log('redirect to bad page');
                    break
            }
        }
    };

    /**
     * promise redirect to signup page
     * @param {object} e - event click on redirect link
     */
    onRedirectHandler = async (e) => {
        e.preventDefault();
        e.target.dispatchEvent(new Event('signup', {bubbles: true}));
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
     * method insert login to HTML
     */
    render = () => {
        const context = this.#context.forms.login;
        super.render(context);

        this.accessComponent = new WrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);

        this.checkboxComponent = new Checkbox(document.getElementById('wrapper-input-button'));
        this.checkboxComponent.render();

        const fields = context.fields;
        document.getElementById(fields.email.name).focus();

        this.registerEvents();
    };

    /**
     * method login page clearing
     */
    purge() {
        this.unregisterEvents();
        this.accessComponent.purge();
        this.checkboxComponent.purge();
        document.querySelectorAll('div.page').forEach((e) => {
            e.remove();
        });
    }
}

