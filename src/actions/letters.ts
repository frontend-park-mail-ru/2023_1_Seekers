
export const actionGetLetters = (name: string) => ({
    type: 'getLetters',
    value: name,
});

export const actionShowMail = (name: string) => ({
    type: 'showMail',
    value: name,
});

export const actionCtxMail = (name: string) => ({
    type: 'ctxMail',
    value: name,
});

export const actionClearCtxMail = () => ({
    type: 'ctxMail',
    value: {},
});

export const actionSignup = (user :user) => ({
    type: 'signup',
    value: user,
});

export const actionInitUser = () => ({
    type: 'initUser',
    value: {},
});

export const actionChangeLetterStateToUnread = (letterId: string) => ({
    type: 'changeLetterStateToUnread',
    value: letterId,
});

export const actionChangeLetterStateToRead = (letterId: string) => ({
    type: 'changeLetterStateToRead',
    value: letterId,
});

export const actionDeleteMail = (id: number) => ({
    type: 'deleteMail',
    value: id,
});

export const actionAddSelectedLetter = (id: number) => ({
    type: 'addSelectedLetter',
    value: id,
});

export const actionPasteEmail = (email: string) => ({
    type: 'pasteEmail',
    value: email,
});

export const actionShowPasteEmail = (email: string) => ({
    type: 'showPasteEmail',
    value: email,
});


export const actionDeleteSelectedLetter = (id: number) => ({
    type: 'deleteSelectedLetter',
    value: id,
});

export const actionSearch = (message: SearchMessage) => ({
    type: 'search',
    value: message,
});

export const actionGetAttach = (attachId: number) => ({
    type: 'getAttach',
    value: attachId,
});

export const actionOpenAttach = (attachId: number) => ({
    type: 'openAttach',
    value: attachId,
});

export const actionAppendMessage = (message: MessageFromSocket) => ({
    type: 'appendMessage',
    value: message,
});

export const actionDownloadArchiveAttach = (href: string) => ({
    type: 'downloadArchiveAttach',
    value: href,
});

export const actionFreePasteEmail = () => ({
    type: 'freePasteEmail',
    value: {},
});

export const actionFilter = (filter: string) => ({
    type: 'filter',
    value: filter,
});
