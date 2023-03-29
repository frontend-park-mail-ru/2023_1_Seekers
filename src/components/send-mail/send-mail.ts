import {Component} from "@components/component";
import {reducerUser} from "@stores/userStore";
import {NewMailButton} from "@uikits/new-mail-button/new-mail-button";

import template from '@components/send-mail/send-mail.hbs';
import '@components/send-mail/send-mail.scss';
import {dispatcher} from "@utils/dispatcher";

// import {config} from "@config/config";


export interface SendMail {
    state: {
        element: Element,
        area: Element,
        buttons: Element[],
    },
}

/**
 * class implementing uikit send-mail
 */
export class SendMail extends Component {

    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            area: document.createElement('div'),
            buttons: [],
        }
    }

    /**
     * method handle click on navbar
     * @param {Event} e - event that goes from one of childs of current element
     */
    bottomButtonsClicked = async (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement &&
            currentTarget.dataset.section) {
            switch (currentTarget.dataset.section) {
                case config.buttons.newMailButtons.send.href:
                    // dispatcher.dispatch()
                    break;

                case config.buttons.newMailButtons.cancel.href:
                    this.purge();
                    break;
            }
        }
    }

    registerEventListener = () => {
        console.log('in register');
        document.addEventListener('click', this.onSidebarClick);

        this.state.buttons.forEach((button: Element) => {
            button.addEventListener('click', this.bottomButtonsClicked);
        });
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        console.log('in unregister');
        document.removeEventListener('click', this.onSidebarClick);

        this.state.buttons.forEach((button: Element) => {
            button.removeEventListener('click', this.bottomButtonsClicked);
        });
    };

    /**
     * method insert sidebar to HTML
     */
    render() {
        const actionButtons: Object[] = [];
        console.log(config);
        Object.values(config.buttons.newMailButtons).forEach((button) => {
            actionButtons.push(NewMailButton.renderTemplate(button));
        })

        this.parent.insertAdjacentHTML('afterbegin', template({
            profile: reducerUser._storage.get(reducerUser._storeNames.profile),
            inputs: config.forms.newMail,
            actionButtons: actionButtons,
        }));

        this.state.element = this.parent.getElementsByClassName('send-mail')[0];
        this.state.area = this.state.element.getElementsByClassName('send-mail-area')[0];
        this.state.buttons = [...this.state.element.getElementsByClassName('new-mail-button')];

        this.registerEventListener();
    }

    onSidebarClick = (e: Event) => {
        e.preventDefault();
        console.log('onSidebarClick');
        if (e.target) {
            if (this.state.element === e.target as HTMLElement) {
                this.purge();
            }
        }
    };

    /**
     * method sidebar clearing from page
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}

const config = {
    basePath: 'http://89.208.197.150',
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

    buttons: {
        commonMenuButtons: [
            {
                img: `
                  <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479
                  2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                  0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                  2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  `,
                href: '/inbox',
                text: 'Входящие',
                count: '10',
            },
            {
                img: `
                  <path d="m12 19 9 2-9-18-9 18zm0 0v-8" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2"/>
                  `,
                href: '/outbox',
                text: 'Исходящие',
                count: '',
            },

            {
                href: 'spam',
                text: 'Спам',
                count: '10',
                img: `<path d="m18.364 18.364c3.5147-3.5148 3.5147-9.21324
                0-12.72796-3.5148-3.51472-9.21324-3.51472-12.72796 0m12.72796 12.72796c-3.5148 3.5147-9.21324
                3.5147-12.72796 0-3.51472-3.5148-3.51472-9.21324 0-12.72796m12.72796 12.72796-12.72796-12.72796"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`
            },

            {
                href: 'trash',
                text: 'Корзина',
                count: '10',
                img: `<path d="m19 7-.8673 12.1425c-.0748 1.0466-.9457 1.8575-1.9949 1.8575h-8.27556c-1.04928
                0-1.92016-.8109-1.99492-1.8575l-.86732-12.1425m5 4v6m4-6v6m1-10v-3c0-.55228-.4477-1-1-1h-4c-.55228 0-1
                .44772-1 1v3m-5 0h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`
            },
        ],

        sidebarButtons: {
            profile: {
                href: '/profile',
                text: 'Личные данные',
                img: `<path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },
            security: {
                href: '/security',
                text: 'Пароль и безопасность',
                img: `
                 <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
            },
            logout: {
                href: '/logout',
                text: 'Выйти',
                img: `
                 <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                 0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
            },
        },

        mailActionButtons: [
            {
                href: '/forward',
                img: `<path clip-rule="evenodd" d="m10.2929 3.29289c.3905-.39052 1.0237-.39052 1.4142
                0l6 6c.3905.39053.3905 1.02371 0 1.41421l-6 6c-.3905.3905-1.0237.3905-1.4142 0-.39053-.3905-.39053-1.0237
                0-1.4142l4.2929-4.2929h-11.5858c-.55228 0-1-.4477-1-1 0-.55228.44772-1
                1-1h11.5858l-4.2929-4.29289c-.39053-.39053-.39053-1.02369 0-1.41422z" fill-rule="evenodd"/>`
            },
            {
                href: '/reply',
                img: `<path clip-rule="evenodd" d="m7.70711 3.29289c.39052.39053.39052 1.02369 0 1.41422l-2.2929
                2.29289h5.58579c3.866 0 7 3.134 7 7v2c0
                .5523-.4477 1-1 1s-1-.4477-1-1v-2c0-2.7614-2.2386-5-5-5h-5.58579l2.2929 2.2929c.39052.3905.39052 1.0237
                 0 1.4142-.39053.3905-1.02369.3905-1.41422 0l-4-3.99999c-.39052-.39053-.39052-1.02369
                 0-1.41422l4-4c.39053-.39052 1.02369-.39052 1.41422 0z" fill-rule="evenodd"/>`
            },
        ],
        newMailButtons: {
            send: {
                href: '/send',
                text: 'Отправить',
            },
            cancel: {
                href: '/cancel',
                text: 'Отменить',
            },
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
                title: 'Вход в «MailBox»',
                bottomText: 'Мы еще не знакомы?',
                bottomLink: '/signup',
                bottomLinkText: 'Регистрация',
            },
            button: {
                buttonText: 'Войти',
                redirect: '/',
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
                redirect: '/',
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
        newMail: {
            recipients: {
                name: 'new-mail-recipients',
                type: 'text',
                maxlenght: '50',
            },
            topic: {
                name: 'new-mail-topic',
                type: 'text',
                maxlenght: '50',
            },
            mailText: {
                name: 'new-mail-text',
                maxlenght: '1000',
            },
        }

    },
}