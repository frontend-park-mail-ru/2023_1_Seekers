import {reducerUser} from '@stores/userStore';
import {reducerLetters} from '@stores/LettersStore';
import {router} from '@utils/router';
import {reducerNewMail} from '@stores/NewMailStore';
import {reducerFolder} from '@stores/FolderStore';


const handlers = [
    {type: 'login', method: reducerUser.login.bind(reducerUser)},
    {type: 'signup', method: reducerUser.signup.bind(reducerUser)},
    {type: 'initUser', method: reducerLetters.getMailboxPage.bind(reducerLetters)},
    {type: 'getProfile', method: reducerUser.getProfile.bind(reducerUser)},
    {type: 'getLetters', method: reducerLetters.getLetters.bind(reducerLetters)},
    {type: 'showMail', method: reducerLetters.showMail.bind(reducerLetters)},
    {type: 'ctxMail', method: reducerLetters.getCtxMail.bind(reducerLetters)},
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
    {type: 'deleteMail', method: reducerLetters.deleteMail.bind(reducerLetters)},
    {type: 'addSelectedLetter', method: reducerLetters.addSelectedLetter.bind(reducerLetters)},
    {type: 'deleteSelectedLetter', method: reducerLetters.deleteSelectedLetter.bind(reducerLetters)},
    {type: 'search', method: reducerLetters.getLettersAfterSearch.bind(reducerLetters)},
    {type: 'pasteEmail', method: reducerLetters.pasteEmail.bind(reducerLetters)},
    {type: 'showPasteEmail', method: reducerLetters.showPasteEmail.bind(reducerLetters)},
    {type: 'getAttach', method: reducerLetters.getAttachment.bind(reducerLetters)},

    {type: 'createNewMail', method: reducerNewMail.createNewMail.bind(reducerNewMail)},
    {type: 'replyToMail', method: reducerNewMail.replyToMail.bind(reducerNewMail)},
    {type: 'forwardMail', method: reducerNewMail.forwardMail.bind(reducerNewMail)},
    {type: 'sendMail', method: reducerNewMail.sendMail.bind(reducerNewMail)},
    {type: 'sendDraft', method: reducerNewMail.sendDraft.bind(reducerNewMail)},
    {type: 'selectDraft', method: reducerNewMail.selectDraft.bind(reducerNewMail)},
    {type: 'removeAttachment', method: reducerNewMail.removeAttachment.bind(reducerNewMail)},
    {type: 'addAttachment', method: reducerNewMail.addAttachment.bind(reducerNewMail)},

    {type: 'sendFolderToCreate', method: reducerFolder.sendFolderToCreate.bind(reducerFolder)},
    {type: 'createFolder', method: reducerFolder.createNewFolder.bind(reducerFolder)},
    {type: 'transmitToFolder', method: reducerFolder.transmitToFolder.bind(reducerFolder)},
    {type: 'deleteFolderByCtx', method: reducerFolder.deleteFolderByCtx.bind(reducerFolder)},
    {type: 'renameFolderByCtx', method: reducerFolder.renameFolderByCtx.bind(reducerFolder)},
    {type: 'setContextFolder', method: reducerFolder.setCtxFolder.bind(reducerFolder)},
    {type: 'createRenameFolderForm', method: reducerFolder.createRenameFolderForm.bind(reducerFolder)},

    {type: 'changeName', method: reducerUser.changeName.bind(reducerUser)},
    {type: 'changePw', method: reducerUser.changePw.bind(reducerUser)},
    {type: 'putAvatar', method: reducerUser.putAvatar.bind(reducerUser)},

    {type: 'toSignup', method: reducerUser.getSignupPage.bind(reducerUser)},
    {type: 'toLogin', method: reducerUser.getLoginPage.bind(reducerUser)},
];


export {handlers};
