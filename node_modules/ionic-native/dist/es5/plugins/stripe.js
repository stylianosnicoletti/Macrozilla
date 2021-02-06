"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Stripe
 * @description
 * A plugin that allows you to use Stripe's Native SDKs for Android and iOS.
 *
 * @usage
 * ```
 * import { Stripe } from 'ionic-native';
 *
 * Stripe.setPublishableKey('my_publishable_key');
 *
 * let card = {
 *  number: '4242424242424242',
 *  expMonth: 12,
 *  expYear: 2020,
 *  cvc: '220'
 * };
 *
 * Stripe.createCardToken(card)
 *    .then(token => console.log(token))
 *    .catch(error => console.error(error));
 *
 * ```
 *
 * @interfaces
 * StripeCardTokenParams
 */
var Stripe = (function () {
    function Stripe() {
    }
    /**
     * Set publishable key
     * @param publishableKey {string} Publishable key
     * @return {Promise<void>}
     */
    Stripe.setPublishableKey = function (publishableKey) { return; };
    /**
     * Create Credit Card Token
     * @param params {StripeCardTokenParams} Credit card information
     * @return {Promise<string>} returns a promise that resolves with the token, or reject with an error
     */
    Stripe.createCardToken = function (params) { return; };
    __decorate([
        plugin_1.Cordova()
    ], Stripe, "setPublishableKey", null);
    __decorate([
        plugin_1.Cordova()
    ], Stripe, "createCardToken", null);
    Stripe = __decorate([
        plugin_1.Plugin({
            pluginName: 'Stripe',
            plugin: 'cordova-plugin-stripe',
            pluginRef: 'cordova.plugins.stripe',
            repo: 'https://github.com/zyramedia/cordova-plugin-stripe'
        })
    ], Stripe);
    return Stripe;
}());
exports.Stripe = Stripe;
//# sourceMappingURL=stripe.js.map