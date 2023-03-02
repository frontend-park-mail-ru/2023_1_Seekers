import "../precompiled.js"


/**
 * Класс для реализации компонента LetterFrame
 */
export default class Menu {
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
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['Menu.hbs'](context));

        this.buttons = [...this.#parent.getElementsByClassName('menu-button')];
        this.buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                    e.preventDefault()
                    button.dispatchEvent(new Event("rerenderLetters", {bubbles: true}))

                }
            )
        })
    }
}