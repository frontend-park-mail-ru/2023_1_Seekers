import {handlers} from '@config/handlers';

interface Dispatcher {
    state: { [key: string]: any };
    mapActionHandlers: Map<string, Function>;
}

class Dispatcher {
    constructor() {
        this.state = {};
        this.mapActionHandlers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    register({type, method}: { type: string, method: Function }) {
        this.mapActionHandlers.set(type, method);
    }

    async dispatch(action: { [key: string]: any }) {
        const storeReducer = this.mapActionHandlers.get(action.type);
        if (!storeReducer) {
            return;
        }

        const state = {};

        if (Object.hasOwnProperty.call(action, 'value')) {
            await storeReducer(action.value);
        } else {
            await storeReducer();
        }
    }
}

export const dispatcher = new Dispatcher();
