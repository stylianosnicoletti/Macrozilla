/**
 * @name Couchbase Lite
 * @description
 * Plugin to install Couchbase Lite in your PhoneGap app on iOS or Android
 *
 * @usage
 * ```
 * import { CouchbaseLite } from 'ionic-native';
 *
 * CouchbaseLite.getURL()
 *   .then((url: any) => console.log(url))
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
export declare class CouchbaseLite {
    /**
     * Get the database url
     * @return {Promise<any>} Returns a promise that resolves with the local database url
     */
    static getURL(): Promise<any>;
}
