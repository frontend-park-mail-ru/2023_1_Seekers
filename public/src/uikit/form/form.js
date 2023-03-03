import '../templates.js';

/**
 * class implementing component input form
 */
export class form {
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
            field: {...ctx.fields},
        };
    }

    /**
     * method insert form to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        const data = this.prepareForm(ctx);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['form.hbs'](data));
    }

    /**
     * method form page clearing
     */
    purge() {
        document.querySelectorAll('div.wrapper-input').forEach((e) => {
            e.remove();
        });
    }
}
