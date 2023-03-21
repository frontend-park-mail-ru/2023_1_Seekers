interface Store {
    state: { [key: string]: any };
    mapActionHandlers: Map<string, Function>;
    mapSubscribers: Map<string, Array<Function>>;
    mapOnceSubscribers: Map<string, Array<Function>>;
}

class Store {
    constructor() {
        this.state = {};
        this.mapActionHandlers = new Map();
        this.mapSubscribers = new Map();
        this.mapOnceSubscribers = new Map();


    }

    register({type, method}: { type: string, method: Function }) {
        this.mapActionHandlers.set(type, method);
    }

    subscribe(type: string, callback: Function, once = false) {
        const arraySubscribe = !once ? this.mapSubscribers.get(type) : this.mapOnceSubscribers.get(type);
        if (arraySubscribe) {
            arraySubscribe.push(callback);
        } else {
            !once ? this.mapSubscribers.set(type, [callback]) : this.mapOnceSubscribers.set(type, [callback]);
        }
    }

    unsubscribe(type: string, func: Function) {
        const arraySubscribe = this.mapSubscribers.get(type);
        if (arraySubscribe) {
            this.mapSubscribers.set(type, arraySubscribe.filter(
                (item) => item.name !== func.name
            ));
        }
    }

    setState() {

    }
}