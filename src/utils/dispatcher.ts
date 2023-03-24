import {handlers} from '@config/handlers'

interface Dispatcher {
    state: { [key: string]: any };
    mapActionHandlers: Map<string, Function>;
    // mapSubscribers: Map<string, Array<Function>>;
    // mapOnceSubscribers: Map<string, Array<Function>>;
}

class Dispatcher {
    constructor() {
        this.state = {};
        this.mapActionHandlers = new Map();
        // this.mapSubscribers = new Map();
        // this.mapOnceSubscribers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    register({type, method}: { type: string, method: Function }) {
        this.mapActionHandlers.set(type, method);
    }

    // subscribe(type: string, callback: Function, once = false) {
    //     const arraySubscribe = !once ? this.mapSubscribers.get(type) : this.mapOnceSubscribers.get(type);
    //     if (arraySubscribe) {
    //         arraySubscribe.push(callback);
    //     } else {
    //         !once ? this.mapSubscribers.set(type, [callback]) : this.mapOnceSubscribers.set(type, [callback]);
    //     }
    // }
    //
    // unsubscribe(type: string, func: Function) {
    //     const arraySubscribe = this.mapSubscribers.get(type);
    //     if (arraySubscribe) {
    //         this.mapSubscribers.set(type, arraySubscribe.filter(
    //             (item) => item.name !== func.name
    //         ));
    //     }
    // }

    // setState(state: { [key: string]: any }) {
    //     let subscribers;
    //
    //     Object.keys(state).forEach((key) => {
    //         this.state[key] = state;
    //
    //         subscribers = this.mapSubscribers.get(key);
    //         if (subscribers && subscribers.length) {
    //             subscribers.forEach((subscriber) => subscriber());
    //         }
    //
    //         subscribers = this.mapOnceSubscribers.get(key);
    //         if (subscribers && subscribers.length) {
    //             subscribers.forEach((subscriber) => subscriber());
    //             this.mapOnceSubscribers.delete(key);
    //         }
    //     })
    // }

    getState(name: string) {
        return Object.hasOwnProperty.call(this.state, name) ? this.state[name] : null;
    }

    async dispatch(action: { [key: string]: any }) {
        const storeReducer = this.mapActionHandlers.get(action.type);
        if (!storeReducer) {
            return;
        }

        let state = {};

        if (Object.hasOwnProperty.call(action, 'value')) {
            state = await storeReducer(action.value);
        } else {
            state = await storeReducer();
        }

        // if (state) {
        //     this.setState(state);
        // }
    }
}

export const dispatcher = new Dispatcher();
