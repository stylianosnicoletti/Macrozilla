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
 * @name Rollbar
 * @description
 * This plugin adds Rollbar App monitoring to your application
 *
 * @usage
 * ```
 * import { Rollbar } from 'ionic-native';
 *
 * Rollbar.init();
 *
 * ```
 */
var Rollbar = (function () {
    function Rollbar() {
    }
    /**
     * This function initializes the monitoring of your application
     * @return {Promise<any>} Returns a promise that resolves when the plugin successfully initializes
     */
    Rollbar.init = function () { return; };
    __decorate([
        plugin_1.Cordova()
    ], Rollbar, "init", null);
    Rollbar = __decorate([
        plugin_1.Plugin({
            pluginName: 'Rollbar',
            plugin: 'resgrid-cordova-plugins-rollbar',
            pluginRef: 'Rollbar',
            repo: 'https://github.com/Resgrid/cordova-plugins-rollbar',
            platforms: ['Android', 'iOS'],
            install: 'ionic plugin add resgrid-cordova-plugins-rollbar --variable ROLLBAR_ACCESS_TOKEN="YOUR_ROLLBAR_ACCEESS_TOKEN" --variable ROLLBAR_ENVIRONMENT="ROLLBAR_ENVIRONMENT"'
        })
    ], Rollbar);
    return Rollbar;
}());
exports.Rollbar = Rollbar;
//# sourceMappingURL=rollbar.js.map