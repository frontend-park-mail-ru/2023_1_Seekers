
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