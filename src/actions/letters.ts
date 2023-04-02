
export const actionGetLetters = (name: string) => ({
    type: 'getLetters',
    value: name,
});

export const actionGetMail = (name: string) => ({
    type: 'getMail',
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
