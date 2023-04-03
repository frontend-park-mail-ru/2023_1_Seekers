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
    {type: 'redirect', method: router.open.bind(router)},
    {type: 'start', method: router.start.bind(router)},

    {type: 'getAccountPage', method: reducerLetters.getAccountPage.bind(reducerLetters)},
    {type: 'getProfilePage', method: reducerLetters.getProfilePage.bind(reducerLetters)},
    {type: 'getSecurityPage', method: reducerLetters.getSecurityPage.bind(reducerLetters)},
    {type: 'getMailboxPage', method: reducerLetters.getMailboxPage.bind(reducerLetters)},
    {type: 'changeLetterStateToUnread', method: reducerLetters.changeLetterStateToUnread.bind(reducerLetters)},
    {type: 'changeLetterStateToRead', method: reducerLetters.changeLetterStateToRead.bind(reducerLetters)},

    {type: 'changeName', method: reducerUser.changeName.bind(reducerUser)},
    {type: 'changePw', method: reducerUser.changePw.bind(reducerUser)},
];


export {handlers};
