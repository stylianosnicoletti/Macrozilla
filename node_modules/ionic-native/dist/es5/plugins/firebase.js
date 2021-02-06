"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Firebase
 * @description
 * This plugin brings push notifications, analytics, event tracking, crash reporting and more from Google Firebase to your Cordova project! Android and iOS supported (including iOS 10).
 *
 * @usage
 * ```
 * import { Firebase } from 'ionic-native';
 *
 * Firebase.getToken()
 *   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
 *   .catch(error => console.error('Error getting token', error));
 *
 * Firebase.onTokenRefresh()
 *   .subscribe((token: string) => console.log(`Got a new token ${token}`));
 *
 * ```
 */
var Firebase = (function () {
    function Firebase() {
    }
    /**
     * Get the device token
     * @return {Promise<any>}
     */
    Firebase.getToken = function () { return; };
    /**
     * Get notified when a token is refreshed
     * @return {Observable<any>}
     */
    Firebase.onTokenRefresh = function () { return; };
    /**
     * Get notified when the user opens a notification
     * @return {Observable<any>}
     */
    Firebase.onNotificationOpen = function () { return; };
    /**
     * Grant permission to recieve push notifications
     * @return {Promise<any>}
     */
    Firebase.grantPermission = function () { return; };
    /**
   * Check permission to recieve push notifications
   * @return {Promise<any>}
   */
    Firebase.hasPermission = function () { return; };
    /**
     * Set icon badge number. Set to 0 to clear the badge.
     * @param badgeNumber {number}
     * @return {Promise<any>}
     */
    Firebase.setBadgeNumber = function (badgeNumber) { return; };
    /**
     * Get icon badge number
     * @return {Promise<any>}
     */
    Firebase.getBadgeNumber = function () { return; };
    /**
     * Subscribe to a topic
     * @param topic {string}
     * @return {Promise<any>}
     */
    Firebase.subscribe = function (topic) { return; };
    /**
     * Unsubscribe from a topic
     * @param topic {string}
     * @return {Promise<any>}
     */
    Firebase.unsubscribe = function (topic) { return; };
    /**
     * Log an event using Analytics
     * @param type {string}
     * @param data {Object}
     * @return {Promise<any>}
     */
    Firebase.logEvent = function (type, data) { return; };
    /**
     * Set the name of the current screen in Analytics
     * @param name {string} Screen name
     * @return {Promise<any>}
     */
    Firebase.setScreenName = function (name) { return; };
    /**
     * Set a user id for use in Analytics
     * @param userId {string}
     * @return {Promise<any>}
     */
    Firebase.setUserId = function (userId) { return; };
    /**
     * Set a user property for use in Analytics
     * @param name {string}
     * @param value {string}
     * @return {Promise<any>}
     */
    Firebase.setUserProperty = function (name, value) { return; };
    /**
     * Fetch Remote Config parameter values for your app
     * @param cacheExpirationSeconds
     * @return {Promise<any>}
     */
    Firebase.fetch = function (cacheExpirationSeconds) { return; };
    /**
     * Activate the Remote Config fetched config
     * @return {Promise<any>}
     */
    Firebase.activateFetched = function () { return; };
    /**
     * Retrieve a Remote Config value
     * @param key {string}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    Firebase.getValue = function (key, namespace) { return; };
    /**
     * Retrieve a Remote Config byte array
     * @param key {string}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    Firebase.getByteArray = function (key, namespace) { return; };
    /**
     * Get the current state of the FirebaseRemoteConfig singleton object
     * @return {Promise<any>}
     */
    Firebase.getInfo = function () { return; };
    /**
     * Change the settings for the FirebaseRemoteConfig object's operations
     * @param settings {Object}
     * @return {Promise<any>}
     */
    Firebase.setConfigSettings = function (settings) { return; };
    /**
     * Set defaults in the Remote Config
     * @param defaults {Object}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    Firebase.setDefaults = function (defaults, namespace) { return; };
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "getToken", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], Firebase, "onTokenRefresh", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], Firebase, "onNotificationOpen", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS']
        })
    ], Firebase, "grantPermission", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['iOS']
        })
    ], Firebase, "hasPermission", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "setBadgeNumber", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "getBadgeNumber", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "subscribe", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "unsubscribe", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "logEvent", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "setScreenName", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "setUserId", null);
    __decorate([
        plugin_1.Cordova()
    ], Firebase, "setUserProperty", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            successIndex: 1,
            errorIndex: 2
        })
    ], Firebase, "fetch", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], Firebase, "activateFetched", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            successIndex: 2,
            errorIndex: 3
        })
    ], Firebase, "getValue", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            successIndex: 2,
            errorIndex: 3
        })
    ], Firebase, "getByteArray", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], Firebase, "getInfo", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android']
        })
    ], Firebase, "setConfigSettings", null);
    __decorate([
        plugin_1.Cordova({
            platforms: ['Android'],
            successIndex: 2,
            errorIndex: 3
        })
    ], Firebase, "setDefaults", null);
    Firebase = __decorate([
        plugin_1.Plugin({
            pluginName: 'Firebase',
            plugin: 'cordova-plugin-firebase',
            pluginRef: 'FirebasePlugin',
            repo: 'https://github.com/arnesson/cordova-plugin-firebase',
            platforms: ['Android', 'iOS']
        })
    ], Firebase);
    return Firebase;
}());
exports.Firebase = Firebase;
//# sourceMappingURL=firebase.js.map