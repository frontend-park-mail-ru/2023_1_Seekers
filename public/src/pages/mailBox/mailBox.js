'use strict'

import BasePage from "../base-page.js";
import "../precompiled.js"
import Navbar from "../../components/Navbar/Navbar.js";
import Menu from "../../components/Menu/Menu.js";
import LetterList from "../../components/LetterList/LetterList.js";
import Mail from "../../components/Mail/Mail.js";

/**
 * Класс, реализующий главную страницу
 */
export default class mailBox extends BasePage{
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['mailBox.hbs'],
        );
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} context контекст отрисовки страницы
     */
    async render(context) {
        super.render(context);

        this.navbar = new Navbar(document.getElementById('header'));
        this.navbar.render(context.profile);

        this.content = document.getElementById('content');

        this.menu = new Menu(this.content);

        document.addEventListener("rerenderLetters", function(e) { // (1)
            alert("Привет от " + e.target.href); // Привет от H1
        });

        this.menu.render(context.menuButtons);


        const line1 = document.createElement('div');
        line1.classList.add('vertical-line');
        this.content.appendChild(line1);

        this.letterList = new LetterList(this.content);
        this.letterList.render(context);

        this.mail = new Mail(this.content);
        this.mail.render(context);
    }

    rerenderLetters(e) {

    }

}
