'use strict';

const prefixApi = 'api/v1/';

export const ROOT: Element = document.getElementById('root')!;

// export const routes = [
//     { path: '/', view: mainPage },
//     { path: '/login/', view: login },
//     { path: '/signup/', view: signup },
// ];

// export const privateRoutes = [
//     { path: '/profile/', view: profile },
// ];

export const responseStatuses = {
    OK: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
};



export const config = {
    basePath: 'http://127.0.0.1',
    basePort: '8001',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
    href: {
        main: '/',
        login: '/login',
        signup: '/signup',
        logout: '/logout',
        profile: '/profile',
        notFound: '/notfound'
    },
    api: {
        login: `${prefixApi}login`,
        signup: `${prefixApi}signup`,
        logout: `${prefixApi}logout`,
        // session: `${prefixApi}session`,
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
                title: 'Вход в «MailBox»',
                bottomText: 'Мы еще не знакомы?',
                bottomLink: '/signup',
                bottomLinkText: 'Регистрация',
            },
            button: {
                buttonText: 'Войти',
            },
            promoBox: {
                title: 'Сервис «MailBox» – быстрый и безопасный обмен письмами',
                fields: {
                    first: {
                        text: 'Фильтрация писем в соотвесвии с заданными параметрами',
                        img: `<path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                    },
                    second: {
                        text: 'Возможность создания анонимного ящика для контроля спама',
                        img: ` <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                    },
                    third: {
                        text: 'Крутая фича, придуманная нами, но еще не реализованная',
                        img: `<path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                    },
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
                title: 'Регистрация в «MailBox»',
                bottomText: 'Мы уже знакомы?',
                bottomLink: '/login',
                bottomLinkText: 'Войти',
            },
            button: {
                buttonText: 'Создать',
            },
            promoBox: {
                title: 'Сервис «MailBox» – быстрый и безопасный обмен письмами',
                fields: {
                    first: {
                        text: 'Фильтрация писем в соотвесвии с заданными параметрами',
                        img: `
                 <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
                    },
                    second: {
                        text: 'Возможность создания анонимного ящика для контроля спама',
                        img: `
                 <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
                    },
                    third: {
                        text: 'Крутая фича, придуманная нами, но еще не реализованная',
                        img: `
                 <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
                    },
                },
            },
        },
    },
}
