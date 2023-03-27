export const UserActionTypes = {
    USER_FETCH: 'USER_FETCH',
    USER_REGISTER: 'USER_REGISTER',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
};

export const actionLogin = (user: user) => ({
    type: 'login',
    value: user,
});

export const actionSignup = (user :user) => ({
    type: 'signup',
    value: user,
});

export const actionGetProfile = () => ({
    type: 'getProfile',
    value: {},
})
