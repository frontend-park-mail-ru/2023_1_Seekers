import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';

/**
 * class that implements all possible actions with user data
 */
class UserStore extends BaseStore {
    _storeNames = {
        profile: 'profile',
        name: 'name',
        password: 'password',
        status: 'status',
        body: 'body',
        localRecipients: 'localRecipients',
        emails: 'emails',
    };

    /**
     * constructor that sets initial state of the store
     */
    constructor() {
        super();
        this._storage.set(this._storeNames.name, undefined);
        this._storage.set(this._storeNames.password, undefined);
        this._storage.set(this._storeNames.profile, undefined);
        this._storage.set(this._storeNames.localRecipients, []);
    }

    /**
     * function that makes request to log in user
     * @param user - user data
     */
    async login(user: user) {
        const responsePromise = Connector.makePostRequest(config.api.login, user);
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth');
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        microEvents.trigger('fromLogin');
    }

    /**
     * function that makes request to sign up user
     * @param user - user data
     */
    async signup(user: user) {
        const responsePromise = Connector.makePostRequest(config.api.signup, user);
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
            this._storage.set(this._storeNames.name, 'auth');
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        microEvents.trigger('fromSignup');
    }

    /**
     * function that makes request to get user data from backend
     */
    async getProfile() {
        const responsePromise = Connector.makeGetRequest(config.api.getProfile);

        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {

            const emailsPromise = Connector.makeGetRequest(config.api.getAnonymous);

            const [emailsStatus, emailsBody] = await emailsPromise;
            this._storage.set(this._storeNames.emails, emailsBody);

            console.log(this.getAnonymousEmails());

            this._storage.set(this._storeNames.profile,
                {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    avatar: `${config.basePath}/${config.api.avatar}` +
                        `?email=${body.email}&t=${new Date().getTime()}`,
                });
            microEvents.trigger('profileChanged');
        }
    }

    /**
     * function that makes request to log out user
     */
    async logout() {
        await Connector.makeDeleteRequest(config.api.logout);
        microEvents.trigger('loggedOut');
    }

    /**
     * function that makes request to change user name
     */
    async changeName(user: user) {
        const responsePromise = Connector.makePutRequest({url: config.api.getProfile, data: user});
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        await this.getProfile();
        microEvents.trigger('fromProfile');
    }

    /**
     * function that makes request to change user password
     */
    async changePw(userPwForm: userPwForm) {
        const responsePromise = Connector.makePutRequest({url: config.api.password, data: userPwForm});
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        microEvents.trigger('fromSecurity');
    }

    /**
     * function that makes request to change user avatar
     */
    async putAvatar(formDataAvatar: FormData) {
        const responsePromise = Connector.makePutRequest(
            {url: config.api.avatar, data: formDataAvatar}, true);
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._changed = true;
        }
        this._storage.set(this._storeNames.body, body);
        this._storage.set(this._storeNames.status, status);
        await this.getProfile();
        microEvents.trigger('fromAvatar');
    }

    /**
     * function that makes request to change user avatar
     */
    async getRecipients() {
        const responsePromise = Connector.makeGetRequest(
            config.api.recipientsSearch);
        const [status, body] = await responsePromise;
        if (status === responseStatuses.OK) {
            const recipients: ProfileData[] = [];
            body.users.forEach((user: ProfileData) => {
                user.avatar = `${config.basePath}/${config.api.avatar}` +
                    `?email=${user.email}&t=${new Date().getTime()}`;
                recipients.push(user);
            });
            this._storage.set(this._storeNames.localRecipients, recipients);
        }
    }

    /**
     * function that checks if user is authenticated
     */
    checkAuth() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${config.basePath}/${config.api.auth}`, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('accept', 'application/json');
        xhr.withCredentials = true;
        xhr.onload = (e) => {
            this._storage.set(this._storeNames.status, xhr.status);
        };
        xhr.send('null');
    }

    /**
     * function that triggers signup render
     */
    getSignupPage = async () => {
        microEvents.trigger('renderSignup');
    };

    /**
     * function that triggers login render
     */
    getLoginPage = async () => {
        microEvents.trigger('renderLogin');
    };

    /**
     * function that triggers login render
     */
    getMyProfile = () => {
        return this._storage.get(this._storeNames.profile) as ProfileData;
    };

    /**
     * function that get local recipients
     */
    getLocalRecipients = () => {
        return this._storage.get(this._storeNames.localRecipients) as ProfileData[];
    };

    getAnonymousEmails = () => {
        return this._storage.get(this._storeNames.emails) as AnonymousEmails;
    };
}

export const reducerUser = new UserStore();
