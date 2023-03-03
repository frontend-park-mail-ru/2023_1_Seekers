export default class Request
{
    #baseURI;

    #port;

    #headers;


    constructor(URI, port, headers) {
        this.#baseURI = URI;
        this.#port = port;
        this.#headers = headers;
    }

    makeRequest = (url, options) => {
        return fetch(url, options).then((response) => response.ok ?
            response.json().then((data) => [response.status, data]) :
            [response.status, response.body]).catch((error) => [500, error]);
    };


    makePostRequest = async (url, data) => {
        const options = {
            method: 'post',
            mode: 'no-cors',
            credentials: 'include',
            headers: this.#headers,
            body: JSON.stringify(data),
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${url}`, options);
    };


    /**
     * Метод, реализующий запрос GET.
     * @param {string} url - путь URL
     * @return {Promise<Response>} - промис запроса
     */
    makeGetRequest = async (url) => {
        const options = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${url}`, options);
    };



    /**
     * Метод, реализующий запрос DELETE
     * @param {string} url - путь URL
     * @return {Promise<Response>} промис запроса
     */
    makeDeleteRequest = async (url) => {
        const options = {
            method: 'delete',
            mode: 'cors',
            credentials: 'include',
            headers: this.#headers,
        };
        return this.makeRequest(`${this.#baseURI}:${this.#port}/${url}`, options);
    };
}