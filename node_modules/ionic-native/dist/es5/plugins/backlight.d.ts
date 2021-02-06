/**
 * @beta
 * @name Backlight
 * @description
 * This plugin adds turning on/off the device backlight.
 *
 * @usage
 * ```
 * import { Backlight } from 'ionic-native';
 *
 * // Turn backlight on
 * Backlight.on().then(() => console.log('backlight on'));
 *
 * // Turn backlight off
 * Backlight.off().then(() => console.log('backlight off'));
 *
 * ```
 */
export declare class Backlight {
    /**
     * This function turns backlight on
     * @return {Promise<any>} Returns a promise that resolves when the backlight is on
     */
    static on(): Promise<any>;
    /**
     * This function turns backlight off
     * @return {Promise<any>} Returns a promise that resolves when the backlight is off
     */
    static off(): Promise<any>;
}
