import {reducerUser} from "@stores/reducers/reducerUser";

const handlers = [
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
]
