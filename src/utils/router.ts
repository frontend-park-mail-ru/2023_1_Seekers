import {config, ROOT} from "@config/config";
import {Login} from '@views/login-page/login-page'

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

        this.#currentPage = new Login(ROOT);
        this.#currentPage.render();
    }

}

export default new Router(ROOT);