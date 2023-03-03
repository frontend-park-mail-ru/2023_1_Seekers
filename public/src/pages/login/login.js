import basePage from '../base-page.js';
import '../templates.js';
import {Validation} from '../../modules/validation.js';
import {WrapperAccess} from '../../components/wrapper-access/wrapper-access.js';
import {Checkbox} from '../../uikit/checkbox/checkbox.js';

/**
 * class implementing login page
 */
export default class Login extends basePage {
    #validator;
    #context;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} context - template rendering context
     */
    constructor(parent, context) {
        super(
            parent,
            window.Handlebars.templates['login.hbs'],
        );
        this.#validator = new Validation();
        this.#context = context;
    }

    /**
     * promise handle button submit
     * @param {object} e - event click on button submit
     */
    onSubmitHandler = async (e) => {
        const data = [];
        const validation = new Validation();
        const form = document.getElementById('wrapper-access-form');
        const fields = this.#context.forms.login.fields;

        e.preventDefault();

        Object.keys(fields).forEach((input) => {
            data.push(form.querySelector(`[name=${fields[input].name}]`));
        });

        const [email, password] = data;
        if (validation.validateRegFields(email.value, password.value)) {
            e.target.dispatchEvent(new Event('main', {bubbles: true}));
            // this.purge()
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
    render() {
        const context = this.#context.forms.login;
        super.render(context);

        this.accessComponent = new WrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);

        this.checkboxComponent = new Checkbox(document.getElementById('wrapper-input-button'));
        this.checkboxComponent.render();

        const fields = context.fields;
        document.getElementById(fields.email.name).focus();

        this.registerEvents();
    }

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

