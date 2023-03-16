import {LetterList} from '../letterList/letterList.js';
import {Navbar} from '../navbar/navbar.js';
import {Menu} from '../menu/menu.js';
import {Mail} from '../mail/mail.js';

/**
 * class implementing mailBox
 */
export class MailArea {
    /**
     * Private field that contains current HTML-element
     * @type {Element}
     */
    #element;

    #parent;

    /**
     * Private field that contains HTML-elements that inside of current element
     * @type {{}}
     */
    #childs = {};

    /**
     * Private field that contains request worker
     */
    #connector;

    /**
     * information for configuring page
     */
    #context;

    /**
     *
     * @param {Element} parent HTML-element for including content
     * @param {Object} config - template rendering context
     * @param {Object} connector - connector to backend
     */
    constructor(parent, config, connector) {
        this.#parent = parent;
        this.#context = config;
        this.#connector = connector;
    }

    /**
     * method register events button submit and input focus
     */
    registerEventListener = () => {
        addEventListener('toMailArea', this.eventCatcher);
    };

    /**
     * method unregister events button submit and input focus
     */
    unregisterEventListener = () => {
        removeEventListener('toMailArea', this.eventCatcher);
    };

    /**
     *
     * @param {string} listName type of letterList (inbox, outbox, ...))
     * @return {Promise<{}|{data: *, status: *}>}
     */
    getLetterList = async (listName) => {
        const [status, data] = await this.#connector.makeGetRequest('api/v1' + listName)
            .catch((err) => console.log(err));

        switch (status) {
        case 401:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};

        case 500:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};

        case 200:
            break;

        default:
            this.#element.dispatchEvent(new Event('login', {bubbles: true}));
            return {};
        }
        return {status, data};
    };

    /**
     * promise redirect to login page TODO:help
     * @param {object} e - event click on button logout
     */
    eventCatcher = async (e) => {
        const rel = e.target.href.substring(new URL(e.target.href).origin.length);

        switch (rel) {
        default:

            const {status, data} = await this.getLetterList(rel);
            if (status !== 200) return;

            this.#childs['letterList'].purge();

            this.#childs['letterList'] = new LetterList(this.#element);
            this.#childs['letterList'].render(data.messages);
        }
    };

    /**
     * method insert mailbox to HTML
     */
    render = async () => {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['mail-area.hbs']());
        this.#element = document.getElementsByClassName('mail-area')[0];

        const {status, data} = await this.getLetterList('/inbox');
        if (status !== 200) return;

        this.#childs['menu'] = new Menu(this.#element);
        this.#childs['menu'].render(this.#context.menuButtons);

        this.#childs['letterList'] = new LetterList(this.#element);
        this.#childs['letterList'].render(data.messages);

        this.#childs['mail'] = new Mail(this.#element);
        this.#childs['mail'].render({
            from_user: 'example@mailbox.ru', recipient: 'recip@mailbox.ru', time: '2023.14.14',
        });
        this.registerEventListener();
    };


    /**
     * method mailbox page clearing
     */
    purge = () => {
        this.unregisterEventListener();
        Object.values(this.#childs).forEach((child) => {
            child.purge();
        });
        this.#element.remove();
    };
}
