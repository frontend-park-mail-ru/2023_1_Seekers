import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";
import BaseStore from "@stores/BaseStore";
import {ProfileButton} from "@uikits/profile-button/profile-button";



class UserStore extends BaseStore {

    _storeNames = {
        profile: 'profile',
        name: 'name',
        password: 'password',
        status: 'status',
        body: 'body',
    }

    constructor() {
        super();
        this._storage.set(this._storeNames.name, undefined)
        this._storage.set(this._storeNames.password, undefined)
        this._storage.set(this._storeNames.profile, undefined)
    }

    async login(user: user) {
        const responsePromise = Connector.makePostRequest(config.api.login, user)
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth');
        }
        this._storage.set(this._storeNames.body, body)
        this._storage.set(this._storeNames.status, status)
        microEvents.trigger('fromLogin');
    }

    async signup(user :user) {
        const responsePromise = Connector.makePostRequest(config.api.signup, user)
        console.log('signup')
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth');
        }
        this._storage.set(this._storeNames.body, body)
        this._storage.set(this._storeNames.status, status)
        microEvents.trigger('fromSignup');
    }

    async getProfile() {
        console.log('getProfile');
        console.log(this._storage.get(this._storeNames.profile));
        const responsePromise = Connector.makeGetRequest(config.api.getProfile)

        const [status, body]  = await responsePromise;
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.profile, body);
            microEvents.trigger('profileChanged');
            console.log(this._storage.get(this._storeNames.profile));
        }
    }
}

export const reducerUser = new UserStore();
