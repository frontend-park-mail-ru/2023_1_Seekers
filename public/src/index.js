import login from "./pages/login/login.js";
import signup from "./pages/signup/signup.js";

const root = document.getElementById('root');

const renderLoginPage = (context) => {
    const page = new login(root);
    page.render(context);
};

/**
 * Функция отрисовки главной страницы
 * @param {object} context контекст отрисовки страницы
 */
const renderLetterListPage = (context) => {
    // const mainPage = new MainPage(root);
    // mainPage.render(context);
};

/**
 * Функция отрисовки страницы регистрации
 * @param {object} context контекст отрисовки страницы
 */
const renderRegisterPage = (context) => {
    const page = new signup(root, context);
    page.render();
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
            href: '/letterlist',
            name: 'Главная',
            render: renderLetterListPage,
        },
    },
    forms: {
        login: {
            fields: {
                email: {
                    title: 'Логин',
                    type: 'email',
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
                    type: 'email',
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

config.header.signup.render(config);
