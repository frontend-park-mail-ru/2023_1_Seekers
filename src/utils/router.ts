import {config, ROOT, routes, privateRoutes} from "@config/config";
import {loginPage} from '@views/login-page/login-page'
import {signupPage} from '@views/signup-page/signup-page'
import {hrefRegExp} from "@config/regs";

interface Class extends anyObject {
    render: Function;
    purge: Function;
}

interface Router {
    root: Element;
    views: Map<string, Class>;
    privateViews: Map<string, Class>;
    currentPage: any;

    prevUrl: string;
}

interface stateObject {
    path: string;
    props?: string;
}

class Router {

    constructor(root: Element) {
        this.root = root;
        this.views = new Map();
        this.privateViews = new Map();
    }


    /**
     * Соопоставляет url и view
     */
    register({path, view}: { path: string, view: any }, privatePath = false) {
        privatePath ?
            this.privateViews.set(path, view) :
            this.views.set(path, view);
    }

    matchHref(href: string) {
        let newHref = href;
        if (newHref !== '/') {
            newHref = href.replace(hrefRegExp.endSlash, '');
        }
        return newHref;
    }

    onClickEvent = (e: MouseEvent) => {
        const {target} = e;

        if (target instanceof HTMLElement || target instanceof SVGElement) {

            if (target.dataset.section) {
                const matchedHref = this.matchHref(target.dataset.section);
                if (!matchedHref) {
                    return;
                }
                if (this.views.get(matchedHref) || this.privateViews.get(matchedHref)) {
                    e.preventDefault();
                    this.nextPage({path: matchedHref}, {pushState: true,  refresh: false});
                }
            }
        }
    }

    onPopStateEvent = () => {
        let matchedHref = [];
        matchedHref[0] = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, ''));

        console.log(window.location.href.match(hrefRegExp.host));

        // if (matchedHref[0] !== '/') {
        //     matchedHref = this.matchHref(matchedHref[0]);
        // }

        this.nextPage({ path: '/login'}, { pushState: false, refresh: false }); //TODO: fix it(delete host and send right path)
        this.prevUrl = matchedHref[0];
    }

    nextPage(stateObject: stateObject, { pushState, refresh } :{ pushState :boolean, refresh: boolean}) {
        const location = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, ''));

        this.currentPage.purge();

        this.currentPage = this.views.get(stateObject.path) || this.privateViews.get(stateObject.path);

        this.currentPage.render();
        this.navigate(stateObject, pushState);
    }

    start() {

        for (const rout of routes) {
            this.register(rout);
        }

        for (const rout of privateRoutes) {
            this.register(rout, true);
        }


        this.currentPage = loginPage;
        console.log(this.currentPage)
        loginPage.render();

        document.addEventListener('click', this.onClickEvent);
        window.addEventListener('popstate', this.onPopStateEvent);
    }

    navigate({ path, props } :stateObject, pushState = false) {
        const location = this.matchHref(window.location.href);


        if (pushState) {
            if (props) {
                window.history.pushState(props, "", `${location + path}${props}/`);
            } else {
                window.history.pushState(props, "", location + path);
            }
        } else {
            if (props) {
                window.history.replaceState(props, "", `${location + path}${props}/`);
            } else {
                window.history.replaceState(props, "", location + path);
            }
        }
        this.prevUrl = path;
    }

}

export default new Router(ROOT);
