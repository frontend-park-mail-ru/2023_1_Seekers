import '../templates.js';

export default class button {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(ctx) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['button.hbs'](ctx));
    }

    purge() {
        document.querySelectorAll('button.button-long.b-color').forEach((e) => {
            e.remove();
        });
    }
}
