import Login from './pages/login/login.js';
import Signup from './pages/signup/signup.js';
import MailBox from './pages/mailBox/mailBox.js';

const root = document.getElementById('root');

const renderLoginPage = () => {
    currentPage.purge();
    currentPage = new Login(root, config);
    console.log('to login');
    currentPage.render();
}

const renderMainPage = () => {
    currentPage.purge();
    currentPage = new MailBox(root, config);
    console.log('to list');
    currentPage.render();
}

const renderRegisterPage = () => {
    currentPage.purge();
    currentPage = new Signup(root, config);
    console.log('to signup');
    currentPage.render();
}

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

addEventListener('main', (e) => renderMainPage());
addEventListener('login', (e) => renderLoginPage());
addEventListener('signup', (e) => renderRegisterPage());

let currentPage = new MailBox(root, config);
currentPage.render();




