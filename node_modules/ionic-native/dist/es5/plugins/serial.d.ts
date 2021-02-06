import { Observable } from 'rxjs/Observable';
export interface SerialPermissionOptions {
    vid: string;
    pid: string;
    driver: string;
}
export interface SerialOpenOptions {
    baudRate: number;
}
/**
 * @name Serial
 * @description
 * This plugin provides functions for working with Serial connections
 *
 * @usage
 *
 * ```
 * import { Serial } from 'ionic-native';
 *
 * Serial.requestPermission().then(() => {
 *   Serial.open({
 *     baudRate: 9800
 *   }).then(() => {
 *     console.log('Serial connection opened');
 *   });
 * }).catch((error: any) => console.log(error));
 *
 * ```
 */
export declare class Serial {
    /**
     * Request permission to connect to a serial device
     *
     * @param options {SerialPermissionOptions} Options used to request serial permissions for an unknown device
     * @return {Promise<any>} Returns a promise that resolves when permissions are granted
     */
    static requestPermission(options?: SerialPermissionOptions): Promise<any>;
    /**
     * Open connection to a serial device
     *
     * @param options {SerialOpenOptions} Options used to open serial connection
     * @return {Promise<any>} Returns a promise that resolves when the serial connection is opened
     */
    static open(options: SerialOpenOptions): Promise<any>;
    /**
     * Write to a serial connection
     *
     * @param data {any} data to write to the serial connection
     * @return {Promise<any>} Returns a promise that resolves when the write is complete
     */
    static write(data: any): Promise<any>;
    /**
     * Write hex to a serial connection
     *
     * @param data {any} data to write to the serial connection
     * @return {Promise<any>} Returns a promise that resolves when the write is complete
     */
    static writeHex(data: any): Promise<any>;
    /**
     * Read from a serial connection
     *
     * @return {Promise<any>} Returns a promise that resolves with data read from the serial connection
     */
    static read(): Promise<any>;
    /**
     * Watch the incoming data from the serial connection. Clear the watch by unsubscribing from the observable
     *
     * @returns {Observable<any>} Observable returns an observable that you can subscribe to
     */
    static registerReadCallback(): Observable<any>;
    /**
     * Close the serial connection
     *
     * @return {Promise<any>} Returns a promise that resolves when the serial connection is closed
     */
    static close(): Promise<any>;
}
