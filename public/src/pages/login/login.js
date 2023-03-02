import basePage from '../base-page.js';
import '../templates.js';
import Validation from "../../modules/validation.js";
import wrapperAccess from "../../components/wrapper-access/wrapper-access.js";
import checkboxComponent from "../../uikit/checkbox/checkbox.js";


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

        this.accessComponent = new wrapperAccess(document.getElementById('main-side'));
        this.accessComponent.render(context);


        this.checkboxComponent = new checkboxComponent(document.getElementById('wrapper-input-button'));
        this.checkboxComponent.render();

        const form = document.getElementById('wrapper-access-form');
        const fields = context.fields;
        document.getElementById(fields.email.name).focus();



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
                this.purge()
            }
        }


        const validation = new Validation()
        form.addEventListener('focusout', validation.focusValidator);
        form.addEventListener('submit', onSubmitHandler);
    }

    purge()
    {
        this.unregisterEvents();
        this.accessComponent.purge();
        this.checkboxComponent.purge();
        document.querySelectorAll("div.main-side").forEach(e => {
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

