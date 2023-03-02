import '../templates.js';

export default class checkbox {
    #parent

    constructor(parent) {
        this.#parent = parent
    }
    render() {
        this.#parent.insertAdjacentHTML('beforebegin', window.Handlebars.templates['checkbox.hbs']())
    }

    purge()
    {
        document.querySelectorAll("div.remember").forEach(e => {
            e.remove()
        })
    }
}
