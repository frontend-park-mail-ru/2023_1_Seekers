'use strict'

import BasePage from "../base-page.js";
import "../precompiled.js"
import Navbar from "../../components/Navbar/Navbar.js";
import LetterList from "../../components/LetterList/LetterList.js";
import Mail from "../../components/Mail/Mail.js";

/**
 * Класс, реализующий главную страницу
 */
export default class mailBox extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['mailBox.hbs'],
        );

        this.childs = {}
    }

    registerEventListener() {
        Object.entries(this.childs).forEach(([_, child]) => {
            child.registerEventListener();
        })

        addEventListener('toMainPage', this.eventCatcher)
    }

    unregisterEventListener() {
        Object.entries(this.childs).forEach(([_, child]) => {
            if (child.hasOwnProperty('unregisterEventListener')) {
                child.unregisterEventListener();
            }
        })

        removeEventListener('toMainPage', this.eventCatcher)
    }

    eventCatcher(e) {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length)

        if (rel === '/logout') {
            e.target.dispatchEvent(new Event("toAnotherPage", {bubbles: true}));
            return;
        }
        console.log("something is wrong!");
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} context контекст отрисовки страницы
     */
    async render(context) {
        super.render(context);
        this.element = document.getElementById('main-page');

        this.childs['navbar'] = new Navbar(this.element);
        this.childs['navbar'].render(context.profile);

        this.content = document.createElement('div');
        this.content.classList.add('content');
        this.element.appendChild(this.content);

        this.childs['letterList'] = new LetterList(this.content);
        this.childs['letterList'].render(context);

        this.childs['mail'] = new Mail(this.content);
        this.childs['mail'].render(context);
    }

    purge() {
        Object.entries(this.childs).forEach(([_, child]) => {
            child.purge();
        })
        this.element.remove();
    }
}
