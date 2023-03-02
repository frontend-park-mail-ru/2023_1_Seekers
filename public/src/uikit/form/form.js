import '../templates.js';
export default class form
{
    #parent

    constructor(parent)
    {
        this.#parent = parent
    }

    prepareForm(ctx)
    {
        return {
            field: {...ctx.fields}
        };
    }

    render(ctx)
    {
        const data = this.prepareForm(ctx)
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['form.hbs'](data))
    }

    purge()
    {
        document.querySelectorAll("div.wrapper-input").forEach(e => {
            e.remove()
        })
    }
}
