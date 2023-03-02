import basePage from '../base-page.js';
import '../templates.js';
import Validation from "../../modules/validation.js";
import wrapperAccess from "../../components/wrapper-access/wrapper-access.js";


export default class signup extends basePage {
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['signup.hbs']
        );
    }

    render(config) {
        const context = config.forms.signup;
        super.render(context);

        this.accessComponent = new wrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);


        const form = document.getElementById('wrapper-access-form');
        const fields = context.fields;
        document.getElementById(fields.firstName.name).focus();


        const onSubmitHandler = async (e) => {
            const data = [];
            const validation = new Validation()

            e.preventDefault()

            Object.keys(fields).forEach((input) => {
                data.push(form.querySelector(`[name=${fields[input].name}]`));
            })

            const [name, surname, email, password, anotherPassword] = data;
            if (validation.validateRegFields(email.value, password.value, anotherPassword.value, name.value, surname.value)) {
                console.log("send to /signup")
            }
        }

        const validation = new Validation()
        form.addEventListener('submit', onSubmitHandler);
        form.addEventListener('focusout', validation.focusValidator);
    }
}

