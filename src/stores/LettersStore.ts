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
    };

    constructor() {
        super();
        this._storage.set(this._storeNames.letters, []);
        this._storage.set(this._storeNames.mail, {});
        this._storage.set(this._storeNames.menu, []);
    }

    getLetters = async (folderName: string) => {
        console.log('in getLetters: ' + folderName);
        // const responsePromise = Connector.makeGetRequest(config.api.getLetters + 'inbox');
        // const response = await responsePromise;
        // if (response.status === responseStatuses.OK) {
        //     this._storage.set(this._storeNames.letters, response);
        //     microEvents.trigger('letterListChanged');
        //     console.log(this._storage.get(this._storeNames.letters));
        // }
        this._storage.set(this._storeNames.letters, letters);
        this._storage.set(this._storeNames.mail, {});
        microEvents.trigger('letterListChanged');
        microEvents.trigger('mailChanged');
    };

    getMail = async (id: string) => {
        console.log('in getMail');
        // const responsePromise = Connector.makeGetRequest(config.api.getMail);
        // const response = await responsePromise;
        // if (response.status === responseStatuses.OK) {
        //     this._storage.set(this._storeNames.mail, response);
        //     microEvents.trigger('mailChanged');
        //     console.log(this._storage.get(this._storeNames.letters));
        // }
        this._storage.set(this._storeNames.mail, this._storage.get(this._storeNames.letters)[id]);
        microEvents.trigger('mailChanged');
        console.log(this._storage.get(this._storeNames.letters));
    };

    getMenu = async () => {
        console.log('in getMenu');
        // const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        // const response = await responsePromise;
        // if (response.status === responseStatuses.OK) {
        //     this._storage.set(this._storeNames.menu, response);
        //     microEvents.trigger('menuChanged');
        //     console.log(this._storage.get(this._storeNames.letters));
        // }

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
