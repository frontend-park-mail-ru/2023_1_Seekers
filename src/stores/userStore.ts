import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";
import BaseStore from "@stores/BaseStore";
import {ProfileButton} from "@uikits/profile-button/profile-button";



class UserStore extends BaseStore {

    _storeNames = {
        profile: 'profile',
        name: 'name',
        password: 'password'
    }

    constructor() {
        super();
        this._storage.set(this._storeNames.name, undefined)
        this._storage.set(this._storeNames.password, undefined)
        this._storage.set(this._storeNames.profile, undefined)
    }

    async login(user: anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.login, user)
        const response = await responsePromise;
        if (response.status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth');
            this._storage.set('response', response);
            microEvents.trigger('fromLogin');
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

    async getProfile() {
        console.log(this._storage.get(this._storeNames.profile));
        // const responsePromise = Connector.makeGetRequest(config.api.getProfile)
        //
        // const response = await responsePromise;
        // if (response.status === responseStatuses.OK) {
        //     this._storage.set(this._storeNames.profile, response);
        //     microEvents.trigger('profileChanged');
        //     console.log(this._storage.get(this._storeNames.profile));
        // }
        const response: Profile = {
            firstName: 'Ivan',
            lastName: 'Ivanov',
            email: 'ivan@mailbox.ru',
            avatar: 'img/female-avatar.png',
        }

        this._storage.set(this._storeNames.profile, response);
    }
}

export const reducerUser = new UserStore();
