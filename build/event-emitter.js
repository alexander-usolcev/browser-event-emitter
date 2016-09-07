'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _browserEs6Map = require('browser-es6-map');

var _browserEs6Map2 = _interopRequireDefault(_browserEs6Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isFunction(obj) {
    return typeof obj == 'function' || false;
}

/**
 * Класс для создания Observer паттерна.
 */

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.listeners = new _browserEs6Map2.default();
    }

    /**
     * Добавить "слушателя".
     *
     * @param label
     * @param callback
     */


    _createClass(EventEmitter, [{
        key: 'addListener',
        value: function addListener(label, callback) {
            this.listeners.has(label) || this.listeners.set(label, []);

            // Добавить "слушателя".
            this.listeners.get(label).push(callback);
        }

        /**
         * Alias для addListener.
         *
         * @param args
         */

    }, {
        key: 'on',
        value: function on() {
            this.addListener.apply(this, arguments);
        }

        /**
         * Удалить "слушателя".
         *
         * @param label
         * @param callback
         * @return {boolean}
         */

    }, {
        key: 'removeListener',
        value: function removeListener(label, callback) {
            /** @type {Array} */
            var listeners = this.listeners.get(label),
                index = void 0;

            if (listeners && listeners.length) {
                index = listeners.reduce(function (i, listener, index) {
                    return isFunction(listener) && listener.toString() === callback.toString() ? i = index : i;
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

    }, {
        key: 'removeAllListeners',
        value: function removeAllListeners(label) {
            this.listeners.set(label, []);
        }
    }, {
        key: 'eventNames',
        value: function eventNames() {
            return Object.keys(this.listeners.getAll());
        }

        /**
         * Оповестить всех "слушателей".
         *
         * @param label
         * @param args
         * @return {boolean}
         */

    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }

            return false;
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;
