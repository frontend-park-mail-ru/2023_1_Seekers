import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";
import BaseStore from "@stores/BaseStore";



class UserStore extends BaseStore {

    _storeNames = {
        name: 'name',
        password: 'password'
    }

    constructor() {
        super();
        this._storage.set(this._storeNames.name, undefined)
        this._storage.set(this._storeNames.password, undefined)
    }

    override async _onDispatch(payload: dispatcherPayload){
        console.log(payload.type);
        switch (payload.type){
            case 'login':
                console.log('hello1!');
                await this.login(payload.data);
                microEvents.trigger('fromLogin');
                break
            default:
        }
    }

    async login(user: anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.login, user)
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth')
        }

    }

    async signup(user :anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.signup, user)

        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            return {
                user: response.body,
                statusLogin: null,
            } as anyObject;
        }
        return {statusSignup: response.status};
    }
}

export const reducerUser = new UserStore();
