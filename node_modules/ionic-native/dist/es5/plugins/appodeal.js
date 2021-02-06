"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
var rxjs_1 = require('rxjs');
/**
 * @name Appodeal
 * @description
 * Plugin to serve ads through native Appodeal SDKs
 *
 * @usage
 * ```
 * import { Appodeal } from 'ionic-native';
 *
 * let appKey = '<your app key>';
 * Appodeal.initialize(appKey, Appodeal.AD_TYPES.REWARDED_VIDEO);
 * Appodeal.show(Appodeal.AD_TYPES.REWARDED_VIDEO);
 *
 * ```
 */
var Appodeal = (function () {
    function Appodeal() {
    }
    /**
     * initialize Appodeal SDK
     * @param {string} appKey
     * @param {number} adType
     */
    Appodeal.initialize = function (appKey, adType) { };
    ;
    /**
     * check if SDK has been initialized
     * @returns {Promise<boolean>}
     */
    Appodeal.isInitialized = function () { return; };
    ;
    /**
     * show ad of specified type
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    Appodeal.show = function (adType) { return; };
    ;
    /**
     * show ad of specified type with placement options
     * @param {number} adType
     * @param {any} placement
     * @returns {Promise<boolean>}
     */
    Appodeal.showWithPlacement = function (adType, placement) { return; };
    ;
    /**
     * hide ad of specified type
     * @param {number} adType
     */
    Appodeal.hide = function (adType) { };
    ;
    /**
     * confirm use of ads of specified type
     * @param {number} adType
     */
    Appodeal.confirm = function (adType) { };
    ;
    /**
     * check if ad of specified type has been loaded
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    Appodeal.isLoaded = function (adType) { return; };
    ;
    /**
     * check if ad of specified
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    Appodeal.isPrecache = function (adType) { return; };
    ;
    /**
     *
     * @param {number} adType
     * @param autoCache
     */
    Appodeal.setAutoCache = function (adType, autoCache) { };
    ;
    /**
     * forcefully cache an ad by type
     * @param {number} adType
     */
    Appodeal.cache = function (adType) { };
    ;
    /**
     *
     * @param {boolean} set
     */
    Appodeal.setOnLoadedTriggerBoth = function (set) { };
    ;
    /**
     * enable or disable Smart Banners
     * @param {boolean} enabled
     */
    Appodeal.setSmartBanners = function (enabled) { };
    ;
    /**
     * enable or disable banner backgrounds
     * @param {boolean} enabled
     */
    Appodeal.setBannerBackground = function (enabled) { };
    ;
    /**
     * enable or disable banner animations
     * @param {boolean} enabled
     */
    Appodeal.setBannerAnimation = function (enabled) { };
    ;
    /**
     *
     * @param value
     */
    Appodeal.set728x90Banners = function (value) { };
    ;
    /**
     * enable or disable logging
     * @param {boolean} logging
     */
    Appodeal.setLogging = function (logging) { };
    ;
    /**
     * enable or disable testing mode
     * @param {boolean} testing
     */
    Appodeal.setTesting = function (testing) { };
    ;
    /**
     * reset device ID
     */
    Appodeal.resetUUID = function () { };
    ;
    /**
     * get version of Appdeal SDK
     */
    Appodeal.getVersion = function () { return; };
    ;
    /**
     *
     * @param {string} network
     * @param {number} adType
     */
    Appodeal.disableNetwork = function (network, adType) { };
    ;
    /**
     *
     * @param {string} network
     * @param {number} adType
     */
    Appodeal.disableNetworkType = function (network, adType) { };
    ;
    /**
     * disable Location permissions for Appodeal SDK
     */
    Appodeal.disableLocationPermissionCheck = function () { };
    ;
    /**
     * disable Storage permissions for Appodeal SDK
     */
    Appodeal.disableWriteExternalStoragePermissionCheck = function () { };
    ;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    Appodeal.enableInterstitialCallbacks = function (enabled) { };
    ;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    Appodeal.enableSkippableVideoCallbacks = function (enabled) { };
    ;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    Appodeal.enableNonSkippableVideoCallbacks = function (enabled) { };
    ;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    Appodeal.enableBannerCallbacks = function (enabled) { };
    ;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    Appodeal.enableRewardedVideoCallbacks = function (enabled) { };
    ;
    /**
     *
     * @param {string} name - name of rule
     * @param {boolean} value
     */
    Appodeal.setCustomBooleanRule = function (name, value) { };
    ;
    /**
     *
     * @param {string} name - name of rule
     * @param {number} value
     */
    Appodeal.setCustomIntegerRule = function (name, value) { };
    ;
    /**
     * set rule with float value
     * @param {string} name
     * @param {number} value
     */
    Appodeal.setCustomDoubleRule = function (name, value) { };
    ;
    /**
     * set rule with string value
     * @param {string} name - name of rule
     * @param {string} value
     */
    Appodeal.setCustomStringRule = function (name, value) { };
    ;
    /**
     * set ID preference in Appodeal for current user
     * @param id
     */
    Appodeal.setUserId = function (id) { };
    ;
    /**
     * set Email preference in Appodeal for current user
     * @param email
     */
    Appodeal.setEmail = function (email) { };
    ;
    /**
     * set Birthday preference in Appodeal for current user
     * @param birthday
     */
    Appodeal.setBirthday = function (birthday) { };
    ;
    /**
     * et Age preference in Appodeal for current user
     * @param age
     */
    Appodeal.setAge = function (age) { };
    ;
    /**
     * set Gender preference in Appodeal for current user
     * @param gender
     */
    Appodeal.setGender = function (gender) { };
    ;
    /**
     * set Occupation preference in Appodeal for current user
     * @param occupation
     */
    Appodeal.setOccupation = function (occupation) { };
    ;
    /**
     * set Relation preference in Appodeal for current user
     * @param relation
     */
    Appodeal.setRelation = function (relation) { };
    ;
    /**
     * set Smoking preference in Appodeal for current user
     * @param smoking
     */
    Appodeal.setSmoking = function (smoking) { };
    ;
    /**
     * set Alcohol preference in Appodeal for current user
     * @param alcohol
     */
    Appodeal.setAlcohol = function (alcohol) { };
    ;
    /**
     * set Interests preference in Appodeal for current user
     * @param interests
     */
    Appodeal.setInterests = function (interests) { };
    ;
    /*********************
     * event Observables *
     *********************/
    Appodeal.onInterstitialLoaded = function () {
        return rxjs_1.Observable.fromEvent(document, 'onInterstitialLoaded');
    };
    Appodeal.onInterstitialFailedToLoad = function () {
        return rxjs_1.Observable.fromEvent(document, 'onInterstitialFailedToLoad');
    };
    Appodeal.onInterstitialShown = function () {
        return rxjs_1.Observable.fromEvent(document, 'onInterstitialShown');
    };
    Appodeal.onInterstitialClicked = function () {
        return rxjs_1.Observable.fromEvent(document, 'onInterstitialClicked');
    };
    Appodeal.onInterstitialClosed = function () {
        return rxjs_1.Observable.fromEvent(document, 'onInterstitialClosed');
    };
    Appodeal.onSkippableVideoLoaded = function () {
        return rxjs_1.Observable.fromEvent(document, 'onSkippableVideoLoaded');
    };
    Appodeal.onSkippableVideoFailedToLoad = function () {
        return rxjs_1.Observable.fromEvent(document, 'onSkippableVideoFailedToLoad');
    };
    Appodeal.onSkippableVideoShown = function () {
        return rxjs_1.Observable.fromEvent(document, 'onSkippableVideoShown');
    };
    Appodeal.onSkippableVideoFinished = function () {
        return rxjs_1.Observable.fromEvent(document, 'onSkippableVideoFinished');
    };
    Appodeal.onSkippableVideoClosed = function () {
        return rxjs_1.Observable.fromEvent(document, 'onSkippableVideoClosed');
    };
    Appodeal.onRewardedVideoLoaded = function () {
        return rxjs_1.Observable.fromEvent(document, 'onRewardedVideoLoaded');
    };
    Appodeal.onRewardedVideoFailedToLoad = function () {
        return rxjs_1.Observable.fromEvent(document, 'onRewardedVideoFailedToLoad');
    };
    Appodeal.onRewardedVideoShown = function () {
        return rxjs_1.Observable.fromEvent(document, 'onRewardedVideoShown');
    };
    Appodeal.onRewardedVideoFinished = function () {
        return rxjs_1.Observable.fromEvent(document, 'onRewardedVideoFinished');
    };
    Appodeal.onRewardedVideoClosed = function () {
        return rxjs_1.Observable.fromEvent(document, 'onRewardedVideoClosed');
    };
    Appodeal.onNonSkippableVideoLoaded = function () {
        return rxjs_1.Observable.fromEvent(document, 'onNonSkippableVideoLoaded');
    };
    Appodeal.onNonSkippableVideoFailedToLoad = function () {
        return rxjs_1.Observable.fromEvent(document, 'onNonSkippableVideoFailedToLoad');
    };
    Appodeal.onNonSkippableVideoShown = function () {
        return rxjs_1.Observable.fromEvent(document, 'onNonSkippableVideoShown');
    };
    Appodeal.onNonSkippableVideoFinished = function () {
        return rxjs_1.Observable.fromEvent(document, 'onNonSkippableVideoFinished');
    };
    Appodeal.onNonSkippableVideoClosed = function () {
        return rxjs_1.Observable.fromEvent(document, 'onNonSkippableVideoClosed');
    };
    Appodeal.onBannerClicked = function () {
        return rxjs_1.Observable.fromEvent(document, 'onBannerClicked');
    };
    Appodeal.onBannerFailedToLoad = function () {
        return rxjs_1.Observable.fromEvent(document, 'onBannerFailedToLoad');
    };
    Appodeal.onBannerLoaded = function () {
        return rxjs_1.Observable.fromEvent(document, 'onBannerLoaded');
    };
    Appodeal.onBannerShown = function () {
        return rxjs_1.Observable.fromEvent(document, 'onBannerShown');
    };
    // available types of advertisements
    Appodeal.AD_TYPES = {
        INTERSTITIAL: 1,
        SKIPPABLE_VIDEO: 2,
        BANNER: 4,
        BANNER_BOTTOM: 8,
        BANNER_TOP: 16,
        REWARDED_VIDEO: 128,
        NON_SKIPPABLE_VIDEO: 256
    };
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "initialize", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "isInitialized", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "show", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "showWithPlacement", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "hide", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "confirm", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "isLoaded", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "isPrecache", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setAutoCache", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "cache", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setOnLoadedTriggerBoth", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setSmartBanners", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setBannerBackground", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setBannerAnimation", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "set728x90Banners", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setLogging", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setTesting", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "resetUUID", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "getVersion", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "disableNetwork", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "disableNetworkType", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "disableLocationPermissionCheck", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "disableWriteExternalStoragePermissionCheck", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "enableInterstitialCallbacks", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "enableSkippableVideoCallbacks", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "enableNonSkippableVideoCallbacks", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "enableBannerCallbacks", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "enableRewardedVideoCallbacks", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setCustomBooleanRule", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setCustomIntegerRule", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setCustomDoubleRule", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setCustomStringRule", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setUserId", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setEmail", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setBirthday", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setAge", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setGender", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setOccupation", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setRelation", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setSmoking", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setAlcohol", null);
    __decorate([
        plugin_1.Cordova()
    ], Appodeal, "setInterests", null);
    Appodeal = __decorate([
        plugin_1.Plugin({
            pluginName: 'Appodeal',
            plugin: 'https://github.com/appodeal/appodeal-cordova-plugin',
            pluginRef: 'Appodeal',
            repo: 'https://github.com/appodeal/appodeal-cordova-plugin.git',
            platforms: ['ios', 'android']
        })
    ], Appodeal);
    return Appodeal;
}());
exports.Appodeal = Appodeal;
//# sourceMappingURL=appodeal.js.map