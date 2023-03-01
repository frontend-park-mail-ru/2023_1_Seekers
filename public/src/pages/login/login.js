import formComponent from '../../components/form/form.js';
import basePage from '../base-page.js';
import '../templates.js';
import Validation from "../../modules/validation.js";


export default class login extends basePage {
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['login.hbs']
        );
    }

    render(config) {
        const context = config.forms.login;
        super.render(context);

        this.formComponent = new formComponent(document.getElementById('login-form'));
        this.formComponent.render(context);


        const form = document.getElementById('login-form');
        const fields = context.fields;
        console.log(fields.email.name)
        console.log(document.getElementById(fields.email.name))
        document.getElementById(fields.email.name).focus();

        const focusValidator = async (e) => {
            const validation = new Validation()

            console.log(e.target.name)
            switch (e.target.name) {
                case 'email':
                    const email_check = validation.validateEmail(e.target.value);
                    if (!email_check.status) {
                        if(document.getElementById('emailError') !== null){
                            break
                        }
                        validation.putErrorMessage(document.getElementById(e.target.name), 'emailError', email_check.message)
                    } else if (document.getElementById('emailError') !== null) {
                        document.getElementById('emailError').remove()
                    }
                    break;

                case 'password':
                    const pass_check = validation.validatePassword(e.target.value);
                    if (!pass_check.status) {
                        if(document.getElementById('passError') !== null){
                            break
                        }
                        validation.putErrorMessage(document.getElementById(e.target.name), 'passError', pass_check.message)
                    } else if (document.getElementById('passError') !== null) {
                        document.getElementById('passError').remove()
                    }
                    break;
            }

        }

        const onSubmitHandler = async (e) => {
            const data = [];
            const validation = new Validation()

            e.preventDefault()

            Object.keys(fields).forEach((input) => {
                data.push(form.querySelector(`[name=${fields[input].name}]`));
            })

            const [email, password] = data;
            if (validation.validateRegFields(email.value, password.value)) {
                console.log("send to /login")
            }
        }


        form.addEventListener('submit', onSubmitHandler);
        form.addEventListener('focusout', focusValidator);
    }
}

