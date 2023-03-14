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
                login: {
                    title: 'Логин',
                    type: 'text',
                    name: 'login',
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
                login: {
                    title: 'Логин',
                    type: 'text',
                    name: 'login',
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
    menuButtons: [
        {
            img: `<svg class="menu-button-icon" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                            0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                            2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>`,
            href: '/inbox',
            text: 'Входящие',
            count: '10',
        },
        {
            img: `<svg class="menu-button-icon" fill="none" height="100%" viewBox="0 0 24 24" width="100%"
     xmlns="http://www.w3.org/2000/svg">
    <path d="m12 19 9 2-9-18-9 18zm0 0v-8" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2"/>
</svg>`,
            href: '/outbox',
            text: 'Исходящие',
            count: '',
        }
    ],
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
