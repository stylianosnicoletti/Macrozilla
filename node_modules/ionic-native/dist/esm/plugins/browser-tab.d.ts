/**
 * @name BrowserTab
 * @description
 * This plugin provides an interface to in-app browser tabs that exist on some mobile platforms, specifically [Custom Tabs](http://developer.android.com/tools/support-library/features.html#custom-tabs) on Android (including the [Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) implementation), and [SFSafariViewController](https://developer.apple.com/library/ios/documentation/SafariServices/Reference/SFSafariViewController_Ref/) on iOS.
 *
 * @usage
 * ```
 * import { BrowserTab } from 'ionic-native';
 *
 * BrowserTab.isAvailable()
 *   .then((isAvailable: boolean) => {
 *
 *     if (isAvailable) {
 *
 *       BrowserTab.openUrl('https://ionic.io');
 *
 *     } else {
 *       // open url with InAppBrowser instead
 *     }
 *
 *   });
 *
 * ```
 */
export declare class BrowserTab {
    /**
     * Check if BrowserTab option is available
     * @return {Promise<any>} Returns a promise that resolves when check is successful and returns true or false
     */
    static isAvailable(): Promise<any>;
    /**
     * Opens the provided URL using a browser tab
     * @param {string} url  The URL you want to open
     * @return {Promise<any>} Returns a promise that resolves when check open was successful
     */
    static openUrl(url: string): Promise<any>;
    /**
     * Closes browser tab
     * @return {Promise<any>} Returns a promise that resolves when close was finished
     */
    static close(): Promise<any>;
}
