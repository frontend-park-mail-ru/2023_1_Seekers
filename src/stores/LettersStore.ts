import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";



class LettersStore {
    _storage: Map<string, any>;
    _storeNames = {
        letters: 'letters',
    };

    constructor() {
        this._storage = new Map();
        this._storage.set(this._storeNames.letters, [])
    }

    getLetters = async () => {
        console.log('in getLetters');
        const responsePromise = Connector.makeGetRequest(config.api.getLetters + 'inbox')
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._storage.set(this._storeNames.letters, response);
            microEvents.trigger('letterListChanged');
        }
    };
}

export const reducerLetters = new LettersStore();
