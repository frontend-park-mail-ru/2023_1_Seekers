import Dispatcher from '@utils/dispatcher';

/**
 * class implementing base-store
 */
export default class BaseStore {
    _changed: boolean;
    _events: Map<string, baseStoreObject>;
    _storage: Map<string, any>;

    /**
     * constructor base-storage
     */
    constructor() {
        this._changed = false;
        this._storage = new Map();
        this._events = new Map();
        Dispatcher.register(this._invokeOnDispatch.bind(this));
    }

    /**
     * method get state of storage
     * @param field - field that needs to be returned
     * @returns context of storage
     */
    getContext(field: string) {
        return (field ? this._storage.get(field) : this._storage);
    }

    /**
     * method return state of storage
     * @returns state of storage
     */
    hasChanged() {
        return this._changed;
    }

    /**
     * method add new listener
     * @param callback - callback
     * @param changeEvent - name of event
     */
    addListener(callback: emptyCallback, changeEvent: string) {
        this._events.set(changeEvent, {
            callbacks: callback,
            promise: null,
        });
    }

    /**
     * method emit event
     * @param events - events
     */
    _emitChange(events: Array<string>) {
        if (events.every((val: string) => this._events.get(val)!.promise = Promise.resolve(val))) {
            this._changed = true;
        }
    }

    /**
     * method TODO:
     * @param payload
     */
    async _invokeOnDispatch(payload: object) {
        this._changed = false;
        await this._onDispatch(payload);

        if (this.hasChanged()) {
            this._events.forEach((value: baseStoreObject, key: string) => {
                value.promise?.then(
                    (changeEvent) => {
                        value.callbacks();
                        this._events.get(key)!.promise = null;
                    })
                    .catch((error: any) => console.log('_invokeOnDispatch:', error));
            });
        }
    }

    /**
     * method TODO:
     * @param payload
     */
    async _onDispatch(payload: object) {
        throw new Error('Store: метод _onDispatch должен быть реализован в подклассе');
    }
}
