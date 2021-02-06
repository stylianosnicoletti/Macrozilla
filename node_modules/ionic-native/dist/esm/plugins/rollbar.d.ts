/**
 * @beta
 * @name Rollbar
 * @description
 * This plugin adds Rollbar App monitoring to your application
 *
 * @usage
 * ```
 * import { Rollbar } from 'ionic-native';
 *
 * Rollbar.init();
 *
 * ```
 */
export declare class Rollbar {
    /**
     * This function initializes the monitoring of your application
     * @return {Promise<any>} Returns a promise that resolves when the plugin successfully initializes
     */
    static init(): Promise<any>;
}
