import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from "@stores/userStore";


class LettersStore extends BaseStore {

    _storeNames = {
        letters: 'letters',
        mail: 'mail',
        menu: 'menu',
        currentLetters: 'currentLetters',
    };

    constructor() {
        super();
        this._storage.set(this._storeNames.letters, new Map());
        this._storage.set(this._storeNames.mail, undefined);
        this._storage.set(this._storeNames.menu, []);
        this._storage.set(this._storeNames.currentLetters, '/inbox');
    }

    getLetters = async (folderName: string) => {
        console.log('in getLetters: ' + folderName);
        const responsePromise = Connector.makeGetRequest(config.api.getLetters + folderName);

        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            if (body.messages !== null) {
                this._storage.get(this._storeNames.letters).set(folderName, body.messages);
            } else {
                this._storage.get(this._storeNames.letters).set(folderName, []);
            }
            this._storage.set(this._storeNames.currentLetters, folderName);
            console.log(folderName);
            console.log(this._storage.get(this._storeNames.letters).get(this._storage.get(this._storeNames.currentLetters)));
            this._storage.set(this._storeNames.mail, undefined);
            microEvents.trigger('letterListChanged');
            microEvents.trigger('mailChanged');
        }
    };

    getMail = async (id: string) => {
        const responsePromise = Connector.makeGetRequest(config.api.getMail + id);
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {

            this._storage.set(this._storeNames.mail, body.message);
            microEvents.trigger('mailChanged');
        }
    };

    getMenu = async () => {
        const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.menu, response.folders);
            microEvents.trigger('menuChanged');
        }

        this._storage.set(this._storeNames.menu, menuBtns);
        microEvents.trigger('menuChanged');
    };

    getAll = async () => {
        await this.getMenu();
        await this.getLetters('inbox');
        await reducerUser.getProfile();
        // microEvents.trigger('renderMailbox');
    };
}

const letters = [
    {
        message_id: '1',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!1',
        text: 'lorem1',
        creating_date: '13.11.2020',
    },

    {
        message_id: '2',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!2',
        text: 'lorem2',
        creating_date: '13.11.2020',
    },
    {
        message_id: '3',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!3',
        text: 'lorem30',
        creating_date: '13.11.2020',
    },
    {
        message_id: '4',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!4',
        text: 'lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 lorem40 ',
        creating_date: '13.11.2020',
    },
    {
        message_id: '5',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!4',
        text: 'lorem40',
        creating_date: '13.11.2020',
    },
    {
        message_id: '6',
        from_user: 'sasa@mailbox.ru',
        title: 'Hello, world!4',
        text: 'lorem40',
        creating_date: '13.11.2020',
    },
];

const menuBtns = [
    {
        href: 'inbox',
        text: 'inbox',
        count: '10',
    },

    {
        href: 'outbox',
        text: 'outbox',
        count: '10',
    },

    {
        href: 'spam',
        text: 'spam',
        count: '10',
    },

    {
        href: 'trash',
        text: 'trash',
        count: '10',
    },
];

export const reducerLetters = new LettersStore();
