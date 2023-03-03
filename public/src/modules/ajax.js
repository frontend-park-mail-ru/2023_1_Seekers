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



}