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
});

export const actionRedirect = (path:  string, pushState: boolean, refresh: boolean) => ({
    type: 'redirect',
    value: {
        path: path,
        pushState: pushState,
        refresh: refresh,
    },
});

export const actionChangeURL = (value: any) => ({
    type: 'changeURL',
    value: value,

});

export const actionStart = () => ({
    type: 'start',
    value: {},
});

export const actionGetProfilePage = () => ({
    type: 'getProfilePage',
    value: {},
});

export const actionGetMailboxPage = (path: string) => ({
    type: 'getMailboxPage',
    value: path,
});

export const actionGetSecurityPage = () => ({
    type: 'getSecurityPage',
    value: {},
});

