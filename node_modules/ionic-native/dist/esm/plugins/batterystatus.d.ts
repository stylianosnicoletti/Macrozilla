import { Observable } from 'rxjs/Observable';
export interface BatteryStatusResponse {
    /**
     * The battery charge percentage
     */
    level: number;
    /**
     * A boolean that indicates whether the device is plugged in
     */
    isPlugged: boolean;
}
/**
 * @name Battery Status
 * @description
 * Requires Cordova plugin: cordova-plugin-batterystatus. For more info, please see the [BatteryStatus plugin docs](https://github.com/apache/cordova-plugin-battery-status).
 *
 * @usage
 * ```typescript
 * import { BatteryStatus } from 'ionic-native';
 *
 *
 * // watch change in battery status
 * let subscription = BatteryStatus.onChange().subscribe(
 *  (status: StatusObject) => {
 *    console.log(status.level, status.isPlugged);
 *  }
 * );
 *
 * // stop watch
 * subscription.unsubscribe();
 *
 * ```
 * @interfaces
 * BatteryStatusResponse
 */
export declare class BatteryStatus {
    /**
     * Watch the change in battery level
     * @returns {Observable<BatteryStatusResponse>} Returns an observable that pushes a status object
     */
    static onChange(): Observable<BatteryStatusResponse>;
    /**
     * Watch when the battery level goes low
     * @returns {Observable<BatteryStatusResponse>} Returns an observable that pushes a status object
     */
    static onLow(): Observable<BatteryStatusResponse>;
    /**
     * Watch when the battery level goes to critial
     * @returns {Observable<BatteryStatusResponse>} Returns an observable that pushes a status object
     */
    static onCritical(): Observable<BatteryStatusResponse>;
}
