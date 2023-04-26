
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
