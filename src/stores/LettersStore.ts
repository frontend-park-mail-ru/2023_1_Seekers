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
        // const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        // const [status, response] = await responsePromise;
        // if (status === responseStatuses.OK) {
        //     this._storage.set(this._storeNames.menu, response.folders);
        //     microEvents.trigger('menuChanged');
        // }

        this._storage.set(this._storeNames.menu, menuBtns);
        microEvents.trigger('menuChanged');
    };

    getMailboxPage = async () => {
        await this.getMenu();
        await this.getLetters('inbox');
        await reducerUser.getProfile();
        microEvents.trigger('renderMailboxPage');
    };

    getProfilePage = async () => {
        console.log('in get profile page');
        await reducerUser.getProfile();
        microEvents.trigger('renderProfilePage');
    };

    getSecurityPage = async () => {
        await reducerUser.getProfile();
        microEvents.trigger('renderProfilePage');
    };
}


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
