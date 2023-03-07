import '../templates.js';
import {LetterFrame} from '../../uikit/letter-frame/letter-frame.js';

/**
 * class implementing component LetterList
 */
export class LetterList {
    /**
     * Private field that contains parent HTML-element
     * @type {Element}
     */
    #parent;

    /**
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    /**
     * Private field that contains current HTML-element
     * @type {Object[]}
     */
    #childs = [];

    /**
     * Constructor that creates a component class menuButton
     * @param {Element} parent HTML element into which
     * will be rendered current element
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * A method that draws a component into a parent HTML element
     * according to a given template and context
     * @param {Object} context pattern rendering context
     */
    render(context) {
        this.#parent.insertAdjacentHTML('beforeend',
            window.Handlebars.templates['letterList.hbs'](context));

        this.#element = this.#parent.getElementsByClassName('letterList')[0];

        context.forEach((e) => {
            const letterFrame = new LetterFrame(this.#element);
            letterFrame.render(e);
            this.#childs.push(letterFrame);

            const line = document.createElement('div');
            line.classList.add('horizontal-line');
            this.#element.appendChild(line);
        });
    }

    /**
     * method letterList page clearing
     */
    purge() {
        this.#childs.forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    }

    /**
     * method register NOT IMPLEMENTED
     * will register listeners for each letter-frame in letter-list
     */
    registerEventListener() {
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will unregister listeners for each letter-frame in letter-list
     */
    unregisterEventListener() {
    }
}
