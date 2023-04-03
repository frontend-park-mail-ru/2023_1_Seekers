import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";
import BaseStore from "@stores/BaseStore";

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
        const responsePromise = Connector.makeGetRequest(config.api.getProfile)

        const [status, body]  = await responsePromise;
        console.log(status)
        console.log(body)
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.profile, body);
            microEvents.trigger('profileChanged');
        }
    }

    async logout() {
        console.log('logout');
        const responsePromise = Connector.makeGetRequest(config.api.logout);

        const [status, body]  = await responsePromise;
        console.log(status);
        // if (status === responseStatuses.OK) {
            console.log('success logout');
            microEvents.trigger('loggedOut');
        // }
    }

    async changeName(user :user) {
        const responsePromise = Connector.makePostRequest(config.api.getProfile, user)
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        microEvents.trigger('fromProfile');
    }

    async changePw(userPwForm :userPwForm) {
        const responsePromise = Connector.makePostRequest(config.api.password, userPwForm)
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
        }
        this._storage.set(this._storeNames.body, body)
        this._storage.set(this._storeNames.status, status)
        microEvents.trigger('fromSecurity');
    }
}

export const reducerUser = new UserStore();
