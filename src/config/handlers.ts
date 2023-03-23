import {reducerUser} from "@stores/reducers/reducerUser";

const handlers = [
    { type: 'login', method: reducerUser.login.bind(reducerUser) },
]

export { handlers };
