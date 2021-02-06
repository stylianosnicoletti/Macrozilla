"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name AppPreferences
 * @description
 * This plugin allows you to read and write app preferences
 *
 * @usage
 * ```
 * import { AppPreferences } from 'ionic-native';
 *
 * AppPreferences.fetch('key').then((res) => { console.log(res); });
 *
 *```
 */
var AppPreferences = (function () {
    function AppPreferences() {
    }
    /**
     * Get a preference value
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @return {Promise<any>} Returns a promise
     */
    AppPreferences.fetch = function (dict, key) { return; };
    /**
     * Set a preference value
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @param {string} value Value
     * @return {Promise<any>} Returns a promise
     */
    AppPreferences.store = function (dict, key, value) {
        return;
    };
    /**
     * Remove value from preferences
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @return {Promise<any>} Returns a promise
     */
    AppPreferences.remove = function (dict, key) { return; };
    /**
     * Clear preferences
     *
     * @return {Promise<any>} Returns a promise
     */
    AppPreferences.clearAll = function () { return; };
    /**
     * Show native preferences interface
     *
     * @return {Promise<any>} Returns a promise
     */
    AppPreferences.show = function () { return; };
    /**
     * Show native preferences interface
     *
     * @param {boolean} subscribe true value to subscribe, false - unsubscribe
     * @return {Observable<any>} Returns an observable
     */
    AppPreferences.watch = function (subscribe) { return; };
    /**
     * Return named configuration context
     * In iOS you'll get a suite configuration, on Android — named file
     * Supports: Android, iOS
     * @param {string} suiteName suite name
     * @returns {Object} Custom object, bound to that suite
     */
    AppPreferences.suite = function (suiteName) { return; };
    AppPreferences.iosSuite = function (suiteName) { return; };
    /**
     * Return cloud synchronized configuration context
     * Currently supports Windows and iOS/macOS
     * @returns {Object} Custom object, bound to that suite
     */
    AppPreferences.cloudSync = function () { return; };
    /**
     * Return default configuration context
     * Currently supports Windows and iOS/macOS
     * @returns {Object} Custom Object, bound to that suite
     */
    AppPreferences.defaults = function () { return; };
    __decorate([
        plugin_1.Cordova({
            sync: true,
            callbackOrder: 'reverse'
        })
    ], AppPreferences, "fetch", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], AppPreferences, "store", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], AppPreferences, "remove", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], AppPreferences, "clearAll", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], AppPreferences, "show", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], AppPreferences, "watch", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], AppPreferences, "suite", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS']
        })
    ], AppPreferences, "iosSuite", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows', 'Windows Phone 8']
        })
    ], AppPreferences, "cloudSync", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows', 'Windows Phone 8']
        })
    ], AppPreferences, "defaults", null);
    AppPreferences = __decorate([
        plugin_1.Plugin({
            pluginName: 'AppPreferences',
            plugin: 'cordova-plugin-app-preferences',
            pluginRef: 'plugins.appPreferences',
            repo: 'https://github.com/apla/me.apla.cordova.app-preferences',
        })
    ], AppPreferences);
    return AppPreferences;
}());
exports.AppPreferences = AppPreferences;
//# sourceMappingURL=apppreferences.js.map