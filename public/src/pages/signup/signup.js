import basePage from '../base-page.js';
import '../templates.js';
import Validation from "../../modules/validation.js";
import wrapperAccess from "../../components/wrapper-access/wrapper-access.js";


export default class signup extends basePage {

    #validator
    #context
    constructor(parent, context) {
        super(
            parent,
            window.Handlebars.templates['signup.hbs']
        );

        this.#validator  = new Validation();
        this.#context = context
    }

    onSubmitHandler = async (e) => {
        const data = [];
        const validation = new Validation()
        const form = document.getElementById('wrapper-access-form');
        const fields = this.#context.forms.signup.fields;

        e.preventDefault()

        Object.keys(fields).forEach((input) => {
            data.push(form.querySelector(`[name=${fields[input].name}]`));
        })

        const [name, surname, email, password, anotherPassword] = data;
        console.log(email.value, password.value, anotherPassword.value, name.value, surname.value)
        if (validation.validateRegFields(email.value, password.value, anotherPassword.value, name.value, surname.value)) {
            console.log("send to /signup")
            this.purge()
        }
    }

    registerEvents = () =>
    {
        const form = document.getElementById('wrapper-access-form');
        form.addEventListener('submit', this.onSubmitHandler);
        form.addEventListener('focusout', this.#validator.focusValidator);
    }

    unregisterEvents = () =>
    {
        const form = document.getElementById('wrapper-access-form');
        form.removeEventListener('submit', this.onSubmitHandler);
        form.removeEventListener('focusout', this.#validator.focusValidator);
    }

    render = () =>
    {
        const context = this.#context.forms.signup;
        super.render(context);

        this.accessComponent = new wrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);

        const fields = context.fields;
        document.getElementById(fields.firstName.name).focus();

        this.registerEvents();
    }

    purge()
    {
        this.unregisterEvents();
        this.accessComponent.purge();
        document.querySelectorAll("div.main-side").forEach(e => {
            e.remove()
        })
    }

    purgeChild()
    {
        this.unregisterEvents();
        this.accessComponent.purge();
    }
}

