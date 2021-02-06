"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Couchbase Lite
 * @description
 * Plugin to install Couchbase Lite in your PhoneGap app on iOS or Android
 *
 * @usage
 * ```
 * import { CouchbaseLite } from 'ionic-native';
 *
 * CouchbaseLite.getURL()
 *   .then((url: any) => console.log(url))
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
var CouchbaseLite = (function () {
    function CouchbaseLite() {
    }
    /**
     * Get the database url
     * @return {Promise<any>} Returns a promise that resolves with the local database url
     */
    CouchbaseLite.getURL = function () { return; };
    __decorate([
        plugin_1.Cordova({
            callbackStyle: 'node'
        })
    ], CouchbaseLite, "getURL", null);
    CouchbaseLite = __decorate([
        plugin_1.Plugin({
            pluginName: 'CouchbaseLite',
            plugin: 'https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin',
            pluginRef: 'cblite',
            repo: 'https://github.com/couchbaselabs/Couchbase-Lite-PhoneGap-Plugin',
        })
    ], CouchbaseLite);
    return CouchbaseLite;
}());
exports.CouchbaseLite = CouchbaseLite;
//# sourceMappingURL=couchbase-lite.js.map