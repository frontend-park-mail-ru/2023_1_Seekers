import formComponent from '../../uikit/form/form.js';
import buttonComponent from '../../uikit/button/button.js';
import '../templates.js';

export default class wrapperAccess {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }
    prepareForm(ctx) {
        return {
            ...ctx,
        };
    }

    render(config) {
        const data = this.prepareForm(config.windowData);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['wrapper-access.hbs'](data));

        this.formComponent = new formComponent(document.getElementById('wrapper-access-form'));
        this.formComponent.render(config);

        this.buttonComponent = new buttonComponent(document.getElementById('wrapper-input-button'));
        this.buttonComponent.render(config.button);
    }

    purge() {
        this.buttonComponent.purge();
        this.formComponent.purge();

        document.querySelectorAll('div.wrapper-access').forEach((e) => {
            e.remove();
        });
    }

    purgeChild() {
        this.buttonComponent.purge();
        this.formComponent.purge();
    }
}
