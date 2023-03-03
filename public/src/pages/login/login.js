import basePage from '../base-page.js';
import '../templates.js';
import {Validation} from '../../modules/validation.js';
import {WrapperAccess} from '../../components/wrapper-access/wrapper-access.js';
import {Checkbox} from '../../uikit/checkbox/checkbox.js';
import Request from "../../modules/ajax.js";

/**
 * class implementing login page
 */
export default class Login extends basePage {
    #validator;
    #context;

    #req

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

        this.#req = new Request('http://89.208.197.150', 8001, {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Origin': 'http://localhost:8002/',
        });
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
            data.push(form.querySelector(`[name=${fields[input].name}]`).value);
        });

        const [email, password] = data;
        console.log(email, password)

        if (validation.validateRegFields(email, password)) {
            // const [status] = await this.#req.makePostRequest('api/v1/signin', {email, password})
            //     .catch((err) => console.log(err))
            //
            // switch (status)
            // {
            //     case 200:
            //         this.#context.authorised = true;
            //         e.target.dispatchEvent(new Event('main', {bubbles: true}));
            //         break;
            //     default:
            //
            // }
            // console.log(status)

            this.#context.authorised = true;

            //
            // this.purge();
            e.target.dispatchEvent(new Event('main', {bubbles: true}));
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

