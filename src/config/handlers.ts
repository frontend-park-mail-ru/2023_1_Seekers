import {reducerUser} from '@stores/userStore';
import {reducerLetters} from '@stores/LettersStore';
import {router} from '@utils/router';


const handlers = [
    {type: 'login', method: reducerUser.login.bind(reducerUser)},
    {type: 'signup', method: reducerUser.signup.bind(reducerUser)},
    {type: 'initUser', method: reducerLetters.getMailboxPage.bind(reducerLetters)},
    {type: 'getProfile', method: reducerUser.getProfile.bind(reducerUser)},
    {type: 'getLetters', method: reducerLetters.getLetters.bind(reducerLetters)},
    {type: 'getMail', method: reducerLetters.getMail.bind(reducerLetters)},
    {type: 'changeURL', method: router.navigate.bind(router)},
    {type: 'redirect', method: router.open.bind(router)},
    {type: 'start', method: router.start.bind(router)},

    {type: 'getProfilePage', method: reducerLetters.getProfilePage.bind(reducerLetters)},
    {type: 'getSecurityPage', method: reducerLetters.getSecurityPage.bind(reducerLetters)},
    {type: 'getMailboxPage', method: reducerLetters.getMailboxPage.bind(reducerLetters)},
];


export {handlers};
