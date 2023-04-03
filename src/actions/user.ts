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

export const actionSignup = (user: user) => ({
    type: 'signup',
    value: user,
});

export const actionGetProfile = () => ({
    type: 'getProfile',
    value: {},
});

export const actionRedirect = (path: string, pushState: boolean, refresh: boolean) => ({
    type: 'redirect',
    value: {
        path: path,
        pushState: pushState,
        refresh: refresh,
    },
});

export const actionStart = () => ({
    type: 'start',
    value: {},
});


export const actionGetAccountPage = (obj: stateObject) => ({
    type: 'getAccountPage',
    value: obj,
});

export const actionGetProfilePage = () => ({
    type: 'getProfilePage',
    value: {},
});

export const actionGetMailboxPage = (obj: stateObject) => ({
    type: 'getMailboxPage',
    value: obj,
});

export const actionGetSecurityPage = () => ({
    type: 'getSecurityPage',
    value: {},
});

export const actionLogout = () => ({
    type: 'logout',
    value: {},
});

export const actionPostProfile = (user: user) => ({
    type: 'changeName',
    value: user,
});

export const actionPostSecurity = (userPwForm: userPwForm) => ({
    type: 'changePw',
    value: userPwForm,
});

export const actionPutAvatar = (formDataAvatar: FormData) => ({
    type: 'putAvatar',
    value: formDataAvatar,
});

