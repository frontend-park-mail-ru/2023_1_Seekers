import {reducerUser} from '@stores/userStore';
import {reducerLetters} from '@stores/LettersStore';
import {router} from '@utils/router';
import {reducerNewMail} from '@stores/NewMailStore';


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
    {type: 'changeLetterStateToUnread',
        method: reducerLetters.changeLetterStateToUnread.bind(reducerLetters)},
    {type: 'changeLetterStateToRead',
        method: reducerLetters.changeLetterStateToRead.bind(reducerLetters)},
    {type: 'logout', method: reducerUser.logout.bind(reducerUser)},

    {type: 'createNewMail', method: reducerNewMail.createNewMail.bind(reducerNewMail)},
    {type: 'replyToMail', method: reducerNewMail.replyToMail.bind(reducerNewMail)},
    {type: 'forwardMail', method: reducerNewMail.forwardMail.bind(reducerNewMail)},
    {type: 'sendMail', method: reducerNewMail.sendMail.bind(reducerNewMail)},

    {type: 'changeName', method: reducerUser.changeName.bind(reducerUser)},
    {type: 'changePw', method: reducerUser.changePw.bind(reducerUser)},
    {type: 'putAvatar', method: reducerUser.putAvatar.bind(reducerUser)},

    {type: 'toSignup', method: reducerUser.getSignupPage.bind(reducerUser)},
    {type: 'toLogin', method: reducerUser.getLoginPage.bind(reducerUser)},
];


export {handlers};
