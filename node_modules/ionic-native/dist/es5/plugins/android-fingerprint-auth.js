"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Android Fingerprint Auth
 * @description
 * This plugin will open a native dialog fragment prompting the user to authenticate using their fingerprint. If the device has a secure lockscreen (pattern, PIN, or password), the user may opt to authenticate using that method as a backup.
 * @usage
 * ```typescript
 * import { AndroidFingerprintAuth } from 'ionic-native';
 *
 * AndroidFingerprintAuth.isAvailable()
 *   .then((result)=> {
 *     if(result.isAvailable){
 *       // it is available
 *
 *       AndroidFingerprintAuth.encrypt({ clientId: "myAppName", username: "myUsername", password: "myPassword" })
 *         .then(result => {
 *            if (result.withFingerprint) {
 *                console.log("Successfully encrypted credentials.");
 *                console.log("Encrypted credentials: " + result.token);
 *            } else if (result.withBackup) {
 *              console.log('Successfully authenticated with backup password!');
 *            } else console.log('Didn\'t authenticate!');
 *         })
 *         .catch(error => {
 *            if (error === "Cancelled") {
 *              console.log("Fingerprint authentication cancelled");
 *            } else console.error(error)
 *         });
 *
 *     } else {
 *       // fingerprint auth isn't available
 *     }
 *   })
 *   .catch(error => console.error(error));
 * ```
 * @interfaces
 * AndroidFingerprintAuthOptions
 */
var AndroidFingerprintAuth = (function () {
    function AndroidFingerprintAuth() {
    }
    /**
     * Opens a native dialog fragment to use the device hardware fingerprint scanner to authenticate against fingerprints registered for the device.
     * @param options {AndroidFingerprintAuthOptions} Options
     * @returns {Promise<any>}
     */
    AndroidFingerprintAuth.encrypt = function (options) { return; };
    /**
     * Opens a native dialog fragment to use the device hardware fingerprint scanner to authenticate against fingerprints registered for the device.
     * @param options {AndroidFingerprintAuthOptions} Options
     * @returns {Promise<any>}
     */
    AndroidFingerprintAuth.decrypt = function (options) { return; };
    /**
     * Check if service is available
     * @returns {Promise<any>} Returns a Promise that resolves if fingerprint auth is available on the device
     */
    AndroidFingerprintAuth.isAvailable = function () { return; };
    /**
     * Delete the cipher used for encryption and decryption by username
     * @returns {Promise<any>} Returns a Promise that resolves if the cipher was successfully deleted
     */
    AndroidFingerprintAuth.delete = function (options) { return; };
    __decorate([
        plugin_1.Cordova()
    ], AndroidFingerprintAuth, "encrypt", null);
    __decorate([
        plugin_1.Cordova()
    ], AndroidFingerprintAuth, "decrypt", null);
    __decorate([
        plugin_1.Cordova()
    ], AndroidFingerprintAuth, "isAvailable", null);
    __decorate([
        plugin_1.Cordova()
    ], AndroidFingerprintAuth, "delete", null);
    AndroidFingerprintAuth = __decorate([
        plugin_1.Plugin({
            pluginName: 'AndroidFingerprintAuth',
            plugin: 'cordova-plugin-android-fingerprint-auth',
            pluginRef: 'FingerprintAuth',
            repo: 'https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth'
        })
    ], AndroidFingerprintAuth);
    return AndroidFingerprintAuth;
}());
exports.AndroidFingerprintAuth = AndroidFingerprintAuth;
//# sourceMappingURL=android-fingerprint-auth.js.map