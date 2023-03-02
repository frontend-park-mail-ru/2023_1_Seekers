import MailBox from './pages/mailBox/mailBox.js';


const root = document.getElementById('root');
const context = {
    profile: {
        profileAvatar: "./img/female-avatar.svg",
    },

    messages: [
        {
            message_id: 3,
            from_user: "gena@example.com",
            creating_date: "2023-01-29",
            title: "Title3",
            text: "Text3",
            read: false,
            favorite: false
        },
        {
            message_id: 4,
            from_user: "max@example.com",
            creating_date: "2023-01-01",
            title: "Title4",
            text: "Text4",
            read: false,
            favorite: false
        },
        {
            message_id: 8,
            from_user: "valera@example.com",
            creating_date: "2023-01-29",
            title: "Title6",
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false
        },
        {
            message_id: 5,
            from_user: "gena@example.com",
            creating_date: "2023-01-29",
            title: "Title5",
            text: "Text5",
            read: false,
            favorite: false
        },
        {
            message_id: 5,
            from_user: "ivan@example.com",
            creating_date: "2023-01-29",
            title: "Title5",
            text: 'Lorem ipsum dolor sit amet',
            read: false,
            favorite: false
        },

        {
            message_id: 6,
            from_user: "valera@example.com",
            creating_date: "2023-01-29",
            title: "Title6",
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false
        },
        {
            message_id: 9,
            from_user: "valera@example.com",
            creating_date: "2023-01-29",
            title: "Title6",
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false
        },
        {
            message_id: 10,
            from_user: "valera@example.com",
            creating_date: "2023-01-29",
            title: "Title6",
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
            read: false,
            favorite: false
        },
    ]
}

context.messages.forEach(message => {
    message.img = 'img/female-avatar.svg'
})

const mailBox = new MailBox(root);
mailBox.render(context);

mailBox.registerEventListener();

addEventListener('toAnotherPage', e => {
    console.log('to another')
})

class PageChanger{

    initPages() {
        this.pages = {};
        this.pages['mainPage'] = new MailBox(root);
        // this.pages['auth'] = new Auth(root);

        addEventListener('toAnotherPage', e => {
            mailBox.unregisterEventListener();
        })

    }


}
