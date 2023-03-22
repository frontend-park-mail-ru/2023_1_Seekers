import {Connector} from "@utils/ajax";
import {config} from "@config/config";

interface UserResponse {
    status: number;
    body: user
}

class ReducerUser {
    async login(user :anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.login, user)

        const response = await responsePromise as UserResponse;

        return {statusLogin: response.status};
    }

    async signup(user :anyObject) {
        const responsePromise = Connector.makePostRequest(config.api.signup, user)

        const response = await responsePromise as UserResponse;

        return {statusSignup: response.status};
    }
}

export const reducerUser = new ReducerUser();
