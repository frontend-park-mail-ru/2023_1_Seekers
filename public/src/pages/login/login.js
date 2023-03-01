import formComponent from '../../components/form/form.js';
import basePage from '../base-page.js';
import '../templates.js';


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

    }
}

