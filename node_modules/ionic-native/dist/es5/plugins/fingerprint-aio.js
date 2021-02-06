"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @beta
 * @name FingerprintAIO
 * @description
 * Use simple fingerprint authentication on Android and iOS.
 * Requires Cordova plugin: cordova-plugin-fingerprint-aio. For more info about plugin, vist: https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio
 *
 * @usage
 * ```typescript
 * import { FingerprintAIO } from 'ionic-native';
 *
 * FingerprintAIO.show({
 *     clientId: "Fingerprint-Demo",
 *     clientSecret: "password", //Only necessary for Android
 *     disableBackup:true  //Only for Android(optional)
 * })
 * .then((result: any) => console.log(any))
 * .catch((error: any) => console.log(error));
 *
 * ```
 * @interfaces
 * FingerprintOptions
 */
var FingerprintAIO = (function () {
    function FingerprintAIO() {
    }
    /**
     * Check if fingerprint authentication is available
     * @return {Promise<any>} Returns a promise with result
     */
    FingerprintAIO.isAvailable = function () { return; };
    /**
     * Show authentication dialogue
     * @param options {FingerprintOptions} options for platform specific fingerprint API
     * @return {Promise<any>} Returns a promise that resolves when authentication was successfull
     */
    FingerprintAIO.show = function (options) { return; };
    __decorate([
        plugin_1.Cordova()
    ], FingerprintAIO, "isAvailable", null);
    __decorate([
        plugin_1.Cordova()
    ], FingerprintAIO, "show", null);
    FingerprintAIO = __decorate([
        plugin_1.Plugin({
            pluginName: 'FingerprintAIO',
            plugin: 'cordova-plugin-fingerprint-aio',
            pluginRef: 'Fingerprint',
            repo: 'https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio',
            platforms: ['Android', 'iOS']
        })
    ], FingerprintAIO);
    return FingerprintAIO;
}());
exports.FingerprintAIO = FingerprintAIO;
//# sourceMappingURL=fingerprint-aio.js.map