"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Serial
 * @description
 * This plugin provides functions for working with Serial connections
 *
 * @usage
 *
 * ```
 * import { Serial } from 'ionic-native';
 *
 * Serial.requestPermission().then(() => {
 *   Serial.open({
 *     baudRate: 9800
 *   }).then(() => {
 *     console.log('Serial connection opened');
 *   });
 * }).catch((error: any) => console.log(error));
 *
 * ```
 */
var Serial = (function () {
    function Serial() {
    }
    /**
     * Request permission to connect to a serial device
     *
     * @param options {SerialPermissionOptions} Options used to request serial permissions for an unknown device
     * @return {Promise<any>} Returns a promise that resolves when permissions are granted
     */
    Serial.requestPermission = function (options) { return; };
    /**
     * Open connection to a serial device
     *
     * @param options {SerialOpenOptions} Options used to open serial connection
     * @return {Promise<any>} Returns a promise that resolves when the serial connection is opened
     */
    Serial.open = function (options) { return; };
    /**
     * Write to a serial connection
     *
     * @param data {any} data to write to the serial connection
     * @return {Promise<any>} Returns a promise that resolves when the write is complete
     */
    Serial.write = function (data) { return; };
    /**
     * Write hex to a serial connection
     *
     * @param data {any} data to write to the serial connection
     * @return {Promise<any>} Returns a promise that resolves when the write is complete
     */
    Serial.writeHex = function (data) { return; };
    /**
     * Read from a serial connection
     *
     * @return {Promise<any>} Returns a promise that resolves with data read from the serial connection
     */
    Serial.read = function () { return; };
    /**
     * Watch the incoming data from the serial connection. Clear the watch by unsubscribing from the observable
     *
     * @returns {Observable<any>} Observable returns an observable that you can subscribe to
     */
    Serial.registerReadCallback = function () { return; };
    /**
     * Close the serial connection
     *
     * @return {Promise<any>} Returns a promise that resolves when the serial connection is closed
     */
    Serial.close = function () { return; };
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Serial, "requestPermission", null);
    __decorate([
        plugin_1.Cordova()
    ], Serial, "open", null);
    __decorate([
        plugin_1.Cordova()
    ], Serial, "write", null);
    __decorate([
        plugin_1.Cordova()
    ], Serial, "writeHex", null);
    __decorate([
        plugin_1.Cordova()
    ], Serial, "read", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], Serial, "registerReadCallback", null);
    __decorate([
        plugin_1.Cordova()
    ], Serial, "close", null);
    Serial = __decorate([
        plugin_1.Plugin({
            pluginName: 'Serial',
            plugin: 'cordovarduino',
            pluginRef: 'serial',
            repo: 'https://github.com/xseignard/cordovarduino',
            platforms: ['Android']
        })
    ], Serial);
    return Serial;
}());
exports.Serial = Serial;
//# sourceMappingURL=serial.js.map