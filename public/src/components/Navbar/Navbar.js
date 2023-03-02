import "../templates.js"


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

    eventCatcher = (e) => {
        console.log(e.currentTarget)
        console.log('click')
        e.preventDefault()
        e.currentTarget.dispatchEvent(new Event('toMainPage', {bubbles: true}))
    }

    registerEventListener() {
        console.log('register navbar')
        this.childs.forEach(child => {
            child.addEventListener('click', this.eventCatcher)
        })

    }

    unregisterEventListener() {
        this.childs.forEach(child => {
            child.removeEventListener('click', this.eventCatcher);
        })
    }

    purge() {
        this.unregisterEventListener();
        this.element.remove();
    }
}