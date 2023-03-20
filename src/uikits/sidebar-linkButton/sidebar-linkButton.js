import '../templates.js';

/**
 * class implementing component sidebar-linkButton
 */
export class SidebarLinkButton {
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
        this.#parent.insertAdjacentHTML('beforebegin', window.Handlebars.templates['sidebar-linkButton.hbs'](data));
    }

    /**
     * method sidebar-linkButton page clearing
     */
    purge() {
        document.querySelectorAll('a.account-sidebar__item').forEach((e) => {
            e.remove();
        });
    }
}
