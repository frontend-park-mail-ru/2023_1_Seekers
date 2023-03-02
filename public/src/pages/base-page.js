/**
 * Базовый класс для реализации страницы.
 */
export default class BasePage {
    #parent;
    #template;

    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {any} data контекст данных для страницы
     */
    render(data) {
        this.#parent.innerHTML = this.#template(data);
    }
}
