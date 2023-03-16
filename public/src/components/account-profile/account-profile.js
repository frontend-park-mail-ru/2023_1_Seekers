import {Form} from '../../uikit/form/form.js';
import {Button} from '../../uikit/button/button.js';
import '../templates.js';

/**
 * class implementing component account-profile
 */
export class AccountProfile {
    #parent;

    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * method prepare ctx to send in handlebars
     * @param {object} ctx - template rendering context
     * @return {Object} - form filling
     */
    prepareForm(ctx) {
        return {
            ...ctx,
        };
    }

    /**
     * method insert account-profile to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        console.log(data)
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['account-profile.hbs'](data));

        this.formComponent = new Form(document.getElementById('account-profile__form__input'));
        this.formComponent.render(ctx.profile);

        this.buttonComponent = new Button(document.getElementById('account-profile__button-area'));
        this.buttonComponent.render(ctx.profile.button);
    }

    /**
     * method account-profile page clearing
     */
    purge() {
        this.buttonComponent.purge();
        this.formComponent.purge();

        document.querySelectorAll('div.account-profile').forEach((e) => {
            e.remove();
        });
    }
}
