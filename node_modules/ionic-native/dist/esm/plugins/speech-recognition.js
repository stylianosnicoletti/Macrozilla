var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
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
export var SpeechRecognition = (function () {
    function SpeechRecognition() {
    }
    /**
     * Check feature available
     * @return {Promise<boolean>}
     */
    SpeechRecognition.isRecognitionAvailable = function () {
        return;
    };
    /**
     * Start the recognition process
     * @return {Promise< Array<string> >} list of recognized terms
     */
    SpeechRecognition.startListening = function (options) {
        return;
    };
    /**
     * Stop the recognition process
     */
    SpeechRecognition.stopListening = function () {
        return;
    };
    /**
     * Get the list of supported languages
     * @return {Promise< Array<string> >} list of languages
     */
    SpeechRecognition.getSupportedLanguages = function () {
        return;
    };
    /**
     * Check permission
     * @return {Promise<boolean>} has permission
     */
    SpeechRecognition.hasPermission = function () {
        return;
    };
    /**
     * Request permissions
     * @return {Promise<void>}
     */
    SpeechRecognition.requestPermission = function () {
        return;
    };
    __decorate([
        Cordova()
    ], SpeechRecognition, "isRecognitionAvailable", null);
    __decorate([
        Cordova({
            callbackOrder: 'reverse',
            observable: true,
        })
    ], SpeechRecognition, "startListening", null);
    __decorate([
        Cordova({
            platforms: ['iOS']
        })
    ], SpeechRecognition, "stopListening", null);
    __decorate([
        Cordova()
    ], SpeechRecognition, "getSupportedLanguages", null);
    __decorate([
        Cordova()
    ], SpeechRecognition, "hasPermission", null);
    __decorate([
        Cordova()
    ], SpeechRecognition, "requestPermission", null);
    SpeechRecognition = __decorate([
        Plugin({
            pluginName: 'SpeechRecognition',
            plugin: 'cordova-plugin-speechrecognition',
            pluginRef: 'plugins.speechRecognition',
            repo: 'https://github.com/pbakondy/cordova-plugin-speechrecognition',
            platforms: ['Android', 'iOS']
        })
    ], SpeechRecognition);
    return SpeechRecognition;
}());
//# sourceMappingURL=speech-recognition.js.map