import {Form} from '../../uikit/form/form.js';
import {Button} from '../../uikit/button/button.js';
import '../templates.js';

/**
 * class implementing component wrapper-access
 */
export class WrapperAccess {
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
     * method insert wrapper-access(signup and login) to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        const data = this.prepareForm(ctx.windowData);
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['wrapper-access.hbs'](data));

        this.formComponent = new Form(document.getElementById('wrapper-access__form'));
        this.formComponent.render(ctx);

        this.buttonComponent = new Button(document.getElementById('wrapper-access__form'));
        this.buttonComponent.render(ctx.button);
    }

    /**
     * method wrapper-access(signup and login) page clearing
     */
    purge() {
        this.buttonComponent.purge();
        this.formComponent.purge();

        document.querySelectorAll('div.wrapper-access').forEach((e) => {
            e.remove();
        });
    }
}
