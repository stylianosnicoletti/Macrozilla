"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
var Observable_1 = require('rxjs/Observable');
/**
 * @name InAppBrowser
 * @description Launches in app Browser
 * @usage
 * ```typescript
 * import {InAppBrowser} from 'ionic-native';
 *
 *
 * ...
 *
 *
 * let browser = new InAppBrowser('https://ionic.io', '_system');
 * browser.executeScript(...);
 * browser.insertCSS(...);
 * browser.close();
 * ```
 * @interfaces
 * InAppBrowserEvent
 * InAppBrowserOptions
 */
var InAppBrowser = (function () {
    function InAppBrowser(url, target, options) {
        try {
            if (options && typeof options !== 'string')
                options = Object.keys(options).map(function (key) { return (key + "=" + options[key]); }).join(',');
            this._objectInstance = cordova.InAppBrowser.open(url, target, options);
        }
        catch (e) {
            window.open(url);
            console.warn('Native: InAppBrowser is not installed or you are running on a browser. Falling back to window.open, all instance methods will NOT work.');
        }
    }
    /**
     * Displays an InAppBrowser window that was opened hidden. Calling this has no effect
     * if the InAppBrowser was already visible.
     */
    InAppBrowser.prototype.show = function () { };
    /**
     * Closes the InAppBrowser window.
     */
    InAppBrowser.prototype.close = function () { };
    /**
     * Hides an InAppBrowser window that is currently shown. Calling this has no effect
     * if the InAppBrowser was already hidden.
     */
    InAppBrowser.prototype.hide = function () { };
    /**
     * Injects JavaScript code into the InAppBrowser window.
     * @param script {Object} Details of the script to run, specifying either a file or code key.
     * @returns {Promise<any>}
     */
    InAppBrowser.prototype.executeScript = function (script) { return; };
    /**
     * Injects CSS into the InAppBrowser window.
     * @param css {Object} Details of the script to run, specifying either a file or code key.
     * @returns {Promise<any>}
     */
    InAppBrowser.prototype.insertCSS = function (css) { return; };
    /**
     * A method that allows you to listen to events happening in the browser.
     * @param {string} name of the event
     * @returns {Observable<InAppBrowserEvent>} Returns back an observable that will listen to the event on subscribe, and will stop listening to the event on unsubscribe.
     */
    InAppBrowser.prototype.on = function (event) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    __decorate([
        plugin_1.CordovaInstance({ sync: true })
    ], InAppBrowser.prototype, "show", null);
    __decorate([
        plugin_1.CordovaInstance({ sync: true })
    ], InAppBrowser.prototype, "close", null);
    __decorate([
        plugin_1.CordovaInstance({ sync: true })
    ], InAppBrowser.prototype, "hide", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], InAppBrowser.prototype, "executeScript", null);
    __decorate([
        plugin_1.CordovaInstance()
    ], InAppBrowser.prototype, "insertCSS", null);
    InAppBrowser = __decorate([
        plugin_1.Plugin({
            pluginName: 'InAppBrowser',
            plugin: 'cordova-plugin-inappbrowser',
            pluginRef: 'cordova.InAppBrowser',
            repo: 'https://github.com/apache/cordova-plugin-inappbrowser'
        })
    ], InAppBrowser);
    return InAppBrowser;
}());
exports.InAppBrowser = InAppBrowser;
//# sourceMappingURL=inappbrowser.js.map