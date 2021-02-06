"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Market
 * @description
 * Opens an app's page in the market place (Google Play, App Store)
 *
 * @usage
 * ```
 * import {Market} from 'ionic-native';
 *
 * Market.open('your.package.name');
 *
 * ```
 */
var Market = (function () {
    function Market() {
    }
    /**
     * Opens an app in Google Play / App Store
     * @param appId {string} Package name
     * @return {Promise<any>}
     */
    Market.open = function (appId) { return; };
    /**
     * Search apps by keyword
     * @param keyword {string} Keyword
     * @return {Promise<any>}
     */
    Market.search = function (keyword) { return; };
    __decorate([
        plugin_1.Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'failure'
        })
    ], Market, "open", null);
    __decorate([
        plugin_1.Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'failure',
            platforms: ['Android']
        })
    ], Market, "search", null);
    Market = __decorate([
        plugin_1.Plugin({
            pluginName: 'Market',
            plugin: 'cordova-plugin-market',
            pluginRef: 'cordova.plugins.market',
            repo: 'https://github.com/xmartlabs/cordova-plugin-market'
        })
    ], Market);
    return Market;
}());
exports.Market = Market;
//# sourceMappingURL=market.js.map