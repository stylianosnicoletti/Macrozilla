"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Broadcaster
 * @description
 * This plugin adds exchanging events between native code and your app.
 *
 * @usage
 * ```
 * import { Broadcaster } from 'ionic-native';
 *
 * // Listen to events from Native
 * Broadcaster.addEventListener('eventName').then((event) => console.log(event));
 *
 * // Send event to Native
 * Broadcaster.fireNativeEvent('eventName', {}).then(() => console.log('success'));
 *
 * ```
 */
var Broadcaster = (function () {
    function Broadcaster() {
    }
    /**
     * This function listen to an event sent from the native code
     * @param eventName {string}
     * @return {Observable<any>} Returns an observable to watch when an event is received
     */
    Broadcaster.addEventListener = function (eventName) { return; };
    /**
     * This function sends data to the native code
     * @param eventName {string}
     * @param eventData {any}
     * @return {Promise<any>} Returns a promise that resolves when an event is successfully fired
     */
    Broadcaster.fireNativeEvent = function (eventName, eventData) { return; };
    __decorate([
        plugin_1.Cordova({
            observable: true,
            clearFunction: 'removeEventListener',
            clearWithArgs: true
        })
    ], Broadcaster, "addEventListener", null);
    __decorate([
        plugin_1.Cordova()
    ], Broadcaster, "fireNativeEvent", null);
    Broadcaster = __decorate([
        plugin_1.Plugin({
            pluginName: 'Broadcaster',
            plugin: 'cordova-plugin-broadcaster',
            pluginRef: 'broadcaster',
            repo: 'https://github.com/bsorrentino/cordova-broadcaster',
            platforms: ['Android', 'iOS']
        })
    ], Broadcaster);
    return Broadcaster;
}());
exports.Broadcaster = Broadcaster;
//# sourceMappingURL=broadcaster.js.map