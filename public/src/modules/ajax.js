/**
 * class implementing request work
 */
export default class Request
{
    #baseURI;

    #port;

    #headers;

    /**
     *
     * @param {string} URI  - path uri
     * @param {int} port - port uri
     * @param {object} headers - headers of request
     */
    constructor(URI, port, headers) {
        this.#baseURI = URI;
        this.#port = port;
        this.#headers = headers;
    }

    /**
     * method implementing http-request
     * @param {string} uri - path uri
     * @param {object} options - options of request
     * @returns {Promise<Response>} - request promise
     */
    makeRequest = (uri, options) => {
        return fetch(uri, options).then((response) => response.ok ?
            response.json().then((data) => [response.status, data]) :
            [response.status, response.body]).catch((error) => [500, error]);
    };

    /**
     * method implementing request post
     * @param {string} uri - path uri
     * @param {object} data - body of ajax request
     * @return {Promise<Response>} - request promise
     */
    makePostRequest = async (uri, data) => {
        const options = {
            method: 'post',
            mode: 'no-cors',
            credentials: 'include',
            headers: this.#headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${uri}`, options);
    };


    /**
     * method implementing request get
     * @param {string} uri - path uri
     * @return {Promise<Response>} - request promise
     */
    makeGetRequest = async (uri) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${uri}`, options);
    };



    /**
     * method implementing request delete
     * @param {string} uri - path uri
     * @return {Promise<Response>} - request promise
     */
    makeDeleteRequest = async (uri) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${uri}`, options);
    };
}