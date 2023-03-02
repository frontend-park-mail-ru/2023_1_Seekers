import '../templates.js';


/**
 * Класс для реализации компонента letterList
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
            window.Handlebars.templates['letterList.hbs'](context));

        this.element = this.#parent.getElementsByClassName('LetterList')[0];
        this.elements = this.element.getElementsByClassName('letter-frame');
    }

    /**
     * method letterList page clearing
     */
    purge() {
        this.element.remove();
    }

    /**
     * method register TODO:why emtpy?
     */
    registerEventListener() {
    }

    /**
     * method unregister TODO:why emtpy?
     */
    unregisterEventListener() {
    }
}
