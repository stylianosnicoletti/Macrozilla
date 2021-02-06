import { Observable } from 'rxjs/Observable';
export declare type AdMobAdSize = 'SMART_BANNER' | 'BANNER' | 'MEDIUM_RECTANGLE' | 'FULL_BANNER' | 'LEADERBOARD' | 'SKYSCRAPER' | 'CUSTOM';
export interface AdMobOptions {
    /**
     * Banner ad ID
     */
    adId?: string;
    /**
     * Banner Ad Size, defaults to `SMART_BANNER`. IT can be: `SMART_BANNER`, `BANNER`, `MEDIUM_RECTANGLE`, `FULL_BANNER`, `LEADERBOARD`, `SKYSCRAPER`, or `CUSTOM`
     */
    adSize?: AdMobAdSize;
    /**
     * Banner width, valid when `adSize` is set to `CUSTOM`
     */
    width?: number;
    /**
     * Banner height, valid when `adSize` is set to `CUSTOM`
     */
    height?: number;
    /**
     * Allow banner to overlap webview, or else it will push webview up or down to avoid overlap. Defaults to false.
     */
    overlap?: boolean;
    /**
     * Position of banner ad. Defaults to `TOP_CENTER`. You can use the `AdMob.AD_POSITION` property to select other values.
     */
    position?: number;
    /**
     * X in pixels. Valid when `position` is set to `POS_XY`
     */
    x?: number;
    /**
     * Y in pixels. Valid when `position` is set to `POS_XY`
     */
    y?: number;
    /**
     * Set to true to receive test ad for testing purposes
     */
    isTesting?: boolean;
    /**
     * Auto show interstitial ad when loaded. Set to false if hope to control the show timing with prepareInterstitial/showInterstitial
     */
    autoShow?: boolean;
    /**
     * Re-create the banner on web view orientation change (not screen orientation), or else just move the banner. Default:true.
     */
    orientationRenew?: boolean;
    /**
     * Set extra color style for Ad
     */
    adExtras?: AdMobAdExtras;
}
export interface AdMobAdExtras {
    color_bg: string;
    color_bg_top: string;
    color_border: string;
    color_link: string;
    color_text: string;
    color_url: string;
}
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
export declare class AdMob {
    /**
     * @private
     */
    static AD_POSITION: {
        NO_CHANGE: number;
        TOP_LEFT: number;
        TOP_CENTER: number;
        TOP_RIGHT: number;
        LEFT: number;
        CENTER: number;
        RIGHT: number;
        BOTTOM_LEFT: number;
        BOTTOM_CENTER: number;
        BOTTOM_RIGHT: number;
        POS_XY: number;
    };
    /**
     * Create a banner
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when the banner is created
     */
    static createBanner(adIdOrOptions: string | AdMobOptions): Promise<any>;
    /**
     * Destroy the banner, remove it from screen.
     */
    static removeBanner(): void;
    /**
     * Show banner at position
     * @param position {number} Position. Use `AdMob.AD_POSITION` to set values.
     */
    static showBanner(position: number): void;
    /**
     * Show banner at custom position
     * @param x {number} Offset from screen left.
     * @param y {number} Offset from screen top.
     */
    static showBannerAtXY(x: number, y: number): void;
    /**
     * Hide the banner, remove it from screen, but can show it later
     */
    static hideBanner(): void;
    /**
     * Prepare interstitial banner
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when interstitial is prepared
     */
    static prepareInterstitial(adIdOrOptions: string | AdMobOptions): Promise<any>;
    /**
     * Show interstitial ad when it's ready
     */
    static showInterstitial(): void;
    /**
     * Prepare a reward video ad
     * @param adIdOrOptions {string | AdMobOptions} Ad ID or Options
     * @returns {Promise<any>} Returns a Promise that resolves when the ad is prepared
     */
    static prepareRewardVideoAd(adIdOrOptions: string | AdMobOptions): Promise<any>;
    /**
     * Show a reward video ad
     */
    static showRewardVideoAd(): void;
    /**
     * Sets the values for configuration and targeting
     * @param options {AdMobOptions} Options
     * @returns {Promise<any>} Returns a Promise that resolves when the options have been set
     */
    static setOptions(options: AdMobOptions): Promise<any>;
    /**
     * Get user ad settings
     * @returns {Promise<any>} Returns a promise that resolves with the ad settings
     */
    static getAdSettings(): Promise<any>;
    /**
     * Triggered when failed to receive Ad
     * @returns {Observable<any>}
     */
    static onAdFailLoad(): Observable<any>;
    /**
     * Triggered when Ad received
     * @returns {Observable<any>}
     */
    static onAdLoaded(): Observable<any>;
    /**
     * Triggered when Ad will be showed on screen
     * @returns {Observable<any>}
     */
    static onAdPresent(): Observable<any>;
    /**
     * Triggered when user click the Ad, and will jump out of your App
     * @returns {Observable<any>}
     */
    static onAdLeaveApp(): Observable<any>;
    /**
     * Triggered when dismiss the Ad and back to your App
     * @returns {Observable<any>}
     */
    static onAdDismiss(): Observable<any>;
}
