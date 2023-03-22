export class View  {
    parent: Element;
    readonly #template;

    /**
     *
     * @param  parent HTML-element for including content
     * @param  template - template rendering context
     */
    constructor(parent: Element, template: HandlebarsTemplateDelegate) {
        this.parent = parent;
        this.#template = template;
    }

    /**
     * method insert base page to HTML
     * @param data data context
     */
    render(data: object) {
        this.parent.innerHTML += this.#template(data);
    }
}
