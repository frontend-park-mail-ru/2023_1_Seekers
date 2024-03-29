'use strict';

import {mailboxPage} from '@views/mailbox-page/mailbox-page';
import {loginPage} from '@views/login-page/login-page';
import {signupPage} from '@views/signup-page/signup-page';
import {actionGetAccountPage, actionGetMailboxPage} from '@actions/user';

const prefixApi = 'api/v1/';

export const ROOT: Element = document.getElementById('root')!;
export const responseStatuses = {
    OK: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    UnauthorizedError: 401,
    Forbidden: 403,
    NotFound: 404,
    Conflict: 409,
    InternalServerError: 500,
};

export const routes = [
    {path: '/login', view: loginPage},
    {path: '/signup', view: signupPage},
];

export const privateRoutes = [
    // {path: '/', view: mailboxPage},
    {path: '/inbox', view: mailboxPage},
    {path: '/outbox', view: mailboxPage},
    {path: '/spam', view: mailboxPage},
    {path: '/trash', view: mailboxPage},
    {path: '/profile', view: mailboxPage},
    {path: '/security', view: mailboxPage},
    {path: '/drafts', view: mailboxPage},
    {path: '/number', view: mailboxPage},
];

export const privateActions = [
    // {path: '/', func: },
    {path: '/inbox', action: actionGetMailboxPage},
    {path: '/outbox', action: actionGetMailboxPage},
    {path: '/spam', action: actionGetMailboxPage},
    {path: '/trash', action: actionGetMailboxPage},
    {path: '/drafts', action: actionGetMailboxPage},
    {path: '/profile', action: actionGetAccountPage},
    {path: '/security', action: actionGetAccountPage},
    {path: '/number', action: actionGetMailboxPage},
];


export const config = {
    basePath: 'https://mailbx.ru',
    headers: {
        'Content-Type': 'application/json',
        // 'accept': 'application/json',
    },
    href: {
        main: '/',
        login: '/login',
        signup: '/signup',
        logout: '/logout',
        profile: '/profile',
        notFound: '/notfound',
    },
    api: {
        login: `${prefixApi}signin`,
        signup: `${prefixApi}signup`,
        logout: `${prefixApi}logout`,
        getLetters: `${prefixApi}folder`,
        getMail: `${prefixApi}message/`,
        getProfile: `${prefixApi}user/info`,
        getMenu: `${prefixApi}folders`,
        password: `${prefixApi}user/pw`,
        sendMail: `${prefixApi}message/send`,
        sendDraft: `${prefixApi}message/save`,
        avatar: `${prefixApi}user/avatar`,
        auth: `${prefixApi}auth`,
        csrf: `${prefixApi}csrf`,
        createFolder: `${prefixApi}folder/create`,
        moveToFolder: `${prefixApi}message/`,
        moveToFolder_to: '/move?toFolder=',
        moveToFolder_from: '&fromFolder=',
        deleteMail: `${prefixApi}message/`,
        deleteMail_from: '?fromFolder=',
        deleteFolder: `${prefixApi}folder`,
        renameFolder: `${prefixApi}folder`,
        renameFolder_post: '/edit',
        search: `${prefixApi}messages/search?folder=`,
        search_post: '&filter=',
        recipientsSearch: `${prefixApi}recipients/search`,
        getAttach: `${prefixApi}attach/`,
        getArchiveAttach: `${prefixApi}message/`,
        openAttach: `${prefixApi}attach/`,
        openAttach_post: '/preview',
        webSocket: `${prefixApi}ws`,
    },

    navbar: {
        send: {
            img: `<path d="m15.2322 5.23223 3.5355 3.53554m-2.0355-5.03554c.9763-.97631 2.5592-.97631
3.5355 0s.9763 2.55923 0 3.53554l-13.7677 13.76773h-3.5v-3.5711z"
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
        },
        menu: {
            img: `<path d="m4 6h16m-16 6h16m-16 6h16" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
        },
        backRight: {
            img: `<path d="m14 5 7 7m0 0-7 7m7-7h-18" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
        },
        backLeft: {
            img: `<path d="m10 19-7-7m0 0 7-7m-7 7h18" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
        },
        actions: {
            img: `<path clip-rule="evenodd" d="m4.29289 4.29289c.39053-.39052 1.02369-.39052 
                    1.41422 0l4.29289 4.2929 4.2929-4.2929c.3905-.39052 1.0237-.39052 1.4142 0 
                    .3905.39053.3905 1.02369 0 1.41422l-4.2929 4.29289 4.2929 4.2929c.3905.3905.3905 
                    1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.2929-4.29289 
                    4.2929c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 
                    0-1.4142l4.2929-4.2929-4.2929-4.29289c-.39052-.39053-.39052-1.02369 0-1.41422z" 
                    fill-rule="evenodd"/>`,
        },
    },

    buttons: {
        commonMenuButtons: {
            inbox: {
                img: `
                  <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 
                  2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                  0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                  2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  `,
                folder_slug: '/inbox',
                name: 'Входящие',
                messages_unseen: '10',
            },
            outbox: {
                img: `
                  <path d="m12 19 9 2-9-18-9 18zm0 0v-8" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2"/>
                  `,
                folder_slug: '/outbox',
                name: 'Исходящие',
                messages_unseen: '',
            },

            drafts: {
                folder_slug: '/drafts',
                name: 'Черновики',
                messages_unseen: '10',
                img: `<path d="m7 21h10c1.1046 0 2-.8954 
                2-2v-9.58579c0-.26521-.1054-.51957-.2929-.7071l-5.4142-5.41422c-.1875-.18753-.4419-.29289-.7071-.29289h-5.5858c-1.10457 
                0-2 .89543-2 2v14c0 1.1046.89543 2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },

            spam: {
                folder_slug: '/spam',
                name: 'Спам',
                messages_unseen: '10',
                img: `<path d="m18.364 18.364c3.5147-3.5148 3.5147-9.21324
                0-12.72796-3.5148-3.51472-9.21324-3.51472-12.72796
                0m12.72796 12.72796c-3.5148 3.5147-9.21324
                3.5147-12.72796 0-3.51472-3.5148-3.51472-9.21324
                0-12.72796m12.72796 12.72796-12.72796-12.72796"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },

            trash: {
                folder_slug: '/trash',
                name: 'Корзина',
                messages_unseen: '10',
                img: `<path d="m19 7-.8673 12.1425c-.0748 1.0466-.9457
                    1.8575-1.9949 1.8575h-8.27556c-1.04928
                    0-1.92016-.8109-1.99492-1.8575l-.86732-12.1425m5
                    4v6m4-6v6m1-10v-3c0-.55228-.4477-1-1-1h-4c-.55228 0-1
                    .44772-1 1v3m-5 0h16"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },
        },

        accountButtons: {
            profile: {
                href: '/profile',
                text: 'Личные данные',
                img: `<g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="m16 7c0 2.20914-1.7909 4-4 4-2.20914 0-4-1.79086-4-4s1.79086-4 
                    4-4c2.2091 0 4 1.79086 4 4z"/><path d="m12 14c-3.86599 0-7 3.134-7 
                    7h14c0-3.866-3.134-7-7-7z"/></g>`,
            },
            security: {
                href: '/security',
                text: 'Пароль и безопасность',
                // eslint-disable-next-line max-len
                img: '<path d="m15 7c1.1046 0 2 .89543 2 2m4 0c0 3.3137-2.6863 6-6 6-.6062 ' +
                    '0-1.1913-.0899-1.7429-.2571l-2.2571 2.2571h-2v2h-2v2h-3c-.55228 ' +
                    '0-1-.4477-1-1v-2.5858c0-.2652.10536-.5196.29289-.7071l5.' +
                    '96418-5.9642c-.16718-.5515-.25707-1.13673-.25707-1.7429 ' + `
                     0-3.31371 2.6863-6 6-6s6 2.68629 6 6z" 
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

        contextLetterButtons: {
            mailActions: {
                forward: {
                    folder_slug: '/forward',
                    name: 'Переслать',
                    messages_unseen: '',
                    img: `<path clip-rule="evenodd" d="m10.2929 3.29289c.3905-.39052 1.0237-.39052 1.4142 
                0l6 6c.3905.39053.3905 1.02371 0 1.41421l-6 
                6c-.3905.3905-1.0237.3905-1.4142 0-.39053-.3905-.39053-1.0237 
                0-1.4142l4.2929-4.2929h-11.5858c-.55228 0-1-.4477-1-1 0-.55228.44772-1 
                1-1h11.5858l-4.2929-4.29289c-.39053-.39053-.39053-1.02369 0-1.41422z" 
                fill-rule="evenodd"/>
                    `,
                },

                reply: {
                    folder_slug: '/reply',
                    name: 'Ответить',
                    messages_unseen: '',
                    img: `<path clip-rule="evenodd" 
                    d="m7.70711 3.29289c.39052.39053.39052 1.02369 0 1.41422l-2.2929 
                    2.29289h5.58579c3.866 0 7 3.134 7 7v2c0 .5523-.4477 1-1 
                    1s-1-.4477-1-1v-2c0-2.7614-2.2386-5-5-5h-5.58579l2.2929 2.2929c.39052.3905.39052 
                    1.0237
                    0 1.4142-.39053.3905-1.02369.3905-1.41422 0l-4-3.99999c-.39052-.39053-.39052-1.02369 
                    0-1.41422l4-4c.39053-.39052 1.02369-.39052 1.41422 0z" fill-rule="evenodd"/>
                    `,
                },
            },

            folderActions: {
                inbox: {
                    img: `
                  <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 
                  2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                  0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                  2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  `,
                    folder_slug: '/to_inbox',
                    name: 'Во входящие',
                    messages_unseen: '',
                },
                outbox: {
                    img: `
                  <path d="m12 19 9 2-9-18-9 18zm0 0v-8" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2"/>
                  `,
                    folder_slug: '/to_outbox',
                    name: 'В исходящие',
                    messages_unseen: '',
                },

                spam: {
                    folder_slug: '/to_spam',
                    name: 'В спам',
                    messages_unseen: '',
                    img: `<path d="m18.364 18.364c3.5147-3.5148 3.5147-9.21324
                0-12.72796-3.5148-3.51472-9.21324-3.51472-12.72796
                0m12.72796 12.72796c-3.5148 3.5147-9.21324
                3.5147-12.72796 0-3.51472-3.5148-3.51472-9.21324
                0-12.72796m12.72796 12.72796-12.72796-12.72796"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                },

                trash: {
                    folder_slug: '/to_trash',
                    name: 'В корзину',
                    messages_unseen: '',
                    img: `<path d="m19 7-.8673 12.1425c-.0748 1.0466-.9457
                    1.8575-1.9949 1.8575h-8.27556c-1.04928
                    0-1.92016-.8109-1.99492-1.8575l-.86732-12.1425m5
                    4v6m4-6v6m1-10v-3c0-.55228-.4477-1-1-1h-4c-.55228 0-1
                    .44772-1 1v3m-5 0h16"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                },

                another: {
                    folder_slug: '/to_another',
                    name: 'В другую папку',
                    messages_unseen: '',
                },
            },

            delete: {
                folder_slug: '/delete',
                name: 'Удалить',
                messages_unseen: '',
                img: `<path d="m6 18 12-12m-12 0 12 12" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },
        },

        contextDraftButtons: {
            trash: {
                folder_slug: '/to_trash',
                name: 'Удалить',
                messages_unseen: '',
                img: `<path d="m19 7-.8673 12.1425c-.0748 1.0466-.9457
                    1.8575-1.9949 1.8575h-8.27556c-1.04928
                    0-1.92016-.8109-1.99492-1.8575l-.86732-12.1425m5
                    4v6m4-6v6m1-10v-3c0-.55228-.4477-1-1-1h-4c-.55228 0-1
                    .44772-1 1v3m-5 0h16"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },
        },

        contextMenuButtons: {
            rename: {
                folder_slug: '/rename',
                name: 'Переименовать',
                messages_unseen: '',
                img: `<path d="m11 5h-5c-1.10457 0-2 .89543-2 
                    2v11c0 1.1046.89543 2 2 2h11c1.1046 0 2-.8954 
                    2-2v-5m-1.4142-9.41421c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04737 0
                    2.82842l-8.5858 8.58579h-2.8284v-2.8284z" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            },

            delete: {
                folder_slug: '/delete',
                name: 'Удалить',
                messages_unseen: '',
                img: `<path d="m6 18 12-12m-12 0 12 12" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            }
        },
        renameFolderButtons: {
            footerButtons: {
                rename: {
                    href: '/rename',
                    text: 'Переимновать',
                },
                cancel: {
                    href: '/cancel',
                    text: 'Отменить',
                },
            },
            closeButton: {
                href: '/close',
                img: `<path clip-rule="evenodd" d="m4.29289 4.29289c.39053-.39052 1.02369-.39052 
                    1.41422 0l4.29289 4.2929 4.2929-4.2929c.3905-.39052 1.0237-.39052 1.4142 0 
                    .3905.39053.3905 1.02369 0 1.41422l-4.2929 4.29289 4.2929 4.2929c.3905.3905.3905 
                    1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.2929-4.29289 
                    4.2929c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 
                    0-1.4142l4.2929-4.2929-4.2929-4.29289c-.39052-.39053-.39052-1.02369 0-1.41422z" 
                    fill-rule="evenodd"/>`,
            },
        },

        sidebarButtons: {
            mailbox: {
                href: '/inbox',
                text: 'Почта',
                img: `
                 <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 
                  2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                  0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                  2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                 `,
            },
            profile: {
                href: '/profile',
                text: 'Личные данные',
                img: `<g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="m16 7c0 2.20914-1.7909 4-4 4-2.20914 0-4-1.79086-4-4s1.79086-4 
                    4-4c2.2091 0 4 1.79086 4 4z"/><path d="m12 14c-3.86599 0-7 3.134-7 
                    7h14c0-3.866-3.134-7-7-7z"/></g>`,
            },
            security: {
                href: '/security',
                text: 'Пароль и безопасность',
                img: `
                 <path d="m15 7c1.1046 0 2 .89543 2 2m4 0c0 3.3137-2.6863 6-6 6-.6062 
                 0-1.1913-.0899-1.7429-.2571l-2.2571 2.2571h-2v2h-2v2h-3c-.55228 ` +
                    '0-1-.4477-1-1v-2.5858c0-.2652.10536-.5196.29289-.7071l5.96418-5.' +
                    `9642c-.16718-.5515-.25707-1.13673-.25707-1.7429 
                 0-3.31371 2.6863-6 6-6s6 2.68629 6 6z" 
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

        mailActionButtons: {
            forward: {
                href: '/forward',
                img: `<path clip-rule="evenodd" d="m10.2929 3.29289c.3905-.39052 1.0237-.39052 1.4142 
                0l6 6c.3905.39053.3905 1.02371 0 1.41421l-6 
                6c-.3905.3905-1.0237.3905-1.4142 0-.39053-.3905-.39053-1.0237 
                0-1.4142l4.2929-4.2929h-11.5858c-.55228 0-1-.4477-1-1 0-.55228.44772-1 
                1-1h11.5858l-4.2929-4.29289c-.39053-.39053-.39053-1.02369 0-1.41422z" 
                fill-rule="evenodd"/>`,
                text: 'Переслать',
            },
            reply: {
                href: '/reply',
                img: `<path clip-rule="evenodd" 
                    d="m7.70711 3.29289c.39052.39053.39052 1.02369 0 1.41422l-2.2929 
                    2.29289h5.58579c3.866 0 7 3.134 7 7v2c0 .5523-.4477 1-1 
                    1s-1-.4477-1-1v-2c0-2.7614-2.2386-5-5-5h-5.58579l2.2929 2.2929c.39052.3905.39052 
                    1.0237
                    0 1.4142-.39053.3905-1.02369.3905-1.41422 0l-4-3.99999c-.39052-.39053-.39052-1.02369 
                    0-1.41422l4-4c.39053-.39052 1.02369-.39052 1.41422 0z" fill-rule="evenodd"/>`,
                text: 'Ответить',
            },
            more: {
                href: '/more',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m3,10l0.01,0m6.99,0l0.01,0m6.99,0l0.01,0m-13.01,0c0,0.5523 -0.44772,1 -1,1s-1,-0.4477 
                -1,-1s0.44772,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1z"/>`,
                text: 'Еще',
            },
        },
        newMailButtons: {
            actionButtons: {
                attach: {
                    folder_slug: '/attach',
                    name: 'Прикрепить',
                    img: `<path d="m15.1716 7-6.58581 6.5858c-.78105.781-.78105 2.0474 0 
                        2.8284.78105.7811 2.04741.7811 
                        2.82841 0l6.4142-6.58577c1.5621-1.5621 1.5621-4.09476 
                        0-5.65686-1.5621-1.56209-4.0947-1.56209-5.6568 
                        0l-6.41424 6.58583c-2.34315 2.3431-2.34315 
                        6.1421 0 8.4852 2.34314 2.3432 6.14214 2.3432 8.48524 0l6.2574-6.2426" 
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                },
            },
            footerButtons: {
                send: {
                    href: '/send',
                    text: 'Отправить',
                },
                save: {
                    href: '/save',
                    text: 'Сохранить',
                },
                cancel: {
                    href: '/cancel',
                    text: 'Отменить',
                },
            },
            closeButton: {
                href: '/close',
                img: `<path clip-rule="evenodd" d="m4.29289 4.29289c.39053-.39052 1.02369-.39052 
                    1.41422 0l4.29289 4.2929 4.2929-4.2929c.3905-.39052 1.0237-.39052 1.4142 0 
                    .3905.39053.3905 1.02369 0 1.41422l-4.2929 4.29289 4.2929 4.2929c.3905.3905.3905 
                    1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.2929-4.29289 
                    4.2929c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 
                    0-1.4142l4.2929-4.2929-4.2929-4.29289c-.39052-.39053-.39052-1.02369 0-1.41422z" 
                    fill-rule="evenodd"/>`,
            },
        },
        newFolderButtons: {
            footerButtons: {
                send: {
                    href: '/create',
                    text: 'Создать',
                },
                cancel: {
                    href: '/cancel',
                    text: 'Отменить',
                },
            },
            closeButton: {
                href: '/close',
                img: `<path clip-rule="evenodd" d="m4.29289 4.29289c.39053-.39052 1.02369-.39052 
                    1.41422 0l4.29289 4.2929 4.2929-4.2929c.3905-.39052 1.0237-.39052 1.4142 0 
                    .3905.39053.3905 1.02369 0 1.41422l-4.2929 4.29289 4.2929 4.2929c.3905.3905.3905 
                    1.0237 0 1.4142s-1.0237.3905-1.4142 0l-4.2929-4.2929-4.29289 
                    4.2929c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 
                    0-1.4142l4.2929-4.2929-4.2929-4.29289c-.39052-.39053-.39052-1.02369 0-1.41422z" 
                    fill-rule="evenodd"/>`,
            },
        },

        letterListHeader: {
            select: {
                img: `<path stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                    d="m19,11l-14,0m14,0c1.1046,0 2,0.8954 2,2l0,6c0,1.1046 -0.8954,2 
                    -2,2l-14,0c-1.10457,0 -2,-0.8954 -2,-2l0,-6c0,-1.1046 0.89543,-2 
                    2,-2m14,0l0,-2c0,-1.10457 -0.8954,-2 -2,-2m-12,4l0,-2c0,-1.10457 
                    0.89543,-2 2,-2m0,0l0,-2c0,-1.10457 0.89543,-2 2,-2l6,0c1.1046,0 
                    2,0.89543 2,2l0,2m-10,0l10,0"/>
                    <line stroke-linecap="round" stroke-linejoin="round"
                    y2="17.873972" x2="11.285716" y1="16.11573" x1="9.197804" 
                    fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>
                    <line stroke-linecap="round" stroke-linejoin="round" 
                    y2="18.203642" x2="11.615386" y1="13.808037" x1="15.901101" 
                    fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>`,
                text: 'Выделить все',
            },

            unselect: {
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m19,11l-14,0m14,0c1.1046,0 2,0.8954 2,2l0,6c0,1.1046 
                -0.8954,2 -2,2l-14,0c-1.10457,0 -2,-0.8954 
                -2,-2l0,-6c0,-1.1046 0.89543,-2 2,-2m14,0l0,-2c0,-1.10457 
                -0.8954,-2 -2,-2m-12,4l0,-2c0,-1.10457 
                0.89543,-2 2,-2m0,0l0,-2c0,-1.10457 0.89543,-2 2,
                -2l6,0c1.1046,0 2,0.89543 2,2l0,2m-10,0l10,0"/>
                <line stroke-linecap="round" stroke-linejoin="round" 
                y2="18.043011" x2="14.018847" y1="13.827957" x1="9.981153" 
                fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>
                <line transform="rotate(90 12,15.935483932495117) " stroke-linecap="round"
                stroke-linejoin="round" y2="17.956989" x2="14.104868" y1="13.913979" 
                x1="9.895131" fill-opacity="null" stroke-opacity="null" stroke-width="2" fill="none"/>
 `,
                text: 'Снять выделение',
            },

            sort: {
                img: `<path d="m12 6v-2m0 2c-1.1046 0-2 .89543-2 2s.8954 2 2 2m0-4c1.1046 0 2 
                    .89543 2 2s-.8954 2-2 2m-6 8c1.10457 0 2-.8954 2-2s-.89543-2-2-2m0 
                    4c-1.10457 0-2-.8954-2-2s.89543-2 2-2m0 4v2m0-6v-10m6 
                    6v10m6-2c1.1046 0 2-.8954 2-2s-.8954-2-2-2m0 4c-1.1046 
                    0-2-.8954-2-2s.8954-2 2-2m0 4v2m0-6v-10" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                text: 'Фильтр',
            }
        }
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
                    iconName: 'passwordEye',
                    icon: `<g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="m14.9998 12c0 1.6569-1.3432 3-3 3-1.6569 
                        0-3.00004-1.3431-3.00004-3s1.34314-3 3.00004-3c1.6568 0 3 1.3431 3 3z"/>
                        <path d="m2.45801 12c1.27427-4.05712 5.06456-7 9.54219-7 4.4776 0 8.2679 
                        2.94291 9.5422 7-1.2743 4.0571-5.0646 7-9.5422 7-4.47764 
                        0-8.26794-2.9429-9.54219-7z"/></g>`,
                },
            },
            windowData: {
                title: 'Вход в «MailBx»',
                bottomText: 'Мы еще не знакомы?',
                bottomLink: '/signup',
                bottomLinkText: 'Регистрация',
            },
            button: {
                buttonText: 'Войти',
                redirect: '/',
            },
            promoBox: {
                title: 'Сервис «MailBx» – быстрый и безопасный обмен письмами',
                fields: {
                    first: {
                        text: 'Фильтрация писем в соответствии с заданными параметрами',
                        img: `<path d="m12 6v-2m0 2c-1.1046 0-2 .89543-2 2s.8954 2 
                            2 2m0-4c1.1046 0 2 .89543 2 
                            2s-.8954 2-2 2m-6 8c1.10457 0 2-.8954 
                            2-2s-.89543-2-2-2m0 4c-1.10457 0-2-.8954-2-2s.89543-2 
                            2-2m0 4v2m0-6v-10m6 6v10m6-2c1.1046 0 2-.8954 2-2s-.8954-2-2-2m0 4c-1.1046 
                            0-2-.8954-2-2s.8954-2 2-2m0 4v2m0-6v-10"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                    },
                    second: {
                        text: 'Возможность создания анонимного ящика для контроля спама',
                        img: `<path d="m13.8749 18.8246c-.6072.1152-1.2338.1754-1.8744.1754-4.47769 
                            0-8.26799-2.9429-9.54225-7 .3469-1.1045.88026-2.12639 
                            1.56318-3.02882m5.85725.9075c.54292-.54289 
                            1.29292-.87868 2.12132-.87868 1.6569 0 3 
                            1.3431 3 3 0 .8284-.3358 1.5784-.8787 2.1213m-4.24262-4.24262 4.24262 
                            4.24262m-4.24262-4.24262-3.28952-3.28952m7.53214 
                            7.53214 3.2899 3.2899m-14.4112-14.4112 
                            3.58916 3.58916m0 0c1.55982-1.00562 
                            3.41744-1.58916 5.41124-1.58916 4.4777 0 8.268 2.94291
                            9.5422 7-.7069 2.2507-2.1881 4.1585-4.1314 5.4112m0 0 3.5888 3.5888" 
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                    },
                    third: {
                        text: 'Крутая фича, придуманная нами, но еще не реализованная',
                        img: `<path d="m9.66347 17h4.67293m-2.3365-14v1m6.364
                            1.63604-.7071.70711m3.3432 5.65675h-1m-16 
                            0h-1m3.34309-5.65675-.7071-.70711m2.82842
                             9.89956c-1.95262-1.9527-1.95262-5.1185 0-7.07111 
                            1.95259-1.95262 5.11849-1.95262 7.07109 0 1.9526 1.95261 1.9526 5.11841 0 
                            7.07111l-.5471.5471c-.6329.6328-.9885 
                            1.4912-.9885 2.3863v.531c0 1.1046-.8954 2-2 2-1.1045 
                            0-1.99995-.8954-1.99995-2v-.531c0-.8951-.35555-1.7535-.98844-2.3863z" 
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
                    iconName: 'passwordEye',
                    icon: `<g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="m14.9998 12c0 1.6569-1.3432 3-3 3-1.6569 
                        0-3.00004-1.3431-3.00004-3s1.34314-3 3.00004-3c1.6568 0 3 1.3431 3 3z"/>
                        <path d="m2.45801 12c1.27427-4.05712 5.06456-7 9.54219-7 4.4776 0 8.2679 
                        2.94291 9.5422 7-1.2743 4.0571-5.0646 7-9.5422 7-4.47764 
                        0-8.26794-2.9429-9.54219-7z"/></g>`,
                },
                repeatPassword: {
                    title: 'Повторите пароль',
                    type: 'password',
                    name: 'repeat_password',
                    maxlenght: '16',
                },
            },
            windowData: {
                title: 'Регистрация в «MailBx»',
                bottomText: 'Мы уже знакомы?',
                bottomLink: '/login',
                bottomLinkText: 'Войти',
            },
            button: {
                buttonText: 'Создать',
                redirect: '/',
            },
            promoBox: {
                title: 'Сервис «MailBx» – быстрый и безопасный обмен письмами',
                fields: {
                    first: {
                        text: 'Фильтрация писем в соответствии с заданными параметрами',
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
            passwordIcons: {
                open: {
                    img: `<path d="m9.66347 17h4.67293m-2.3365-14v1m6.364
                            1.63604-.7071.70711m3.3432 5.65675h-1m-16 
                            0h-1m3.34309-5.65675-.7071-.70711m2.82842
                             9.89956c-1.95262-1.9527-1.95262-5.1185 0-7.07111 
                            1.95259-1.95262 5.11849-1.95262 7.07109 0 1.9526 1.95261 1.9526 5.11841 0 
                            7.07111l-.5471.5471c-.6329.6328-.9885 
                            1.4912-.9885 2.3863v.531c0 1.1046-.8954 2-2 2-1.1045 
                            0-1.99995-.8954-1.99995-2v-.531c0-.8951-.35555-1.7535-.98844-2.3863z" 
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                },
                close: {
                    img: `<path d="m9.66347 17h4.67293m-2.3365-14v1m6.364
                            1.63604-.7071.70711m3.3432 5.65675h-1m-16 
                            0h-1m3.34309-5.65675-.7071-.70711m2.82842
                             9.89956c-1.95262-1.9527-1.95262-5.1185 0-7.07111 
                            1.95259-1.95262 5.11849-1.95262 7.07109 0 1.9526 1.95261 1.9526 5.11841 0 
                            7.07111l-.5471.5471c-.6329.6328-.9885 
                            1.4912-.9885 2.3863v.531c0 1.1046-.8954 2-2 2-1.1045 
                            0-1.99995-.8954-1.99995-2v-.531c0-.8951-.35555-1.7535-.98844-2.3863z" 
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
                }
            }
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
        },
        newFolder: {
            folderInput: {
                name: 'new-folder',
                type: 'text',
                maxlenght: '32',
                title: 'Название папки',
            },
        },

    },

    accountFields: {
        account: {
            // fields: {
            //     profile: {
            //         href: '/profile',
            //         text: 'Личные данные',
            //         img: `<path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
            //      0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
            //      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
            //     },
            //     security: {
            //         href: '/security',
            //         text: 'Пароль и безопасность',
            //         img: `
            //      <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
            //      0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
            //      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            //      `,
            //     },
            //     logout: {
            //         href: '/logout',
            //         text: 'Выйти',
            //         img: `
            //      <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
            //      0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
            //      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            //      `,
            //     },
            // },
            profile: {
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
                },
                button: {
                    buttonText: 'Сохранить',
                },
            },
            security: {
                fields: {
                    passwordOld: {
                        title: 'Старый пароль',
                        type: 'text',
                        name: 'password_old',
                        maxlenght: '30',
                    },
                    passwordNew: {
                        title: 'Новый пароль',
                        type: 'text',
                        name: 'password',
                        maxlenght: '30',
                    },
                    passwordRepeat: {
                        title: 'Повторите пароль',
                        type: 'text',
                        name: 'repeat_password',
                        maxlenght: '30',
                    },
                },
                button: {
                    buttonText: 'Сохранить',
                },
            },
        },
    },
};
