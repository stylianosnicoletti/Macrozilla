/**
 * @name HeaderColor
 * @description
 * Cordova plugin to change color of header in multitask view
 *
 * @usage
 * ```typescript
 * import { HeaderColor } from 'ionic-native';
 *
 * HeaderColor.tint("#becb29");
 * ```
 */
export declare class HeaderColor {
    /**
     * Set a color to the task header
     * @param color {string} The hex value of the color
     * @returns {Promise<any>}
     */
    static tint(color: string): Promise<any>;
}
