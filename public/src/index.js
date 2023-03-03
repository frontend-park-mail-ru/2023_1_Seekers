import Login from './pages/login/login.js';
import Signup from './pages/signup/signup.js';
import MailBox from './pages/mailBox/mailBox.js';
import Connector from "./modules/ajax.js";

const root = document.getElementById('root');
/**
 *
 * @param {object} context - контекст отрисовки страницы
 * @param {object} conn - connector with backend
 */
const renderLoginPage = (context, conn) => {
    const page = new Login(root, context, conn);
    page.render(context);
};

const renderMainPage = () => {
    currentPage.purge();
    currentPage = new MailBox(root, config);
    console.log('to list');
    currentPage.render();
}
/**
 * Функция отрисовки страницы регистрации
 * @param {object} context - контекст отрисовки страницы
 * @param {object} conn - connector with backend
 */
const renderRegisterPage = (context, conn) => {
    const page = new Signup(root, context, conn);
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

// config.header.signup.render(config);

const conn = new Connector('http://89.208.197.150', 8001, {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Origin': 'http://localhost:8002/',
});

const mailBoxO = new MailBox(root);
const loginO = new Login(root, config, conn);
const signupO = new Signup(root, config, conn);

addEventListener('main', (e) =>{
    currentPage.purge();
    currentPage = mailBoxO;
    console.log('to list');
    mailBoxO.render(context);
});

addEventListener('login', (e) =>{
    currentPage.purge();
    currentPage = loginO;
    console.log('to signup');
    currentPage.render();
});

addEventListener('signup', (e) =>{
    currentPage.purge();
    currentPage = signupO;
    console.log('to signup');
    currentPage.render();
});


let currentPage = loginO;
currentPage.render();


// import MailBox from './pages/mailBox/mailBox.js';
//
//
// const root = document.getElementById('root');


//
// const mailBox = new MailBox(root);
// mailBox.render(context);
//
// mailBox.registerEventListener();
//
// addEventListener('toAnotherPage', e => {
//     console.log('to another')
// })
//
// class PageChanger{
//
//     initPages() {
//         this.pages = {};
//         this.pages['mainPage'] = new MailBox(root);
//         // this.pages['auth'] = new Auth(root);
//
//         addEventListener('toAnotherPage', e => {
//             mailBox.unregisterEventListener();
//         })
//
//     }
//
//
// }
