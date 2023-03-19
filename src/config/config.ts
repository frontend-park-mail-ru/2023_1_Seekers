'use strict';

const prefixApi = 'api/v1/';

export const ROOT = document.getElementById('root');

// export const routes = [
//     { path: '/', view: mainPage },
//     { path: '/login/', view: login },
//     { path: '/signup/', view: signup },
// ];

// export const privateRoutes = [
//     { path: '/profile/', view: profile },
// ];

export const responsStatuses = {
    OK: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
};



export const config = {
    basePath: 'http://127.0.0.1',
    basePort: '8002',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
    href: {
        main: '/',
        login: '/login',
        signup: '/signup',
        logout: '/logout',
        profile: '/profile',
        notFound: '/notfound'
    },
    api: {
        login: `${prefixApi}login`,
        signup: `${prefixApi}signup`,
        logout: `${prefixApi}logout`,
        // session: `${prefixApi}session`,
    }
}
