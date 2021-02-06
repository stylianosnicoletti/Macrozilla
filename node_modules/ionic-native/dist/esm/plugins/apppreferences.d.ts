import { Observable } from 'rxjs/Observable';
/**
 * @name AppPreferences
 * @description
 * This plugin allows you to read and write app preferences
 *
 * @usage
 * ```
 * import { AppPreferences } from 'ionic-native';
 *
 * AppPreferences.fetch('key').then((res) => { console.log(res); });
 *
 *```
 */
export declare class AppPreferences {
    /**
     * Get a preference value
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @return {Promise<any>} Returns a promise
     */
    static fetch(dict: string, key?: string): Promise<any>;
    /**
     * Set a preference value
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @param {string} value Value
     * @return {Promise<any>} Returns a promise
     */
    static store(dict: string, key: string, value?: string): Promise<any>;
    /**
     * Remove value from preferences
     *
     * @param {string} dict Dictionary for key (OPTIONAL)
     * @param {string} key Key
     * @return {Promise<any>} Returns a promise
     */
    static remove(dict: string, key?: string): Promise<any>;
    /**
     * Clear preferences
     *
     * @return {Promise<any>} Returns a promise
     */
    static clearAll(): Promise<any>;
    /**
     * Show native preferences interface
     *
     * @return {Promise<any>} Returns a promise
     */
    static show(): Promise<any>;
    /**
     * Show native preferences interface
     *
     * @param {boolean} subscribe true value to subscribe, false - unsubscribe
     * @return {Observable<any>} Returns an observable
     */
    static watch(subscribe: boolean): Observable<any>;
    /**
     * Return named configuration context
     * In iOS you'll get a suite configuration, on Android — named file
     * Supports: Android, iOS
     * @param {string} suiteName suite name
     * @returns {Object} Custom object, bound to that suite
     */
    static suite(suiteName: string): Object;
    static iosSuite(suiteName: string): Object;
    /**
     * Return cloud synchronized configuration context
     * Currently supports Windows and iOS/macOS
     * @returns {Object} Custom object, bound to that suite
     */
    static cloudSync(): Object;
    /**
     * Return default configuration context
     * Currently supports Windows and iOS/macOS
     * @returns {Object} Custom Object, bound to that suite
     */
    static defaults(): Object;
}
