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
 * @name NativeGeocoder
 * @description
 * Cordova plugin for native forward and reverse geocoding
 *
 * @usage
 * ```typescript
 * import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from 'ionic-native';
 *
 * NativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
 *   .then((result: NativeGeocoderReverseResult) => console.log("The address is " + result.address + " in " + result.countryCode))
 *   .catch((error: any) => console.log(error));
 *
 * NativeGeocoder.forwardGeocode("Berlin")
 *   .then((coordinates: NativeGeocoderForwardResult) => console.log("The coordinates are latitude=" + coordinates.latitude + " and longitude=" + coordinates.longitude))
 *   .catch((error: any) => console.log(error));
 * ```
 * @interfaces
 * NativeGeocoderReverseResult
 * NativeGeocoderForwardResult
 */
var NativeGeocoder = (function () {
    function NativeGeocoder() {
    }
    /**
     * Reverse geocode a given latitude and longitude to find location address
     * @param latitude {number} The latitude
     * @param longitude {number} The longitude
     * @return {Promise<any>}
     */
    NativeGeocoder.reverseGeocode = function (latitude, longitude) { return; };
    /**
     * Forward geocode a given address to find coordinates
     * @param addressString {string} The address to be geocoded
     * @return {Promise<any>}
     */
    NativeGeocoder.forwardGeocode = function (addressString) { return; };
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], NativeGeocoder, "reverseGeocode", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], NativeGeocoder, "forwardGeocode", null);
    NativeGeocoder = __decorate([
        plugin_1.Plugin({
            pluginName: 'NativeGeocoder',
            plugin: 'cordova-plugin-nativegeocoder',
            pluginRef: 'nativegeocoder',
            repo: 'https://github.com/sebastianbaar/cordova-plugin-nativegeocoder',
            platforms: ['iOS', 'Android']
        })
    ], NativeGeocoder);
    return NativeGeocoder;
}());
exports.NativeGeocoder = NativeGeocoder;
//# sourceMappingURL=native-geocoder.js.map