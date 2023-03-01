import login from "./pages/login/login.js";

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
    // const registerPage = new RegisterPage(root);
    // registerPage.render(context);
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
                    value: '',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    maxlenght: '16',
                },
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
        },
    },
    authorised: false,
};
config.header.login.render(config);
