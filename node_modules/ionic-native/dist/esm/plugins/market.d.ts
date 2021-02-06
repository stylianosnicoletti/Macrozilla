/**
 * @name Market
 * @description
 * Opens an app's page in the market place (Google Play, App Store)
 *
 * @usage
 * ```
 * import {Market} from 'ionic-native';
 *
 * Market.open('your.package.name');
 *
 * ```
 */
export declare class Market {
    /**
     * Opens an app in Google Play / App Store
     * @param appId {string} Package name
     * @return {Promise<any>}
     */
    static open(appId: string): Promise<any>;
    /**
     * Search apps by keyword
     * @param keyword {string} Keyword
     * @return {Promise<any>}
     */
    static search(keyword: string): Promise<any>;
}
