import basePage from '../base-page.js';
import '../templates.js';
import Validation from "../../modules/validation.js";
import wrapperAccess from "../../components/wrapper-access/wrapper-access.js";
import checkboxComponent from "../../uikit/checkbox/checkbox.js";


export default class login extends basePage {

    #validator
    #context

    constructor(parent, context) {
        super(
            parent,
            window.Handlebars.templates['login.hbs']
        );
        this.#validator = new Validation()
        this.#context = context
    }

    onSubmitHandler = async (e) => {
        const data = [];
        const validation = new Validation()
        const form = document.getElementById('wrapper-access-form');
        const fields = this.#context.forms.login.fields;

        e.preventDefault()

        Object.keys(fields).forEach((input) => {
            data.push(form.querySelector(`[name=${fields[input].name}]`));
        })

        const [email, password] = data;
        if (validation.validateRegFields(email.value, password.value)) {
            console.log("send to /main")
            e.target.dispatchEvent(new Event("main", {bubbles: true}));
            // this.purge()
        }
    }

    onRedirectHandler = async (e) => {
        e.preventDefault()
        console.log("send to /signup")
        e.target.dispatchEvent(new Event("signup", {bubbles: true}));
    }

    render() {
        const context = this.#context.forms.login;
        super.render(context);

        this.accessComponent = new wrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);


        this.checkboxComponent = new checkboxComponent(document.getElementById('wrapper-input-button'));
        this.checkboxComponent.render();

        const form = document.getElementById('wrapper-access-form');
        const fields = context.fields;
        document.getElementById(fields.email.name).focus();

        this.registerEvents();
    }

    registerEvents = () =>
    {
        const form = document.getElementById('wrapper-access-form');
        form.addEventListener('submit', this.onSubmitHandler);
        form.addEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect.addEventListener('click', this.onRedirectHandler);
    }

    unregisterEvents = () =>
    {
        const form = document.getElementById('wrapper-access-form');
        form.removeEventListener('submit', this.onSubmitHandler);
        form.removeEventListener('focusout', this.#validator.focusValidator);

        const redirect = document.getElementById('redirect-link');
        redirect.removeEventListener('click', this.onRedirectHandler);
    }

    purge()
    {
        console.log('purge login')
        this.unregisterEvents();
        this.accessComponent.purge();
        this.checkboxComponent.purge();
        document.querySelectorAll("div.page").forEach(e => {
            e.remove()
        })
    }

    purgeChild()
    {
        this.unregisterEvents();
        this.checkboxComponent.purge();
        this.accessComponent.purge();
    }
}

