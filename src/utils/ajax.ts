import {config} from '@config/config';

/**
 * class implementing request work
 */
export class Connector {
    /**
     * method implementing http-request
     * @param url - path url
     * @param options - options of request
     * @return request promise
     */
    static makeRequest = (url: string, options: object) => {
        return fetch(url, options)
            .then((response) => response.json()
                .then((data) => {
                    console.log(response);
                    return [response.status, data];
                } )
                .catch((error) => {
                    console.log(error);
                    return [response.status, {}];
                }))
            .catch((error) => [500, error]) as anyObject;
    };

    /**
     * method implementing request post
     * @param  url - path url
     * @param  data - body of ajax request
     * @return request promise
     */
    static makePostRequest = async (url: string, data: object) => {
        const csrfResponse = await fetch(`${config.basePath}/${config.api.csrf}`, {
            method: 'get',
            headers: new Headers(config.headers),
            credentials: 'include',
        });

        let headers;
        const csrfToken = csrfResponse.headers.get('Csrf-Token');
        if (csrfToken !== null) {
            headers = {
                ...config.headers,
                'Csrf-Token': csrfToken,
            };
        } else {
            headers = config.headers;
        }

        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers,
            body: JSON.stringify(data),
        };

        return this.makeRequest(`${config.basePath}/${url}`, options) as any;
    };

    /**
     * method implementing request post
     * @param  url - path url
     * @param  data - body of ajax request
     * @param uploadFile
     * @return request promise
     */
    static makePutRequest = async ({url, data}: { url: string, data: any }, uploadFile = false) => {
        const csrfResponse = await fetch(`${config.basePath}/${config.api.csrf}`, {
            method: 'get',
            headers: new Headers(config.headers),
            credentials: 'include',
        });
        const csrfToken = csrfResponse.headers.get('Csrf-Token');

        let headers;
        if (uploadFile) {
            if (csrfToken !== null) {
                headers = {
                    'Csrf-Token': csrfToken,
                };
            } else {
                headers = {};
            }
            const options = {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                headers,
                body: data,
            };
            return this.makeRequest(`${config.basePath}/${url}`, options) as any;
        } else {
            if (csrfToken !== null) {
                headers = {
                    ...config.headers,
                    'Csrf-Token': csrfToken,
                };
            } else {
                headers = config.headers;
            }

            const body = JSON.stringify(data);
            const options = {
                method: 'put',
                mode: 'cors',
                credentials: 'include',
                headers,
                body,
            };
            return this.makeRequest(`${config.basePath}/${url}`, options) as any;
        }
    };


    /**
     * method implementing request get
     * @param url - path url
     * @return request promise
     */
    static makeGetRequest = async (url: string) => {
        const csrfResponse = await fetch(`${config.basePath}/${config.api.csrf}`, {
            method: 'get',
            headers: new Headers(config.headers),
            credentials: 'include',
        });

        let headers;
        const csrfToken = csrfResponse.headers.get('Csrf-Token');
        if (csrfToken !== null) {
            headers = {
                ...config.headers,
                'Csrf-Token': csrfToken,
            };
        } else {
            headers = config.headers;
        }

        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers,
        };
        return this.makeRequest(`${config.basePath}/${url}`, options) as any;
    };


    /**
     * method implementing request get
     * @param url - path url
     * @return request promise
     */
    static downloadFileRequest = async (url: string) => {
        const csrfResponse = await fetch(`${config.basePath}/${config.api.csrf}`, {
            method: 'get',
            headers: new Headers(config.headers),
            credentials: 'include',
        });

        let headers;
        const csrfToken = csrfResponse.headers.get('Csrf-Token');
        if (csrfToken !== null) {
            headers = {
                ...config.headers,
                'Csrf-Token': csrfToken,
            };
        } else {
            headers = config.headers;
        }

        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers,
        };
        return fetch(url, options as object)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    };


    /**
     * method implementing request delete
     * @param url - path url
     * @return request promise
     */
    static makeDeleteRequest = async (url: string) => {
        const csrfResponse = await fetch(`${config.basePath}/${config.api.csrf}`, {
            method: 'get',
            headers: new Headers(config.headers),
            credentials: 'include',
        });

        let headers;
        const csrfToken = csrfResponse.headers.get('Csrf-Token');
        if (csrfToken !== null) {
            headers = {
                ...config.headers,
                'Csrf-Token': csrfToken,
            };
        } else {
            headers = config.headers;
        }
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers,
        };
        return this.makeRequest(`${config.basePath}/${url}`, options) as any;
    };
}
