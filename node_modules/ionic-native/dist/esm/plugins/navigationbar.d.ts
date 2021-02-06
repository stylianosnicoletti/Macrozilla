/**
 * @beta
 * @name NavigationBar
 * @description
 * The NavigationBar plugin can you to hide and auto hide the android navigation bar.
 *
 * @usage
 * ```typescript
 * import { NavigationBar } from 'ionic-native';
 *
 * let autoHide: boolean = true;
 * NavigationBar.hide(autoHide);
 * ```
 */
export declare class NavigationBar {
    /**
     * hide automatically (or not) the navigation bar.
     * @param autohide {boolean}
     * @return {Promise<any>}
     */
    static setUp(autohide?: boolean): Promise<any>;
    /**
     * Hide the navigation bar.
     * @return {Promise<any>}
     */
    static hideNavigationBar(): Promise<any>;
}
