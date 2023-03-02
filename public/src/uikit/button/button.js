import '../templates.js';
export default class button
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
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['button.hbs'](data))
    }
}
