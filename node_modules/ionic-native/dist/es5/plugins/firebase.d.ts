import { Observable } from 'rxjs/Observable';
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
export declare class Firebase {
    /**
     * Get the device token
     * @return {Promise<any>}
     */
    static getToken(): Promise<any>;
    /**
     * Get notified when a token is refreshed
     * @return {Observable<any>}
     */
    static onTokenRefresh(): Observable<any>;
    /**
     * Get notified when the user opens a notification
     * @return {Observable<any>}
     */
    static onNotificationOpen(): Observable<any>;
    /**
     * Grant permission to recieve push notifications
     * @return {Promise<any>}
     */
    static grantPermission(): Promise<any>;
    /**
   * Check permission to recieve push notifications
   * @return {Promise<any>}
   */
    static hasPermission(): Promise<any>;
    /**
     * Set icon badge number. Set to 0 to clear the badge.
     * @param badgeNumber {number}
     * @return {Promise<any>}
     */
    static setBadgeNumber(badgeNumber: number): Promise<any>;
    /**
     * Get icon badge number
     * @return {Promise<any>}
     */
    static getBadgeNumber(): Promise<any>;
    /**
     * Subscribe to a topic
     * @param topic {string}
     * @return {Promise<any>}
     */
    static subscribe(topic: string): Promise<any>;
    /**
     * Unsubscribe from a topic
     * @param topic {string}
     * @return {Promise<any>}
     */
    static unsubscribe(topic: string): Promise<any>;
    /**
     * Log an event using Analytics
     * @param type {string}
     * @param data {Object}
     * @return {Promise<any>}
     */
    static logEvent(type: string, data: any): Promise<any>;
    /**
     * Set the name of the current screen in Analytics
     * @param name {string} Screen name
     * @return {Promise<any>}
     */
    static setScreenName(name: string): Promise<any>;
    /**
     * Set a user id for use in Analytics
     * @param userId {string}
     * @return {Promise<any>}
     */
    static setUserId(userId: string): Promise<any>;
    /**
     * Set a user property for use in Analytics
     * @param name {string}
     * @param value {string}
     * @return {Promise<any>}
     */
    static setUserProperty(name: string, value: string): Promise<any>;
    /**
     * Fetch Remote Config parameter values for your app
     * @param cacheExpirationSeconds
     * @return {Promise<any>}
     */
    static fetch(cacheExpirationSeconds?: number): Promise<any>;
    /**
     * Activate the Remote Config fetched config
     * @return {Promise<any>}
     */
    static activateFetched(): Promise<any>;
    /**
     * Retrieve a Remote Config value
     * @param key {string}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    static getValue(key: string, namespace?: string): Promise<any>;
    /**
     * Retrieve a Remote Config byte array
     * @param key {string}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    static getByteArray(key: string, namespace?: string): Promise<any>;
    /**
     * Get the current state of the FirebaseRemoteConfig singleton object
     * @return {Promise<any>}
     */
    static getInfo(): Promise<any>;
    /**
     * Change the settings for the FirebaseRemoteConfig object's operations
     * @param settings {Object}
     * @return {Promise<any>}
     */
    static setConfigSettings(settings: any): Promise<any>;
    /**
     * Set defaults in the Remote Config
     * @param defaults {Object}
     * @param namespace {string}
     * @return {Promise<any>}
     */
    static setDefaults(defaults: any, namespace: string): Promise<any>;
}
