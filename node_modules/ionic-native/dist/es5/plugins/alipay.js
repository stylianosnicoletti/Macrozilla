"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Alipay
 * @description
 *  This plugin is used for Alipay APP support. Integrated with the latest SDK.
 *
 * Requires Cordova plugin: `cordova-alipay-base`. For more info, please see the [Alipay plugin docs](https://github.com/xueron/cordova-alipay-base).
 *
 * @usage
 * ```
 * import { Alipay } from 'ionic-native';
 *
 * // Should get from server side with sign.
 * let alipayOrder = {
         ...
 *     };
 *
 * Alipay.pay(alipayOrder)
 *    .then(result => {
 *       console.log(result); // Success
 *    })
 *    .catch(error => {
 *       console.log(error); // Failed
 *    });
 *
 * ```
 *
 * @interfaces
 * AlipayOrder
 */
var Alipay = (function () {
    function Alipay() {
    }
    /**
     * Open Alipay to perform App pay
     * @param order { AlipayOrder } alipay options
     * @returns {Promise<any>} Returns a Promise that resolves with the success return, or rejects with an error.
     */
    Alipay.pay = function (order) { return; };
    __decorate([
        plugin_1.Cordova()
    ], Alipay, "pay", null);
    Alipay = __decorate([
        plugin_1.Plugin({
            pluginName: 'Alipay',
            plugin: 'cordova-alipay-base',
            pluginRef: 'Alipay.Base',
            repo: 'https://github.com/xueron/cordova-alipay-base',
            platforms: ['Android', 'iOS'],
            install: 'ionic plugin add https://github.com/xueron/cordova-alipay-base --variable APP_ID=your_app_id'
        })
    ], Alipay);
    return Alipay;
}());
exports.Alipay = Alipay;
//# sourceMappingURL=alipay.js.map