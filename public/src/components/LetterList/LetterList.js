import "../precompiled.js"


/**
 * Класс для реализации компонента LetterList
 */
export default class LetterList {
    /**
     * Приватное поле класса, хранящее parent HTML-элемент
     * @type {Element}
     */
    #parent;

    /**
     * Конструктор, создающий класс компонента menuButton
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['LetterList.hbs'](context));
    }
}