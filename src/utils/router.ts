import {ROOT, routes, privateRoutes, privateActions} from "@config/config";
import {hrefRegExp} from "@config/regs";
import {reducerUser} from "@stores/userStore";
import {reducerLetters} from "@stores/LettersStore";
import {page404} from "@views/404-page/404-page";
import {actionGetMailboxPage, actionGetProfilePage} from "@actions/user";
import {dispatcher} from "@utils/dispatcher";


interface Class extends anyObject {
    render: Function;
    purge: Function;
}

interface Router {
    root: Element;
    views: Map<string, Class>;
    privateViews: Map<string, Class>;

    actions: Map<string, any>;
    privateActions: Map<string, any>;

    currentPage: any;

    prevUrl: string;
}

class Router {

    constructor(root: Element) {
        this.root = root;
        this.views = new Map();
        this.privateViews = new Map();
        this.privateActions = new Map();

        for (const rout of routes) {
            this.registerView(rout);
        }

        for (const rout of privateRoutes) {
            this.registerView(rout, true);
        }

        for (const action of privateActions) {
            this.registerActions(action, true);
        }
    }


    /**
     * Соопоставляет url и view
     */
    registerView({path, view}: { path: string, view: any }, privatePath = false) {
        privatePath ?
            this.privateViews.set(path, view) :
            this.views.set(path, view);
    }

    registerActions({path, action}: { path: string, action: any }, privateAction = false) {
        privateAction ?
            this.privateActions.set(path, action) :
            this.actions.set(path, action);
    }

    matchHref(href: string) {
        const parts = href.split('/');
        const newHref: string[] = [];
        parts.forEach((part) => {
            if (part !== '') {
                newHref.push('/' + part);
            }
        })

        return newHref;
    }

    onClickEvent = (e: MouseEvent) => {
        // e.preventDefault();
        const {target} = e;

        if (target instanceof HTMLElement || target instanceof SVGElement) {
            if (target.dataset.section) {

                const matchedHref = this.matchHref(target.dataset.section);

                if (this.views.get(matchedHref[0]) || this.privateViews.get(matchedHref[0])) {
                    e.preventDefault();

                    this.navigate({path: target.dataset.section, props: '', pushState: true});
                }
            }
        }
    }

    onPopStateEvent = () => {
        let matchedHref = [];
        matchedHref[0] = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, ''));

        matchedHref = this.matchHref(matchedHref[0]);

        // if (matchedHref[0] !== '/') {
        //     matchedHref = this.matchHref(matchedHref[0]);
        // }
        console.log(matchedHref);
        this.open({path: matchedHref[0], props: matchedHref[1]}, false, false);
        this.prevUrl = matchedHref[0];
    }

    open(stateObject: stateObject, pushState: boolean, refresh: boolean) {
        if (this.currentPage) {
            this.currentPage.purge();
        }

        this.currentPage = this.views.get(stateObject.path) || this.privateViews.get(stateObject.path);

        this.currentPage.render();
        const path = stateObject.path;
        const props = stateObject.props;

        if (stateObject.path !== '/login' && stateObject.path !== '/signup') {
            dispatcher.dispatch(this.privateActions.get(stateObject.path)!(stateObject));
        }

        this.navigate({path, props, pushState});
    }

    refresh(redirect = false) {
        const matchedHref = window.location.pathname;
        if (this.views.get(matchedHref) || this.privateViews.get(matchedHref)) {
            this.open({
                path: matchedHref,
            }, !redirect, !redirect);
        } else {
            page404.render();
        }
    }

    start() {
        document.addEventListener('click', this.onClickEvent);
        window.addEventListener('popstate', this.onPopStateEvent);


        // reducerUser.getProfile()
        //     .then(() => {
        //         reducerLetters.getLetters('/inbox');
        //     })
        //     .then(() => {
        this.refresh()
        //     });
    }

    navigate({path, props, pushState}: { path: string, props: string | undefined, pushState: boolean }) {
        console.log('in navigate' + path);

        const location = decodeURIComponent((window.location.href.match(hrefRegExp.host))
            ? window.location.href.match(hrefRegExp.host)![0]
            : window.location.href.match(hrefRegExp.localhost)![0]);

        if (pushState) {
            if (props) {
                window.history.pushState(props, "", `${location + path}${props}`);
            } else {
                window.history.pushState(props, "", location + path);
            }
        } else {
            if (props) {
                window.history.replaceState(props, "", `${location + path}${props}`);
            } else {
                window.history.replaceState(props, "", location + path);
            }
        }
        this.prevUrl = path;
    }

}

export const router: Router = new Router(ROOT);
