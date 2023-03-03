'use strict';

import BasePage from '../base-page.js';
import '../templates.js';
import {Navbar} from '../../components/navbar/navbar.js';
import {LetterList} from '../../components/letterList/letterList.js';
import {Mail} from '../../components/mail/mail.js';
import Request from "../../modules/ajax.js";

const context = {
    profile: {
        profileAvatar: './img/female-avatar.svg',
    },

    messages: [
        {
            message_id: 3,
            from_user: 'gena@example.com',
            creating_date: '2023-01-29',
            title: 'Title3',
            text: 'Text3',
            read: false,
            favorite: false,
        },
        {
            message_id: 4,
            from_user: 'max@example.com',
            creating_date: '2023-01-01',
            title: 'Title4',
            text: 'Text4',
            read: false,
            favorite: false,
        },
        {
            message_id: 8,
            from_user: 'valera@example.com',
            creating_date: '2023-01-29',
            title: 'Title6',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false,
        },
        {
            message_id: 5,
            from_user: 'gena@example.com',
            creating_date: '2023-01-29',
            title: 'Title5',
            text: 'Text5',
            read: false,
            favorite: false,
        },
        {
            message_id: 5,
            from_user: 'ivan@example.com',
            creating_date: '2023-01-29',
            title: 'Title5',
            text: 'Lorem ipsum dolor sit amet',
            read: false,
            favorite: false,
        },

        {
            message_id: 6,
            from_user: 'valera@example.com',
            creating_date: '2023-01-29',
            title: 'Title6',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false,
        },
        {
            message_id: 9,
            from_user: 'valera@example.com',
            creating_date: '2023-01-29',
            title: 'Title6',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false,
        },
        {
            message_id: 10,
            from_user: 'valera@example.com',
            creating_date: '2023-01-29',
            title: 'Title6',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false,
        },
    ],
};

context.messages.forEach((message) => {
    message.img = 'img/female-avatar.svg';
});

/**
 * class implementing mailBox
 */
export default class MailBox extends BasePage {
    /**
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    /**
     * Private field that contains HTML-elements that inside of current element
     * @type {{}}
     */
    #childs = {};

    #req

    #context;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} config - template rendering context
     */
    constructor(parent, config) {
        super(
            parent,
            window.Handlebars.templates['mailBox.hbs'],
        );

        this.#context = config;
        this.#req = new Request('http://89.208.197.150', 8001, {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Origin': 'http://localhost:8002/',
        });
    }

    /**
     * method register events button submit and input focus
     */
    registerEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            child.registerEventListener();
        });

        addEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        Object.values(this.#childs).forEach((child) => {
            if (child.hasOwnProperty('unregisterEventListener')) {
                child.unregisterEventListener();
            }
        });

        removeEventListener('toMainPage', this.eventCatcher);
    };

    /**
     * promise redirect to login page TODO:help
     * @param {object} e - event click on button logout
     */
    eventCatcher = (e) => {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length);

        if (rel === '/logout') {
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return;
        }
        console.log('something is wrong!');
    };

    getLetterList = () => {
        const [status, data] = this.#req.makeGetRequest('api/v1/inbox')
            .catch((err) => console.log(err))

        return [status, data];
    }

    /**
     * method insert mailbox to HTML
     */
    render = () => {
        super.render({});
        this.#element = document.getElementsByClassName('page')[0];

        // let [status, data] = this.getLetterList();

        // if (status === 401) {
        //     this.#element.dispatchEvent(new Event('login', {bubbles: true}))
        // } else if (status !== 200) {
        //     console.log('unexpected error!');
        // }

        this.#childs['navbar'] = new Navbar(this.#element);
        this.#childs['navbar'].render(context.profile);

        this.content = document.createElement('div');
        this.content.classList.add('content');
        this.#element.appendChild(this.content);


        this.#childs['letterList'] = new LetterList(this.content);
        this.#childs['letterList'].render(context.messages);

        this.#childs['mail'] = new Mail(this.content);
        this.#childs['mail'].render();

        this.registerEventListener();
    };

    /**
     * method mailbox page clearing
     */
    purge = () => {
        this.unregisterEventListener();
        Object.values(this.#childs).forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    };
}
