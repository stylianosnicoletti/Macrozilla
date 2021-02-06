"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name BackgroundGeolocation
 * @description
 * This plugin provides foreground and background geolocation with battery-saving "circular region monitoring" and "stop detection". For
 * more detail, please see https://github.com/mauron85/cordova-plugin-background-geolocation
 *
 * @usage
 *
 * ```typescript
 * import { BackgroundGeolocation } from 'ionic-native';
 *
 *
 * // When device is ready :
 * platform.ready().then(() => {
 *     // IMPORTANT: BackgroundGeolocation must be called within app.ts and or before Geolocation. Otherwise the platform will not ask you for background tracking permission.
 *
 *     // BackgroundGeolocation is highly configurable. See platform specific configuration options
 *     let config = {
 *             desiredAccuracy: 10,
 *             stationaryRadius: 20,
 *             distanceFilter: 30,
 *             debug: true, //  enable this hear sounds for background-geolocation life-cycle.
 *             stopOnTerminate: false, // enable this to clear background location settings when the app terminates
 *     };
 *
 *     BackgroundGeolocation.configure((location) => {
         console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          BackgroundGeolocation.finish(); // FOR IOS ONLY

 *      }, (error) => {
 *        console.log('BackgroundGeolocation error');
 *      }, config);
 *
 *     // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
 *     BackgroundGeolocation.start();
 * })
 *
 * // If you wish to turn OFF background-tracking, call the #stop method.
 * BackgroundGeolocation.stop();
 *
 * ```
 * @interfaces
 * BackgroundGeolocationResponse
 * BackgroundGeolocationConfig
 */
var BackgroundGeolocation = (function () {
    function BackgroundGeolocation() {
    }
    /**
     * Configure the plugin.
     *
     * @param options {BackgroundGeolocationConfig} options An object of type Config
     * @return {Observable<any>}
     */
    BackgroundGeolocation.configure = function (options) { return; };
    /**
     * Turn ON the background-geolocation system.
     * The user will be tracked whenever they suspend the app.
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.start = function () { return; };
    /**
     * Turn OFF background-tracking
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.stop = function () { return; };
    /**
     * Inform the native plugin that you're finished, the background-task may be completed
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.finish = function () { return; };
    /**
     * Force the plugin to enter "moving" or "stationary" state
     * @param isMoving {boolean}
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.changePace = function (isMoving) { return; };
    /**
     * Setup configuration
     * @param options {BackgroundGeolocationConfig}
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.setConfig = function (options) { return; };
    /**
     * Returns current stationaryLocation if available. null if not
     * @returns {Promise<Location>}
     */
    BackgroundGeolocation.getStationaryLocation = function () { return; };
    /**
     * Add a stationary-region listener. Whenever the devices enters "stationary-mode",
     * your #success callback will be executed with #location param containing #radius of region
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.onStationary = function () { return; };
    /**
     * Check if location is enabled on the device
     * @returns {Promise<number>} Returns a promise with int argument that takes values 0, 1 (true).
     */
    BackgroundGeolocation.isLocationEnabled = function () { return; };
    /**
     * Display app settings to change permissions
     */
    BackgroundGeolocation.showAppSettings = function () { };
    /**
     * Display device location settings
     */
    BackgroundGeolocation.showLocationSettings = function () { };
    /**
     * Method can be used to detect user changes in location services settings.
     * If user enable or disable location services then success callback will be executed.
     * In case or error (SettingNotFoundException) fail callback will be executed.
     * @returns {Promise<boolean>}
     */
    BackgroundGeolocation.watchLocationMode = function () { return; };
    /**
     * Stop watching for location mode changes.
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.stopWatchingLocationMode = function () { return; };
    /**
     * Method will return all stored locations.
     * Locations are stored when:
     *  - config.stopOnTerminate is false and main activity was killed
     *    by the system
     *  or
     *  - option.debug is true
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.getLocations = function () { return; };
    /**
  
     * Method will return locations, which has not been yet posted to server. NOTE: Locations does contain locationId.
  
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.getValidLocations = function () { return; };
    /**
     * Delete stored location by given locationId.
     * @param locationId {number}
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.deleteLocation = function (locationId) { return; };
    /**
     * Delete all stored locations.
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.deleteAllLocations = function () { return; };
    /**
     * Normally plugin will handle switching between BACKGROUND and FOREGROUND mode itself.
     * Calling switchMode you can override plugin behavior and force plugin to switch into other mode.
     *
     * In FOREGROUND mode plugin uses iOS local manager to receive locations and behavior is affected by option.desiredAccuracy and option.distanceFilter.
     * In BACKGROUND mode plugin uses significant changes and region monitoring to receive locations and uses option.stationaryRadius only.
  
     *
     * BackgroundGeolocation.Mode.FOREGROUND
     * BackgroundGeolocation.Mode.BACKGROUND
  
     **
     * @param modeId {number}
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.switchMode = function (modeId) { return; };
    /**
  
     * Return all logged events. Useful for plugin debugging. Parameter limit limits number of returned entries.
  
     * @see https://github.com/mauron85/cordova-plugin-background-geolocation/tree/v2.2.1#debugging for more information.
  
     *
     * @param limit {number} Limits the number of entries
  
     * @returns {Promise<any>}
     */
    BackgroundGeolocation.getLogEntries = function (limit) { return; };
    /**
  
     * Set location service provider @see https://github.com/mauron85/cordova-plugin-background-geolocation/wiki/Android-providers
  
     *
     * Possible values:
     *  ANDROID_DISTANCE_FILTER_PROVIDER: 0,
  
     *  ANDROID_ACTIVITY_PROVIDER: 1
  
     *
     * @enum {number}
  
     */
    BackgroundGeolocation.LocationProvider = {
        ANDROID_DISTANCE_FILTER_PROVIDER: 0,
        ANDROID_ACTIVITY_PROVIDER: 1
    };
    /**
     * Desired accuracy in meters. Possible values [0, 10, 100, 1000].
  
     * The lower the number, the more power devoted to GeoLocation resulting in higher accuracy readings.
  
     * 1000 results in lowest power drain and least accurate readings.
  
     *
     * Possible values:
     *  HIGH: 0
  
     *  MEDIUM: 10
  
     *  LOW: 100
  
     *  PASSIVE: 1000
     *
     * enum {number}
  
     */
    BackgroundGeolocation.Accuracy = {
        HIGH: 0,
        MEDIUM: 10,
        LOW: 100,
        PASSIVE: 1000
    };
    /**
  
     * Used in the switchMode function
  
     *
     * Possible values:
     *  BACKGROUND: 0
     *  FOREGROUND: 1
  
     *
     * @enum {number}
  
     */
    BackgroundGeolocation.Mode = {
        BACKGROUND: 0,
        FOREGROUND: 1
    };
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse',
            observable: true
        })
    ], BackgroundGeolocation, "configure", null);
    __decorate([
        plugin_1.Cordova()
    ], BackgroundGeolocation, "start", null);
    __decorate([
        plugin_1.Cordova()
    ], BackgroundGeolocation, "stop", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows Phone']
        })
    ], BackgroundGeolocation, "finish", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows Phone']
        })
    ], BackgroundGeolocation, "changePace", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], BackgroundGeolocation, "setConfig", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows Phone']
        })
    ], BackgroundGeolocation, "getStationaryLocation", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS', 'Windows Phone']
        })
    ], BackgroundGeolocation, "onStationary", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "isLocationEnabled", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], BackgroundGeolocation, "showAppSettings", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], BackgroundGeolocation, "showLocationSettings", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "watchLocationMode", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "stopWatchingLocationMode", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "getLocations", null);
    __decorate([
        plugin_1.Cordova()
    ], BackgroundGeolocation, "getValidLocations", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "deleteLocation", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], BackgroundGeolocation, "deleteAllLocations", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS']
        })
    ], BackgroundGeolocation, "switchMode", null);
    __decorate([
        plugin_1.Cordova()
    ], BackgroundGeolocation, "getLogEntries", null);
    BackgroundGeolocation = __decorate([
        plugin_1.Plugin({
            pluginName: 'BackgroundGeolocation',
            plugin: 'cordova-plugin-mauron85-background-geolocation',
            pluginRef: 'backgroundGeolocation',
            repo: 'https://github.com/mauron85/cordova-plugin-background-geolocation',
            platforms: ['iOS', 'Android', 'Windows Phone 8']
        })
    ], BackgroundGeolocation);
    return BackgroundGeolocation;
}());
exports.BackgroundGeolocation = BackgroundGeolocation;
//# sourceMappingURL=background-geolocation.js.map