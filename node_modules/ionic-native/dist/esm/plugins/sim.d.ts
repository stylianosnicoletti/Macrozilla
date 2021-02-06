/**
 * @name Sim
 * @description
 * Gets info from the Sim card like the carrier name, mcc, mnc and country code and other system dependent info.
 *
 * Requires Cordova plugin: `cordova-plugin-sim`. For more info, please see the [Cordova Sim docs](https://github.com/pbakondy/cordova-plugin-sim).
 *
 * @usage
 * ```typescript
 * import { Sim } from 'ionic-native';
 *
 *
 * Sim.getSimInfo().then(
 *   (info) => console.log('Sim info: ', info),
 *   (err) => console.log('Unable to get sim info: ', err)
 * );
 *
 * Sim.hasReadPermission().then(
 *   (info) => console.log('Has permission: ', info)
 * );
 *
 * Sim.requestReadPermission().then(
 *   () => console.log('Permission granted'),
 *   () => console.log('Permission denied')
 * );
 * ```
 */
export declare class Sim {
    /**
     * Returns info from the SIM card.
     * @returns {Promise<any>}
     */
    static getSimInfo(): Promise<any>;
    /**
     * Check permission
     * @returns {Promise<any>}
     */
    static hasReadPermission(): Promise<any>;
    /**
     * Request permission
     * @returns {Promise<any>}
     */
    static requestReadPermission(): Promise<any>;
}
