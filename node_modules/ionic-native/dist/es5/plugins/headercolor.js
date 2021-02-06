"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name HeaderColor
 * @description
 * Cordova plugin to change color of header in multitask view
 *
 * @usage
 * ```typescript
 * import { HeaderColor } from 'ionic-native';
 *
 * HeaderColor.tint("#becb29");
 * ```
 */
var HeaderColor = (function () {
    function HeaderColor() {
    }
    /**
     * Set a color to the task header
     * @param color {string} The hex value of the color
     * @returns {Promise<any>}
     */
    HeaderColor.tint = function (color) { return; };
    __decorate([
        plugin_1.Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'failure'
        })
    ], HeaderColor, "tint", null);
    HeaderColor = __decorate([
        plugin_1.Plugin({
            pluginName: 'HeaderColor',
            plugin: 'cordova-plugin-headercolor',
            pluginRef: 'plugins.headerColor',
            repo: 'https://github.com/tomloprod/cordova-plugin-headercolor',
            platforms: ['Android']
        })
    ], HeaderColor);
    return HeaderColor;
}());
exports.HeaderColor = HeaderColor;
//# sourceMappingURL=headercolor.js.map