import BaseStore from '@stores/base-store';
import connector from '@utils/ajax'
import { config } from '@config/config'
import { UserActionTypes } from '@actions/user';

/**
 * class implementing user-store
 */
class UserStore extends BaseStore {
    #context: any;

    _storeNames = {
        isAuth: 'isAuth',
        responseCode: 'responseCode',
        name: 'name',
        email: 'email',
        password: 'password',
        context: 'context',
        avatar: 'avatar',
        csrf: 'csrf',
    };

    /**
     * constructor
     */
    constructor(config: any) {
        super();
        this.#context = config;
        this._storage = new Map();
        this._storage.set(this._storeNames.isAuth, false);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.name, null);
        this._storage.set(this._storeNames.email, null);
        // this._storage.set(this._storeNames.avatar, config.defaultAvatar);
        this._storage.set(this._storeNames.context, this.#context);
        this._storage.set(this._storeNames.csrf, null);
    }

    override async _onDispatch(payload: dispatcherPayload) {
        switch (payload.actionName) {
            case UserActionTypes.USER_LOGIN:
                await this._login(payload.data);
                this._emitChange([UserActionTypes.USER_LOGIN]);
                break;

        }
    }


    /**
     * method implementing auth
     * @param path - request path
     * @param data - auth data
     */
    async #auth(path: string, data: object) {
        const [status, body] = await connector.makePostRequest(path, data)
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);

    }

    /**
     * method implementing login
     * @param data - data for login
     */
    async _login(data: userData) {
        const {email, password} = data;
        await this.#auth(config.api.login, {
            password,
            email,
        });
    }
}

export default new UserStore(config);
