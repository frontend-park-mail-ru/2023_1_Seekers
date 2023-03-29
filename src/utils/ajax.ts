import { config } from '@config/config'

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
        return fetch(url, options).then((response) =>
            response.json().then((data) => [response.status, data]))
            .catch((error) => [500, error]) as anyObject;
    };

    /**
     * method implementing request post
     * @param  url - path url
     * @param  data - body of ajax request
     * @return request promise
     */
    static makePostRequest = async (url: string, data: object) => {
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: config.headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${config.basePath}:${config.basePort}/${url}`, options) as any;
    };


    /**
     * method implementing request get
     * @param url - path url
     * @return request promise
     */
    static makeGetRequest = async (url: string) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: config.headers,
        };
        return this.makeRequest(`${config.basePath}:${config.basePort}/${url}`, options);
    };


    /**
     * method implementing request delete
     * @param url - path url
     * @return request promise
     */
    static makeDeleteRequest = async (url: string) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: config.headers,
        };
        return this.makeRequest(`$${config.basePath}:${config.basePort}/${url}`, options);
    };
}
