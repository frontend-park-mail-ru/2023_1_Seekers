
export const actionGetLetters = (name: string) => ({
    type: 'getLetters',
    value: name,
});

export const actionSignup = (user :user) => ({
    type: 'signup',
    value: user,
});