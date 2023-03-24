import {Connector} from "@utils/ajax";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";

interface UserResponse {
    status: number;
    body: user
}

class UserStore {

    constructor() {

    }

    async login(user :anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.login, user)
        const response = await responsePromise as UserResponse;
        if (response.status === responseStatuses.OK) {
            return {
                user: response.body,
                statusLogin: null,
            } as anyObject;
        }

        microEvents.trigger('fromLogin');

        return {statusLogin: response.status};
    }

    async signup(user :anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.signup, user)

        const response = await responsePromise as UserResponse;
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
