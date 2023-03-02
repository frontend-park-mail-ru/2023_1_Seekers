import "../precompiled.js"


/**
 * Класс для реализации компонента Navbar
 */
export default class Navbar {
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
            window.Handlebars.templates['Navbar.hbs'](context));

        this.childs = [...this.#parent.getElementsByClassName('icon-button')];
        console.log(this.childs);
        this.element = this.#parent.getElementsByClassName('navbar')[0];
    }

    registerEventListener() {
        this.childs.forEach(child => {
            child.addEventListener('click', (e) => {
                    e.preventDefault()
                    child.dispatchEvent(new Event('toMainPage', {bubbles: true}))
                }
            )
        })
    }

    unregisterEventListener() {
        this.childs.forEach(child => {
            child.removeEventListener('click')
        })
    }

    purge() {
        this.element.remove();
    }
}