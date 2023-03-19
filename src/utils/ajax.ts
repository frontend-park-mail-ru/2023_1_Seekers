/**
 * class implementing request work
 */
export class Connector {
    readonly #origin;

    readonly #port;

    readonly #headers;

    /**
     *
     * @param  origin  -
     * @param  port -
     * @param  headers - headers of request
     */
    constructor(origin: string, port: number, headers: object) {
        this.#origin = origin;
        this.#port = port;
        this.#headers = headers;
    }

    /**
     * method implementing http-request
     * @param url - path url
     * @param options - options of request
     * @return request promise
     */
    makeRequest = (url: string, options: object) => {
        return fetch(url, options).then((response) =>
            response.json().then((data) => [response.status, data]))
            .catch((error) => [500, error]);
    };

    /**
     * method implementing request post
     * @param  url - path url
     * @param  data - body of ajax request
     * @return request promise
     */
    makePostRequest = async (url: string, data: object) => {
        const options = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${this.#origin}:${this.#port}/${url}`, options);
    };


    /**
     * method implementing request get
     * @param url - path url
     * @return request promise
     */
    makeGetRequest = async (url: string) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#origin}:${this.#port}/${url}`, options);
    };


    /**
     * method implementing request delete
     * @param url - path url
     * @return request promise
     */
    makeDeleteRequest = async (url: string) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#origin}:${this.#port}/${url}`, options);
    };
}
