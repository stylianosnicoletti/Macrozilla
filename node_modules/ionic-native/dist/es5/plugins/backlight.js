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
 * @name Backlight
 * @description
 * This plugin adds turning on/off the device backlight.
 *
 * @usage
 * ```
 * import { Backlight } from 'ionic-native';
 *
 * // Turn backlight on
 * Backlight.on().then(() => console.log('backlight on'));
 *
 * // Turn backlight off
 * Backlight.off().then(() => console.log('backlight off'));
 *
 * ```
 */
var Backlight = (function () {
    function Backlight() {
    }
    /**
     * This function turns backlight on
     * @return {Promise<any>} Returns a promise that resolves when the backlight is on
     */
    Backlight.on = function () { return; };
    /**
     * This function turns backlight off
     * @return {Promise<any>} Returns a promise that resolves when the backlight is off
     */
    Backlight.off = function () { return; };
    __decorate([
        plugin_1.Cordova()
    ], Backlight, "on", null);
    __decorate([
        plugin_1.Cordova()
    ], Backlight, "off", null);
    Backlight = __decorate([
        plugin_1.Plugin({
            pluginName: 'Backlight',
            plugin: 'cordova-plugin-backlight',
            pluginRef: 'cordova.plugins.Backlight',
            repo: 'https://github.com/mebibou/cordova-plugin-backlight',
            platforms: ['Android']
        })
    ], Backlight);
    return Backlight;
}());
exports.Backlight = Backlight;
//# sourceMappingURL=backlight.js.map