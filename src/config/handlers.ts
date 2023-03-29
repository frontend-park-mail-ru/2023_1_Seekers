import {reducerUser} from '@stores/userStore';
import {reducerLetters} from '@stores/LettersStore';
import {router} from '@utils/router';


const handlers = [
    {type: 'login', method: reducerUser.login.bind(reducerUser)},
    {type: 'initUser', method: reducerLetters.getAll.bind(reducerLetters)},
    {type: 'getProfile', method: reducerUser.getProfile.bind(reducerUser)},
    {type: 'getLetters', method: reducerLetters.getLetters.bind(reducerLetters)},
    {type: 'getMail', method: reducerLetters.getMail.bind(reducerLetters)},
    {type: 'redirect', method: router.open.bind(router)},
];

export {handlers};
