import {config, ROOT, routes, privateRoutes} from "@config/config";
import {Login} from '@views/login-page/login-page'
import {hrefRegExp} from "@config/regs";

interface Class extends anyObject {
    render :Function;
    purge :Function;
}
interface Router {
    root: Element;
    views: Map<string, Class>;
    privateViews: Map<string, Class>;
}

class Router {

    constructor(root :Element) {
        this.root = root;
        this.views = new Map();
        this.privateViews = new Map();
    }


    /**
     * Соопоставляет url и view
     */
    register({ path, view } :{path :string, view :any}, privatePath = false) {
        privatePath?
            this.privateViews.set(path, view):
            this.views.set(path, view);
    }

    matchHref(href :string) {
        let newHref = href;
        if (newHref !== '/') {
            newHref = href.replace(hrefRegExp.endSlash, '');
        }
        return newHref;
    }

    onClickEvent = (e: MouseEvent) => {
        const { target } = e;

        if (target instanceof HTMLElement || target instanceof SVGElement) {
            console.log(target.dataset.section)
            if (target.dataset.section) {
                const matchedHref = this.matchHref(target.dataset.section);
                if(!matchedHref) {
                    return;
                }


                if (this.views.get(matchedHref[0]) || this.privateViews.get(matchedHref[0])) {
                    e.preventDefault();

                }
            }
        }
    }



    start() {

        for (const rout of routes) {
            this.register(rout);
        }

        for (const rout of privateRoutes) {
            this.register(rout, true);
        }





        const currentPage = new Login(ROOT);
        currentPage.render();

        document.addEventListener('click', this.onClickEvent);
    }

}

export default new Router(ROOT);
