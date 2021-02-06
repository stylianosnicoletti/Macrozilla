import { Observable } from 'rxjs/Observable';
/**
 * @name Broadcaster
 * @description
 * This plugin adds exchanging events between native code and your app.
 *
 * @usage
 * ```
 * import { Broadcaster } from 'ionic-native';
 *
 * // Listen to events from Native
 * Broadcaster.addEventListener('eventName').then((event) => console.log(event));
 *
 * // Send event to Native
 * Broadcaster.fireNativeEvent('eventName', {}).then(() => console.log('success'));
 *
 * ```
 */
export declare class Broadcaster {
    /**
     * This function listen to an event sent from the native code
     * @param eventName {string}
     * @return {Observable<any>} Returns an observable to watch when an event is received
     */
    static addEventListener(eventName: string): Observable<any>;
    /**
     * This function sends data to the native code
     * @param eventName {string}
     * @param eventData {any}
     * @return {Promise<any>} Returns a promise that resolves when an event is successfully fired
     */
    static fireNativeEvent(eventName: string, eventData: any): Promise<any>;
}
