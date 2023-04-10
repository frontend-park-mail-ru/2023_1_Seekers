import {handlers} from '@config/handlers';

interface Dispatcher {
    state: { [key: string]: any };
    mapActionHandlers: Map<string, Function>;
}

/**
 * class that implements dispatcher
 */
class Dispatcher {
    /**
     * constructor registers all the handlers that can be
     * triggered by specific dispatch string
     */
    constructor() {
        this.state = {};
        this.mapActionHandlers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    /**
     * method that register one action
     * @param type - string which contains the action identification
     * @param method - method that will be triggered by action
     */
    register({type, method}: { type: string, method: Function }) {
        this.mapActionHandlers.set(type, method);
    }

    /**
     * function dispatcher
     * @param action - action that need to be triggered
     */
    async dispatch(action: { [key: string]: any }) {
        const storeReducer = this.mapActionHandlers.get(action.type);
        if (!storeReducer) {
            return;
        }

        if (Object.hasOwnProperty.call(action, 'value')) {
            await storeReducer(action.value);
        } else {
            await storeReducer();
        }
    }
}

export const dispatcher = new Dispatcher();
