import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';


class LettersStore extends BaseStore {

    _storeNames = {
        letters: 'letters',
        mail: 'mail',
        menu: 'menu',
    };

    constructor() {
        console.log('from lettters');
        super();
        this._storage.set(this._storeNames.letters, []);
        this._storage.set(this._storeNames.mail, {});
        this._storage.set(this._storeNames.menu, {});
    }

    getLetters = async () => {
        console.log('in getLetters');
        const responsePromise = Connector.makeGetRequest(config.api.getLetters + 'inbox');
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._storage.set(this._storeNames.letters, response);
            microEvents.trigger('letterListChanged');
            console.log(this._storage.get(this._storeNames.letters));
        }
    };

    getMail = async () => {
        console.log('in getMail');
        const responsePromise = Connector.makeGetRequest(config.api.getMail);
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._storage.set(this._storeNames.mail, response);
            microEvents.trigger('mailChanged');
            console.log(this._storage.get(this._storeNames.letters));
        }
    };

    getMenu = async () => {
        console.log('in getMenu');
        const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._storage.set(this._storeNames.menu, response);
            microEvents.trigger('menuChanged');
            console.log(this._storage.get(this._storeNames.letters));
        }
    };
}

export const reducerLetters = new LettersStore();
