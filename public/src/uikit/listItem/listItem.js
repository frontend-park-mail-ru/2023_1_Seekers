import '../templates.js';

/**
 * class implementing component listItem
 */
export class ListItem {
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
        console.log(ctx)
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['listItem.hbs'](data));
    }

    /**
     * method listItem page clearing
     */
    purge() {
        document.querySelectorAll('div.input-form').forEach((e) => {
            e.remove();
        });
    }
}
