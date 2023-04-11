import {ROOT, routes, privateRoutes, privateActions, responseStatuses} from '@config/config';
import {hrefRegExp} from '@config/regs';
import {reducerUser} from '@stores/userStore';
import {page404} from '@views/404-page/404-page';
import {dispatcher} from '@utils/dispatcher';
import {loaderPage} from '@views/loader-page/loader-page';


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
    redirectUrl: string | undefined;
}

/**
 * class that implements router for current application
 */
class Router {
    /**
     * set initial state of router
     * @param root - contains root element for the application (pages)
     */
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
     * function that matches url path to views
     * @param path - href
     * @param view - view to render
     * @param privatePath - is url path private?
     */
    registerView({path, view}: { path: string, view: any }, privatePath = false) {
        privatePath ?
            this.privateViews.set(path, view) :
            this.views.set(path, view);
    }

    /**
     * function that matches url path to actions
     * @param path - href
     * @param action - action to dispatch
     * @param privateAction - is action private?
     */
    registerActions({path, action}: { path: string, action: any }, privateAction = false) {
        privateAction ?
            this.privateActions.set(path, action) :
            this.actions.set(path, action);
    }

    /**
     * function that parse href
     * @param href - href to parse
     */
    matchHref(href: string) {
        const parts = href.split('/');
        const newHref: string[] = [];
        parts.forEach((part) => {
            if (part !== '') {
                newHref.push('/' + part);
            }
        });

        return newHref;
    }

    /**
     * the function that triggers when user clicks to something on the page.
     * It decides whether to change the address bar or not
     * @param e - event
     */
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
    };

    /**
     * the function that triggers when user clicks to navigation buttons.
     */
    onPopStateEvent = () => {
        let matchedHref = [];
        matchedHref[0] = decodeURIComponent((window.location.href.match(hrefRegExp.host)) ?
            window.location.href.replace(hrefRegExp.host, '') :
            window.location.href.replace(hrefRegExp.localhost, ''));

        matchedHref = this.matchHref(matchedHref[0]);
        console.log(matchedHref);

        this.open({path: matchedHref[0], props: matchedHref[1]}, false, false);
        this.prevUrl = matchedHref[0];
    };

    /**
     * the function that opens another page.
     */
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

    /**
     * the function that contains redirection logic
     * when unauthorized user tries to access to private href.
     * @param href - href to access
     */
    redirectHandle(href: string) {
        reducerUser.checkAuth();
        const isAuth = reducerUser._storage.get(reducerUser._storeNames.status) === responseStatuses.OK;
        if (href === '/') {
            if (isAuth) {
                return '/inbox';
            } else {
                return '/login';
            }
        } else {
            if (!isAuth) {
                if (href === '/signup') {
                    return href;
                }
                this.redirectUrl = href;
                return '/login';
            } else {
                if (this.redirectUrl) {
                    href = this.redirectUrl;
                    this.redirectUrl = undefined;
                }
                return href;
            }
        }
    }

    /**
     * the function that contains redirection logic
     * between pages
     */
    refresh(redirect = false) {
        console.log(window.location.pathname);
        const href = this.redirectHandle(window.location.pathname);
        console.log(href);
        const matchedHref = this.matchHref(href);
        if (this.views.get(matchedHref[0]) || this.privateViews.get(matchedHref[0])) {
            this.open({
                path: matchedHref[0],
                props: matchedHref[1],
            }, !redirect, !redirect);
        } else {
            page404.render();
        }
    }

    /**
     * function that triggers at start of the application
     */
    start() {
        document.addEventListener('click', this.onClickEvent);
        window.addEventListener('popstate', this.onPopStateEvent);
        console.log('start');
        this.currentPage = loaderPage;
        this.currentPage.render();
        this.refresh();
    }

    /**
     * function that save current url to the history
     * @param path - href to save
     * @param props - additional info about url
     * @param pushState - is saving needed?
     */
    navigate({path, props, pushState}: { path: string, props: string | undefined, pushState: boolean }) {
        const location = decodeURIComponent((window.location.href.match(hrefRegExp.host)) ?
            window.location.href.match(hrefRegExp.host)![0] :
            window.location.href.match(hrefRegExp.localhost)![0]);

        if (pushState) {
            if (props) {
                window.history.pushState(props, '', `${location + path}${props}`);
            } else {
                window.history.pushState(props, '', location + path);
            }
        } else {
            if (props) {
                window.history.replaceState(props, '', `${location + path}${props}`);
            } else {
                window.history.replaceState(props, '', location + path);
            }
        }
        this.prevUrl = path;
    }
}

export const router: Router = new Router(ROOT);
