import '../templates.js';
import {ListItem} from "../../uikit/list-item/list-item.js";

/**
 * class implementing component PromoBox
 */
export class PromoBox {
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
     * method insert PromoBox to HTML
     * @param {Object} ctx - template rendering context
     */
    render(ctx) {
        const data = this.prepareForm(ctx);

        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['promo-box.hbs'](data));

        this.list = new ListItem(document.getElementById('promo-box__list'));
        this.list.render(ctx);
    }

    /**
     * method promo-box page clearing
     */
    purge() {
        document.querySelectorAll('div.promo-box').forEach((e) => {
            e.remove();
        });
    }
}
