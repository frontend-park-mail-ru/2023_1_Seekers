import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';



class LettersStore extends BaseStore {

    _storeNames = {
        letters: 'letters',
    };

    constructor() {
        console.log('from lettters')
        super();
        this._storage.set(this._storeNames.letters, []);
    }

    override async _onDispatch(payload: dispatcherPayload){
        switch (payload.type){
            case 'login':
                await this.getLetters();
                microEvents.trigger('fromLogin');
                break
            default:
        }
    }

    getLetters = async () => {
        console.log('in getLetters');
        const responsePromise = Connector.makeGetRequest(config.api.getLetters + 'inbox')
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._storage.set(this._storeNames.letters, response);
            microEvents.trigger('letterListChanged');
            console.log(this._storage.get(this._storeNames.letters));
        }
    };
}

export const reducerLetters = new LettersStore();
