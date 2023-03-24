/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
 */

interface MicroEvent {
    _events: {[key: string]: Function[]};
}

// eslint-disable-next-line require-jsdoc
class MicroEvent {

    constructor() {
        this._events = {}
    }

    bind(event: string, fct: Function) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    }

    unbind(event: string, fct: Function) {
        this._events = this._events || {};
        if (!(event in this._events)) {
            return;
        }
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    }

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

