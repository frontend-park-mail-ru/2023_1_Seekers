

interface MicroEvent {
    _events: {[key: string]: Function[]};
}

/**
 * MicroEvent - implements event emitter
 */
class MicroEvent {
    /**
     * constructor initializes initial state
     */
    constructor() {
        this._events = {};
    }

    /**
     * function that binds function to event
     * @param event - event
     * @param fct - function to bind
     */
    bind(event: string, fct: Function) {

        this._events = this._events || {};
        this._events[event] = this._events[event] || [];

        this._events[event].push(fct);
    }

    /**
     * function that unbinds function to event
     * @param event - event
     * @param fct - function to unbind
     */
    unbind(event: string, fct: Function) {
        this._events = this._events || {};
        if (!(event in this._events)) {
            return;
        }
        const idx = this._events[event].indexOf(fct);
        if (idx !== -1) {
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        }
    }

    /**
     * function that triggers event
     * @param event - event
     */
    trigger(event: string /* , args... */) {
        this._events = this._events || {};
        if (!(event in this._events)) {
            return;
        }
        for (let i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}


export const microEvents = new MicroEvent();

