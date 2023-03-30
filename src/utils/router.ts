import {ROOT, routes, privateRoutes} from "@config/config";
import {hrefRegExp} from "@config/regs";
import {reducerUser} from "@stores/userStore";
import {reducerLetters} from "@stores/LettersStore";
import {page404} from "@views/404-page/404-page";


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

        for (const rout of routes) {
            this.register(rout);
        }

        for (const rout of privateRoutes) {
            this.register(rout, true);
        }
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
                    this.open({path: matchedHref}, true, false);
                }
            }
        }
    }

    onPopStateEvent = () => {
        let matchedHref = [];
        matchedHref[0] = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, ''));

        console.log(matchedHref[0]);

        // if (matchedHref[0] !== '/') {
        //     matchedHref = this.matchHref(matchedHref[0]);
        // }

        this.open({path: matchedHref[0]}, false, false);
        this.prevUrl = matchedHref[0];
    }

    open(stateObject: stateObject, pushState: boolean, refresh: boolean) {
        console.log('in open: ' + stateObject.path);
        const location = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, ''));

        if (this.currentPage) {
            this.currentPage.purge();
        }

        this.currentPage = this.views.get(stateObject.path) || this.privateViews.get(stateObject.path);

        this.currentPage.render();
        const path = stateObject.path;
        const props = stateObject.props;

        this.navigate({path, props, pushState});
    }

    refresh(redirect = false) {
        const matchedHref = window.location.pathname;
        if (this.views.get(matchedHref) || this.privateViews.get(matchedHref)) {
            this.open({
                path: matchedHref,
            }, redirect, redirect);
        } else {
            page404.render();
        }
    }

    start() {
        document.addEventListener('click', this.onClickEvent);
        window.addEventListener('popstate', this.onPopStateEvent);
        reducerUser.getProfile()
            .then(() => {
                reducerLetters.getLetters('/inbox');
            })
            .then(() => {
                this.refresh()
            });
    }

    navigate({path, props, pushState}: {path: string, props: string | undefined, pushState: boolean}) {

        console.log('in navigate' + path);

        const location = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.match(hrefRegExp.host)![0]
            : window.location.href.match(hrefRegExp.localhost)![0]);

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

export const router: Router = new Router(ROOT);
