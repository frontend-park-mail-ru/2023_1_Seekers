import '../templates.js';

export default class checkbox {
    #parent

    constructor(parent) {
        this.#parent = parent
    }
    render() {
        this.#parent.insertAdjacentHTML('beforebegin', window.Handlebars.templates['checkbox.hbs']())
    }
}
