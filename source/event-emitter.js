'use strict';


import Cache from 'browser-es6-map';

function isFunction(obj) {
    return typeof obj == 'function' || false;
}

/**
 * Класс для создания Observer паттерна.
 */
class EventEmitter {
    constructor() {
        this.listeners = new Cache();
    }

    /**
     * Добавить "слушателя".
     *
     * @param label
     * @param callback
     */
    addListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);

        // Добавить "слушателя".
        this.listeners.get(label).push(callback);
    }

    /**
     * Alias для addListener.
     *
     * @param args
     */
    on(...args) {
        this.addListener(...args);
    }

    /**
     * Удалить "слушателя".
     *
     * @param label
     * @param callback
     * @return {boolean}
     */
    removeListener(label, callback) {
        /** @type {Array} */
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (isFunction(listener) && listener.toString() === callback.toString()) ? i = index : i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }

        return false;
    }

    /**
     * Удалить всех "слушателей".
     *
     * @param label
     */
    removeAllListeners(label) {
        this.listeners.set(label, []);
    }

    eventNames() {
        return Object.keys(this.listeners.getAll());
    }

    /**
     * Оповестить всех "слушателей".
     *
     * @param label
     * @param args
     * @return {boolean}
     */
    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }

        return false;
    }
}

export default EventEmitter;
