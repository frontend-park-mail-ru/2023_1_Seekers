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
    basePath: 'http://127.0.0.1:8001',
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
        openAttach_post_b64: '/b64',
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
        mailFormatterButtons: {
            bold: {
                href: '/bold',
                img: `<path clip-rule="evenodd" 
                d="M12.06 3c.549.004.994.45.994 1 0 .382-.215.715-.531.883-.391.218-.469.457-.469.867v.407h-.004c-.037.707-.318
                1.349-.761 1.843.443.494.724 1.136.761 1.843h.004v.407c0 .41.078.649.469.867.316.168.531.501.531.883 0 .552-.448
                1-1 1h-.007c-1.1-.004-1.993-.898-1.993-2v-1c0-.552-.448-1-1-1h-.519v3c0 .552-.448 1-1 1s-1-.448-1-1V9H6c-.552 0-1
                .448-1 1v1c0 1.102-.893 1.996-1.993
                2H3c-.552 0-1-.448-1-1 0-.382.215-.715.531-.883.391-.218.469-.457.469-.867v-.407h.004c.037-.708.32-1.352.764-1.847-.441-.494-.72-1.134-.757-1.839h-.004V5.75c0-.41-.078-.649-.47-.867-.315-.168-.53-.501-.53-.883 0-.552.448-1 1-1h.006c1.101.004
                1.994.898 1.994 2v1c0 .552.448 1 1 1h.528V4c0-.552.448-1 1-1s1 .448 1 1v3h.519c.552 0 1-.448 1-1V5c0-1.102.893-1.996 1.993-2h.013z">`,
                text: 'Жирный шрифт',
            },
            cursive: {
                href: '/cursive',
                img: `<path fill-rule="evenodd" 
                d="M6.0383 9.56807l-.555 3.726c-.061.407-.44.688-.847.628-.407-.061-.689-.441-.628-.848l1.407-9.438c.061-.407.441-.688.848-.628.407.061.688.441.627.848l-.63 4.223h.788c.491-.013 2.702-.23 3.155-3.073.017-.111.035-.21.053-.301l.157-1.054c.061-.407.44-.689.847-.628.407.061.689.44.628.847l-.202 1.355c-.001.009-.003.018-.005.027-.219 1.297-.94 2.724-2.212 3.569l.004.003c1.386 1.021 1.312 2.442 1.207 3.146l-.196 1.315c-.06.407-.44.688-.847.628-.407-.061-.688-.441-.628-.848l.197-1.315c.255-1.734-1.046-2.134-1.812-2.182h-1.356z">`,
                text: 'Наклонный шрифт',
            },
            underlined: {
                href: '/underlined',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="M11.233 13c.423 0 .767.344.767.767 0 .424-.344.768-.767.768H5.767c-.423 0-.767-.344-.767-.768 0-.423.344-.767.767-.767h5.466zm-.746-5.5V3.756c0-.417.339-.756.757-.756.417 0 .756.339.756.756v7.488c0 .417-.339.756-.756.756-.418 0-.757-.339-.757-.756V8.968H7.921C4.977 8.955 5.006 5.78 5.006 5.78V3.756c0-.417.339-.756.757-.756.417 0 .756.339.756.756V5.78c0 1.648 1.42 1.72 1.42 1.72h2.548z"/>`,
                text: 'Подчеркнутый шрифт',
            },
            strike: {
                href: '/strike',
                img: `<path clip-rule="evenodd" d="M5.443 6.49143l1.853-4.054c.129-.283.413-.447.705-.437.293-.009.576.154.705.437l1.852 4.054h2.69c.415 0 .752.337.752.752s-.337.752-.752.752h-2.003l2.027 4.436c.171.376.006.821-.37.992-.376.172-.821.007-.993-.369l-.94-2.058H5.03l-.94 2.058c-.172.376-.617.541-.993.369-.376-.171-.541-.616-.369-.992l2.028-4.436H2.752c-.415 0-.752-.337-.752-.752s.337-.752.752-.752h2.691zm.959 1.504l-.687 1.503h4.57l-.687-1.503H6.402zm.688-1.504h1.821l-.91-1.993-.911 1.993z" 
                fill-rule="evenodd"/>`,
                text: 'Зачеркнутый шрифт',
            },
            subscript: {
                href: '/subscript',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m3,10l0.01,0m6.99,0l0.01,0m6.99,0l0.01,0m-13.01,0c0,0.5523 -0.44772,1 -1,1s-1,-0.4477 
                -1,-1s0.44772,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1z"/>`,
                text: 'Верхний регистр',
            },
            superscript: {
                href: '/superscript',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m3,10l0.01,0m6.99,0l0.01,0m6.99,0l0.01,0m-13.01,0c0,0.5523 -0.44772,1 -1,1s-1,-0.4477 
                -1,-1s0.44772,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1z"/>`,
                text: 'Нижний регистр',
            },
            justifyLeft: {
                href: '/justifyLeft',
                img: `<path clip-rule="evenodd" d="M11.502 13c.275 0 .498.223.498.498 0 .274-.223.498-.498.498H2.498c-.275 0-.498-.224-.498-.498 0-.275.223-.498.498-.498h9.004zm-4-2c.275 0 .498.223.498.498 0 .276-.223.499-.498.499H2.498c-.275 0-.498-.223-.498-.499 0-.275.223-.498.498-.498h5.004zm1.996-2c.277 0 .502.225.502.502s-.225.502-.502.502H2.502c-.277 0-.502-.225-.502-.502S2.225 9 2.502 9h6.996zm2.004-2c.275 0 .498.223.498.498 0 .274-.223.498-.498.498H2.498c-.275 0-.498-.224-.498-.498C2 7.223 2.223 7 2.498 7h9.004zM9.498 5c.277 0 .502.225.502.502s-.225.502-.502.502H2.502c-.277 0-.502-.225-.502-.502S2.225 5 2.502 5h6.996zm3.997-2c.279 0 .505.226.505.505s-.226.506-.505.506H2.505c-.279 0-.505-.227-.505-.506S2.226 3 2.505 3h10.99z" 
                fill-rule="evenodd"/>`,
                text: 'Выравнивание слева',
            },
            justifyRight: {
                href: '/justifyRight',
                img: `<path clip-rule="evenodd" 
                    d="M13.502 13.996H4.498c-.275 0-.498-.224-.498-.498 0-.275.223-.498.498-.498h9.004c.275 0 .498.223.498.498 0 .274-.223.498-.498.498zm0-1.999H8.498c-.275 0-.498-.223-.498-.499 0-.275.223-.498.498-.498h5.004c.275 0 .498.223.498.498 0 .276-.223.499-.498.499zm-.004-1.993H6.502c-.277 0-.502-.225-.502-.502S6.225 9 6.502 9h6.996c.277 0 .502.225.502.502s-.225.502-.502.502zm.004-2.008H4.498c-.275 0-.498-.224-.498-.498C4 7.223 4.223 7 4.498 7h9.004c.275 0 .498.223.498.498 0 .274-.223.498-.498.498zm-.004-1.992H6.502c-.277 0-.502-.225-.502-.502S6.225 5 6.502 5h6.996c.277 0 .502.225.502.502s-.225.502-.502.502zm-.003-1.993H2.505c-.279 0-.505-.227-.505-.506S2.226 3 2.505 3h10.99c.279 0 .505.226.505.505s-.226.506-.505.506z" fill-rule="evenodd"/>`,
                text: 'Выравнивание справа',
            },
            justifyCenter: {
                href: '/justifyCenter',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="M12.502 13c.275 0 .498.223.498.498 0 .274-.223.498-.498.498H3.498c-.275 0-.498-.224-.498-.498 0-.275.223-.498.498-.498h9.004zm-2-2c.275 0 .498.223.498.498 0 .276-.223.499-.498.499H5.498c-.275 0-.498-.223-.498-.499 0-.275.223-.498.498-.498h5.004zm.996-2c.277 0 .502.225.502.502s-.225.502-.502.502H4.502c-.277 0-.502-.225-.502-.502S4.225 9 4.502 9h6.996zm1.004-2c.275 0 .498.223.498.498 0 .274-.223.498-.498.498H3.498c-.275 0-.498-.224-.498-.498C3 7.223 3.223 7 3.498 7h9.004zm-1.004-2c.277 0 .502.225.502.502s-.225.502-.502.502H4.502c-.277 0-.502-.225-.502-.502S4.225 5 4.502 5h6.996zm1.997-2c.279 0 .505.226.505.505s-.226.506-.505.506H2.505c-.279 0-.505-.227-.505-.506S2.226 3 2.505 3h10.99z"/>`,
                text: 'Выравнивание по центру',
            },
            fonts: {
                href: '/fonts',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m3,10l0.01,0m6.99,0l0.01,0m6.99,0l0.01,0m-13.01,0c0,0.5523 -0.44772,1 -1,1s-1,-0.4477 
                -1,-1s0.44772,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1z"/>`,
                text: 'Шрифты',
            },
            colors: {
                href: '/colors',
                img: `<path id="svg_1" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" 
                d="m3,10l0.01,0m6.99,0l0.01,0m6.99,0l0.01,0m-13.01,0c0,0.5523 -0.44772,1 -1,1s-1,-0.4477 
                -1,-1s0.44772,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1zm7,0c0,0.5523 -0.4477,1 -1,1s-1,-0.4477 
                -1,-1s0.4477,-1 1,-1s1,0.4477 1,1z"/>`,
                text: 'Цвета',
            },
            undo: {
                href: '/undo',
                img: `<path clip-rule="evenodd" d="M8.16 14H5.463c-.443 0-.803-.36-.803-.803 0-.444.36-.803.803-.803h2.689c2.149 0 3.894-1.245 3.894-3.394S10.309 5.607 8.16 5.606h-1.5v1.795c0 .331-.26.599-.581.599-.121 0-.234-.038-.327-.104L2.288 5.518c-.02-.012-.038-.025-.056-.039C2.091 5.37 2 5.196 2 5.001c0-.194.089-.366.227-.476h.001c.02-.016.041-.031.064-.044l3.447-2.368c.096-.071.213-.113.34-.113.321 0 .581.268.581.599V4h1.508c3.035 0 5.492 1.964 5.492 5 0 3.035-2.464 5-5.5 5z" 
                fill-rule="evenodd"/>`,
                text: 'Отменить',
            },
            redo: {
                href: '/redo',
                img: `<path clip-rule="evenodd" 
                    d="M7.508 12.394h2.689c.443 0 .803.359.803.803 0 .443-.36.803-.803.803H7.5C4.464 14 2 12.036 2 9s2.457-5 5.492-5H9V2.599C9 2.268 9.26 2 9.581 2c.127 0 .244.042.34.113l3.447 2.368c.023.013.044.028.064.044h.001c.138.11.227.282.227.476 0 .195-.091.369-.232.478-.018.014-.036.027-.056.039L9.908 7.896c-.093.066-.206.104-.327.104C9.26 8 9 7.732 9 7.401V5.606H7.5C5.351 5.607 3.614 6.851 3.614 9s1.745 3.394 3.894 3.394z" fill-rule="evenodd"/>`,
                text: 'Повторить',
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
