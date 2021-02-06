"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name BrowserTab
 * @description
 * This plugin provides an interface to in-app browser tabs that exist on some mobile platforms, specifically [Custom Tabs](http://developer.android.com/tools/support-library/features.html#custom-tabs) on Android (including the [Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) implementation), and [SFSafariViewController](https://developer.apple.com/library/ios/documentation/SafariServices/Reference/SFSafariViewController_Ref/) on iOS.
 *
 * @usage
 * ```
 * import { BrowserTab } from 'ionic-native';
 *
 * BrowserTab.isAvailable()
 *   .then((isAvailable: boolean) => {
 *
 *     if (isAvailable) {
 *
 *       BrowserTab.openUrl('https://ionic.io');
 *
 *     } else {
 *       // open url with InAppBrowser instead
 *     }
 *
 *   });
 *
 * ```
 */
var BrowserTab = (function () {
    function BrowserTab() {
    }
    /**
     * Check if BrowserTab option is available
     * @return {Promise<any>} Returns a promise that resolves when check is successful and returns true or false
     */
    BrowserTab.isAvailable = function () { return; };
    /**
     * Opens the provided URL using a browser tab
     * @param {string} url  The URL you want to open
     * @return {Promise<any>} Returns a promise that resolves when check open was successful
     */
    BrowserTab.openUrl = function (url) { return; };
    /**
     * Closes browser tab
     * @return {Promise<any>} Returns a promise that resolves when close was finished
     */
    BrowserTab.close = function () { return; };
    __decorate([
        plugin_1.Cordova()
    ], BrowserTab, "isAvailable", null);
    __decorate([
        plugin_1.Cordova()
    ], BrowserTab, "openUrl", null);
    __decorate([
        plugin_1.Cordova()
    ], BrowserTab, "close", null);
    BrowserTab = __decorate([
        plugin_1.Plugin({
            pluginName: 'BrowserTab',
            plugin: 'cordova-plugin-browsertab',
            pluginRef: 'cordova.plugins.browsertab',
            repo: 'https://github.com/google/cordova-plugin-browsertab',
            platforms: ['Android', 'iOS']
        })
    ], BrowserTab);
    return BrowserTab;
}());
exports.BrowserTab = BrowserTab;
//# sourceMappingURL=browser-tab.js.map