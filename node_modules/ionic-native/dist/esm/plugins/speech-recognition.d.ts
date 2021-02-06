import { Observable } from 'rxjs/Observable';
export declare type SpeechRecognitionListeningOptions = SpeechRecognitionListeningOptionsIOS | SpeechRecognitionListeningOptionsAndroid;
export interface SpeechRecognitionListeningOptionsIOS {
    /**
     * used language for recognition (default `"en-US"`)
     */
    language?: string;
    /**
     * umber of return matches (default `5`)
     */
    matches?: number;
    /**
     * Allow partial results to be returned (default `false`)
     */
    showPartial?: boolean;
}
export interface SpeechRecognitionListeningOptionsAndroid {
    /**
     * used language for recognition (default `"en-US"`)
     */
    language?: string;
    /**
     * number of return matches (maximum number of matches)
     */
    matches?: number;
    /**
     * displayed prompt of listener popup window
     */
    prompt?: string;
    /**
     * display listener popup window with prompt (default `true`)
     */
    showPopup?: boolean;
}
/**
 * @beta
 * @name SpeechRecognition
 * @description
 * This plugin does speech recognition using cloud services
 *
 * @usage
 * ```
 * import { SpeechRecognition } from 'ionic-native';
 *
 * // Check feature available
 * SpeechRecognition.isRecognitionAvailable()
 *   .then((available: boolean) => console.log(available))
 *
 * // Start the recognition process
 * SpeechRecognition.startListening(options)
 *   .subscribe(
 *     (matches: Array<string>) => console.log(matches),
 *     (onerror) => console.log('error:', onerror)
 *   )
 *
 * // Stop the recognition process (iOS only)
 * SpeechRecognition.stopListening()
 *
 * // Get the list of supported languages
 * SpeechRecognition.getSupportedLanguages()
 *   .then(
 *     (languages: Array<string>) => console.log(languages),
 *     (error) => console.log(error)
 *   )
 *
 * // Check permission
 * SpeechRecognition.hasPermission()
 *   .then((hasPermission: boolean) => console.log(hasPermission))
 *
 * // Request permissions
 * SpeechRecognition.requestPermission()
 *   .then(
 *     () => console.log('Granted'),
 *     () => console.log('Denied')
 *   )
 *
 * ```
 */
export declare class SpeechRecognition {
    /**
     * Check feature available
     * @return {Promise<boolean>}
     */
    static isRecognitionAvailable(): Promise<boolean>;
    /**
     * Start the recognition process
     * @return {Promise< Array<string> >} list of recognized terms
     */
    static startListening(options?: SpeechRecognitionListeningOptions): Observable<Array<string>>;
    /**
     * Stop the recognition process
     */
    static stopListening(): Promise<void>;
    /**
     * Get the list of supported languages
     * @return {Promise< Array<string> >} list of languages
     */
    static getSupportedLanguages(): Promise<Array<string>>;
    /**
     * Check permission
     * @return {Promise<boolean>} has permission
     */
    static hasPermission(): Promise<boolean>;
    /**
     * Request permissions
     * @return {Promise<void>}
     */
    static requestPermission(): Promise<void>;
}
