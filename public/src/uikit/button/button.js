import '../templates.js';

export default class button {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render(ctx) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['button.hbs'](ctx))
    }
}
