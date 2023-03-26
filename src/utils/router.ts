import {config, ROOT} from "@config/config";
import {Login} from '@views/login-page/login-page'
import {MailBox} from "@views/mailbox-page/mailbox-page";
import {dispatcher} from "@utils/dispatcher";
import {actionInitUser} from "@actions/letters";

class Router {
    #pathToPage: Map<string, CustomPages>;
    #root: Element | null;
    #currentPage: CustomPages;
    #titles: Map<string, string>;

    constructor(root :Element) {
        this.#root = root;
        this.#pathToPage = new Map();
        this.#titles = new Map();
    }


    renderPage(PageConstructor: CustomPages) {
        const page = new PageConstructor(this.#root);

        return (context: object) => {
            page.render(context);
            return page;
        };
    }

    register(path: string, view: CustomPages) {
        this.#pathToPage.set(path, this.renderPage(view));
    }

    remove(path: string) {
        this.#pathToPage.delete(path);
    }


    start() {

        this.register(config.href.login, Login);

        this.#titles.set(config.href.login, 'Вход');

        dispatcher.dispatch(actionInitUser()).then(() => {
            this.#currentPage = new MailBox(ROOT);
            this.#currentPage.render();
        })

    }

}

export default new Router(ROOT);
