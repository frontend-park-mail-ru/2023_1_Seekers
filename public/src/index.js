import {Login} from './pages/login/login.js';
import {Signup} from './pages/signup/signup.js';
import {MailBox} from './pages/mailBox/mailBox.js';
import {Connector} from './modules/ajax.js';

/**
 *
 * @param {Element} root - элемент, в который добавится страница
 * @param {object} context - контекст отрисовки страницы
 * @param {object} conn - connector with backend
 */
const renderLoginPage = (root, context, conn) => {
    currentPage.purge();
    currentPage = new Login(root, config, conn);
    currentPage.render();
};

/**
 *
 * @param {Element} root - элемент, в который добавится страница
 * @param {object} context - контекст отрисовки страницы
 * @param {object} conn - connector with backend
 */
const renderMainPage = (root, context, conn) => {
    currentPage.purge();
    currentPage = new MailBox(root, context, conn);
    currentPage.render();
};

/**
 * Функция отрисовки страницы регистрации
 * @param {Element} root - элемент, в который добавится страница
 * @param {object} context - контекст отрисовки страницы
 * @param {object} conn - connector with backend
 */
const renderRegisterPage = (root, context, conn) => {
    currentPage.purge();
    currentPage = new Signup(root, config, conn);
    currentPage.render();
};

const config = {
    header: {
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderLoginPage,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderRegisterPage,
        },
        letterlist: {
            href: '/main',
            name: 'Главная',
            render: renderMainPage,
        },
    },
    forms: {
        login: {
            fields: {
                email: {
                    title: 'Логин',
                    type: 'text',
                    name: 'email',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    maxlenght: '16',
                },
            },
            windowData: {
                title: 'Авторизация',
                bottomText: 'Мы еще не знакомы?',
                bottomLink: '/signup',
                bottomLinkText: 'Регистрация',
            },
            button: {
                buttonText: 'Войти',
            },
        },
        signup: {
            fields: {
                firstName: {
                    title: 'Имя',
                    type: 'text',
                    name: 'first-name',
                    maxlenght: '30',
                },
                lastName: {
                    title: 'Фамилия',
                    type: 'text',
                    name: 'last-name',
                    maxlenght: '30',
                },
                email: {
                    title: 'Логин',
                    type: 'text',
                    name: 'email',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    maxlenght: '16',
                },
                repeatPassword: {
                    title: 'Повторить пароль',
                    type: 'password',
                    name: 'repeat_password',
                    maxlenght: '16',
                },
            },
            windowData: {
                title: 'Регистрация',
                bottomText: 'Мы уже знакомы?',
                bottomLink: '/login',
                bottomLinkText: 'Войти',
            },
            button: {
                buttonText: 'Создать',
            },
        },
    },
    authorised: false,
};

const root = document.getElementById('root');

const conn = new Connector('http://89.208.197.150', 8001, {
    'Content-Type': 'application/json',
    'accept': 'application/json',
});

addEventListener('main', (e) => renderMainPage(root, config, conn));
addEventListener('login', (e) => renderLoginPage(root, config, conn));
addEventListener('signup', (e) => renderRegisterPage(root, config, conn));
let currentPage = new MailBox(root, config, conn);
currentPage.render();
