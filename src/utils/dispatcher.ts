/**
 * class implementing dispatcher
 */
class Dispatcher {
    _callbacks: Map<number, DispatcherCallbackObject>;
    _isDispatching: boolean;
    _lastID: number;
    _pendingPayload: object;
    /**
     * constructor
     */
    constructor() {
        this._isDispatching = false;
        this._callbacks = new Map();
        this._lastID = 0;
    }

    /**
     * method register new callback in dispatcher
     * @param callback - callback
     */
    register(callback: objectFunction) {
        this._callbacks.set(this._lastID++, {callback: callback, isPending: false});
    }

    /**
     * method unregister callback
     * @param id - callback id
     */
    unregister(id: number) {
        if (this._callbacks.has(id)) {
            this._callbacks.delete(id);
            return;
        }
    }

    /**
     * method  dispatches a payload to all registered callbacks.
     * @param payload - data to store
     */
    dispatch(payload: object) {
        if (this.isDispatching()) {
            return
        }

        this._startDispatching(payload);

        try {
            for (const [key, value] of this._callbacks) {
                if (value.isPending) {
                    continue;
                }
                this._invokeCallback(key);
            }
        } finally {
            this._stopDispatching();
        }
    }

    /**
     * check dispatch status
     * @returns dispatch status
     */
    isDispatching() {
        return this._isDispatching;
    }

    /**
     * method call khe... khe... callback
     * @param id - callback id
     */
    _invokeCallback(id: number) {
        this._callbacks.get(id)!.isPending = true;
        this._callbacks.get(id)!.callback(this._pendingPayload);
    }

    /**
     * method initialize sending
     * @param payload - data for store
     */
    _startDispatching(payload: object) {
        for (const value of this._callbacks.values()) {
            value.isPending = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    }

    /**
     * method stop dispatch
     */
    _stopDispatching() {
        delete this._pendingPayload;
        this._isDispatching = false;
    }
}

export default new Dispatcher();
