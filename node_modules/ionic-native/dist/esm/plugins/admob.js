var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Cordova, Plugin } from './plugin';
/**
 * @name AdMob
 * @description
 * Plugin for Google Ads, including AdMob / DFP (doubleclick for publisher) and mediations to other Ad networks.
 * @usage
 * ```typescript
 * import { AdMob } from 'ionic-native';
 *
 * ionViewDidLoad() {
 *   AdMob.onAdDismiss()
 *     .subscribe(() => { console.log('User dismissed ad'); });
 * }
 *
 * onClick() {
 *   AdMob.prepareInterstitial('YOUR_ADID')
 *     .then(() => { AdMob.showInterstitial(); });
 * }
 *
 * ```
 *
 * @interfaces
 * AdMobOptions
 * AdMobAdExtras
 */
export var AdMob = (function () {
    function AdMob() {
    }
    /**
     * Create a banner
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when the banner is created
     */
    AdMob.createBanner = function (adIdOrOptions) { return; };
    /**
     * Destroy the banner, remove it from screen.
     */
    AdMob.removeBanner = function () { };
    /**
     * Show banner at position
     * @param position {number} Position. Use `AdMob.AD_POSITION` to set values.
     */
    AdMob.showBanner = function (position) { };
    /**
     * Show banner at custom position
     * @param x {number} Offset from screen left.
     * @param y {number} Offset from screen top.
     */
    AdMob.showBannerAtXY = function (x, y) { };
    /**
     * Hide the banner, remove it from screen, but can show it later
     */
    AdMob.hideBanner = function () { };
    /**
     * Prepare interstitial banner
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when interstitial is prepared
     */
    AdMob.prepareInterstitial = function (adIdOrOptions) { return; };
    /**
     * Show interstitial ad when it's ready
     */
    AdMob.showInterstitial = function () { };
    /**
     * Prepare a reward video ad
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when the ad is prepared
     */
    AdMob.prepareRewardVideoAd = function (adIdOrOptions) { return; };
    /**
     * Show a reward video ad
     */
    AdMob.showRewardVideoAd = function () { };
    /**
     * Sets the values for configuration and targeting
     * @param options {AdMobOptions} Options
     * @returns {Promise<any>} Returns a Promise that resolves when the options have been set
     */
    AdMob.setOptions = function (options) { return; };
    /**
     * Get user ad settings
     * @returns {Promise<any>} Returns a promise that resolves with the ad settings
     */
    AdMob.getAdSettings = function () { return; };
    /**
     * Triggered when failed to receive Ad
     * @returns {Observable<any>}
     */
    AdMob.onAdFailLoad = function () { return; };
    /**
     * Triggered when Ad received
     * @returns {Observable<any>}
     */
    AdMob.onAdLoaded = function () { return; };
    /**
     * Triggered when Ad will be showed on screen
     * @returns {Observable<any>}
     */
    AdMob.onAdPresent = function () { return; };
    /**
     * Triggered when user click the Ad, and will jump out of your App
     * @returns {Observable<any>}
     */
    AdMob.onAdLeaveApp = function () { return; };
    /**
     * Triggered when dismiss the Ad and back to your App
     * @returns {Observable<any>}
     */
    AdMob.onAdDismiss = function () { return; };
    /**
     * @private
     */
    AdMob.AD_POSITION = {
        NO_CHANGE: 0,
        TOP_LEFT: 1,
        TOP_CENTER: 2,
        TOP_RIGHT: 3,
        LEFT: 4,
        CENTER: 5,
        RIGHT: 6,
        BOTTOM_LEFT: 7,
        BOTTOM_CENTER: 8,
        BOTTOM_RIGHT: 9,
        POS_XY: 10
    };
    __decorate([
        Cordova()
    ], AdMob, "createBanner", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "removeBanner", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "showBanner", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "showBannerAtXY", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "hideBanner", null);
    __decorate([
        Cordova()
    ], AdMob, "prepareInterstitial", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "showInterstitial", null);
    __decorate([
        Cordova()
    ], AdMob, "prepareRewardVideoAd", null);
    __decorate([
        Cordova({
            sync: true
        })
    ], AdMob, "showRewardVideoAd", null);
    __decorate([
        Cordova()
    ], AdMob, "setOptions", null);
    __decorate([
        Cordova()
    ], AdMob, "getAdSettings", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'onAdFailLoad'
        })
    ], AdMob, "onAdFailLoad", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'onAdLoaded'
        })
    ], AdMob, "onAdLoaded", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'onAdPresent'
        })
    ], AdMob, "onAdPresent", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'onAdLeaveApp'
        })
    ], AdMob, "onAdLeaveApp", null);
    __decorate([
        Cordova({
            eventObservable: true,
            event: 'onAdDismiss'
        })
    ], AdMob, "onAdDismiss", null);
    AdMob = __decorate([
        Plugin({
            pluginName: 'AdMob',
            plugin: 'cordova-plugin-admobpro',
            pluginRef: 'AdMob',
            repo: 'https://github.com/floatinghotpot/cordova-admob-pro',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], AdMob);
    return AdMob;
}());
//# sourceMappingURL=admob.js.map