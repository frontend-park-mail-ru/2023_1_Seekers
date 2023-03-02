import MailBox from './pages/mailBox/mailBox.js';


const root = document.getElementById('root');
const context = {
    profile: {
        profileAvatar: "./img/female-avatar.svg",
    },

    menuButtons: {
        commonButtons: [
            {
                img: `a`,
                text: 'Входящие',
                count: '999',
                href: "/income"
            },
            {
                img: `b`,
                text: 'Отправленные',
                count: '999',
                href: "/outcome"
            },
            {
                img: `c`,
                text: 'Черновик',
                count: '999',
                href: "/draft"
            },
            {
                img: `d`,
                text: 'Вложения',
                count: '999',
                href: "/attachments"
            },
            {
                img: `e`,
                text: 'Спам',
                count: '999',
                href: "/spam"
            },
            {
                img: `f`,
                text: 'Корзина',
                count: '999',

                href: "/trash"
            }
        ],
        advancedButtons: [
            {
                img: `b`,
                text: 'Игры',
                count: '999',
                href: "/adv"
            }
        ]
    },

    letterFrames: [
    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:11 pm, Jul 12, 2021',
        content: 'Lorem ipsum dolor sit amet',
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:12 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:13 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:14 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:15 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:16 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:17 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:18 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:19 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:20 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:21 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },
]
}

const mailBox = new MailBox(root);
mailBox.render(context);

