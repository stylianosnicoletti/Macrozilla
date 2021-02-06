import { Observable } from 'rxjs';
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
export declare class Appodeal {
    static readonly AD_TYPES: {
        INTERSTITIAL: number;
        SKIPPABLE_VIDEO: number;
        BANNER: number;
        BANNER_BOTTOM: number;
        BANNER_TOP: number;
        REWARDED_VIDEO: number;
        NON_SKIPPABLE_VIDEO: number;
    };
    /**
     * initialize Appodeal SDK
     * @param {string} appKey
     * @param {number} adType
     */
    static initialize(appKey: string, adType: number): void;
    /**
     * check if SDK has been initialized
     * @returns {Promise<boolean>}
     */
    static isInitialized(): Promise<any>;
    /**
     * show ad of specified type
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    static show(adType: number): Promise<any>;
    /**
     * show ad of specified type with placement options
     * @param {number} adType
     * @param {any} placement
     * @returns {Promise<boolean>}
     */
    static showWithPlacement(adType: number, placement: any): Promise<any>;
    /**
     * hide ad of specified type
     * @param {number} adType
     */
    static hide(adType: number): void;
    /**
     * confirm use of ads of specified type
     * @param {number} adType
     */
    static confirm(adType: number): void;
    /**
     * check if ad of specified type has been loaded
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    static isLoaded(adType: number): Promise<any>;
    /**
     * check if ad of specified
     * @param {number} adType
     * @returns {Promise<boolean>}
     */
    static isPrecache(adType: number): Promise<any>;
    /**
     *
     * @param {number} adType
     * @param autoCache
     */
    static setAutoCache(adType: number, autoCache: any): void;
    /**
     * forcefully cache an ad by type
     * @param {number} adType
     */
    static cache(adType: number): void;
    /**
     *
     * @param {boolean} set
     */
    static setOnLoadedTriggerBoth(set: boolean): void;
    /**
     * enable or disable Smart Banners
     * @param {boolean} enabled
     */
    static setSmartBanners(enabled: boolean): void;
    /**
     * enable or disable banner backgrounds
     * @param {boolean} enabled
     */
    static setBannerBackground(enabled: boolean): void;
    /**
     * enable or disable banner animations
     * @param {boolean} enabled
     */
    static setBannerAnimation(enabled: boolean): void;
    /**
     *
     * @param value
     */
    static set728x90Banners(value: any): void;
    /**
     * enable or disable logging
     * @param {boolean} logging
     */
    static setLogging(logging: boolean): void;
    /**
     * enable or disable testing mode
     * @param {boolean} testing
     */
    static setTesting(testing: boolean): void;
    /**
     * reset device ID
     */
    static resetUUID(): void;
    /**
     * get version of Appdeal SDK
     */
    static getVersion(): Promise<any>;
    /**
     *
     * @param {string} network
     * @param {number} adType
     */
    static disableNetwork(network?: string, adType?: number): void;
    /**
     *
     * @param {string} network
     * @param {number} adType
     */
    static disableNetworkType(network?: string, adType?: number): void;
    /**
     * disable Location permissions for Appodeal SDK
     */
    static disableLocationPermissionCheck(): void;
    /**
     * disable Storage permissions for Appodeal SDK
     */
    static disableWriteExternalStoragePermissionCheck(): void;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    static enableInterstitialCallbacks(enabled: boolean): void;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    static enableSkippableVideoCallbacks(enabled: boolean): void;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    static enableNonSkippableVideoCallbacks(enabled: boolean): void;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    static enableBannerCallbacks(enabled: boolean): void;
    /**
     * enable event listeners
     * @param {boolean} enabled
     */
    static enableRewardedVideoCallbacks(enabled: boolean): void;
    /**
     *
     * @param {string} name - name of rule
     * @param {boolean} value
     */
    static setCustomBooleanRule(name: string, value: boolean): void;
    /**
     *
     * @param {string} name - name of rule
     * @param {number} value
     */
    static setCustomIntegerRule(name: string, value: number): void;
    /**
     * set rule with float value
     * @param {string} name
     * @param {number} value
     */
    static setCustomDoubleRule(name: string, value: number): void;
    /**
     * set rule with string value
     * @param {string} name - name of rule
     * @param {string} value
     */
    static setCustomStringRule(name: string, value: string): void;
    /**
     * set ID preference in Appodeal for current user
     * @param id
     */
    static setUserId(id: any): void;
    /**
     * set Email preference in Appodeal for current user
     * @param email
     */
    static setEmail(email: any): void;
    /**
     * set Birthday preference in Appodeal for current user
     * @param birthday
     */
    static setBirthday(birthday: any): void;
    /**
     * et Age preference in Appodeal for current user
     * @param age
     */
    static setAge(age: any): void;
    /**
     * set Gender preference in Appodeal for current user
     * @param gender
     */
    static setGender(gender: any): void;
    /**
     * set Occupation preference in Appodeal for current user
     * @param occupation
     */
    static setOccupation(occupation: any): void;
    /**
     * set Relation preference in Appodeal for current user
     * @param relation
     */
    static setRelation(relation: any): void;
    /**
     * set Smoking preference in Appodeal for current user
     * @param smoking
     */
    static setSmoking(smoking: any): void;
    /**
     * set Alcohol preference in Appodeal for current user
     * @param alcohol
     */
    static setAlcohol(alcohol: any): void;
    /**
     * set Interests preference in Appodeal for current user
     * @param interests
     */
    static setInterests(interests: any): void;
    /*********************
     * event Observables *
     *********************/
    static onInterstitialLoaded(): Observable<any>;
    static onInterstitialFailedToLoad(): Observable<any>;
    static onInterstitialShown(): Observable<any>;
    static onInterstitialClicked(): Observable<any>;
    static onInterstitialClosed(): Observable<any>;
    static onSkippableVideoLoaded(): Observable<any>;
    static onSkippableVideoFailedToLoad(): Observable<any>;
    static onSkippableVideoShown(): Observable<any>;
    static onSkippableVideoFinished(): Observable<any>;
    static onSkippableVideoClosed(): Observable<any>;
    static onRewardedVideoLoaded(): Observable<any>;
    static onRewardedVideoFailedToLoad(): Observable<any>;
    static onRewardedVideoShown(): Observable<any>;
    static onRewardedVideoFinished(): Observable<any>;
    static onRewardedVideoClosed(): Observable<any>;
    static onNonSkippableVideoLoaded(): Observable<any>;
    static onNonSkippableVideoFailedToLoad(): Observable<any>;
    static onNonSkippableVideoShown(): Observable<any>;
    static onNonSkippableVideoFinished(): Observable<any>;
    static onNonSkippableVideoClosed(): Observable<any>;
    static onBannerClicked(): Observable<any>;
    static onBannerFailedToLoad(): Observable<any>;
    static onBannerLoaded(): Observable<any>;
    static onBannerShown(): Observable<any>;
}
