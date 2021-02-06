"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * **ANDROID** - Privacy setting for how the notification should be shown on the lockscreen of Android 5+ devices.
 */
(function (OSLockScreenVisibility) {
    /**
     * Fully visible (default)
     */
    OSLockScreenVisibility[OSLockScreenVisibility["Public"] = 1] = "Public";
    /**
     * Contents are hidden
     */
    OSLockScreenVisibility[OSLockScreenVisibility["Private"] = 0] = "Private";
    /**
     * Not shown
     */
    OSLockScreenVisibility[OSLockScreenVisibility["Secret"] = -1] = "Secret";
})(exports.OSLockScreenVisibility || (exports.OSLockScreenVisibility = {}));
var OSLockScreenVisibility = exports.OSLockScreenVisibility;
/**
 * How the notification was displayed to the user. Part of OSNotification. See inFocusDisplaying for more information on how this is used.
 */
(function (OSDisplayType) {
    /**
     * notification is silent, or inFocusDisplaying is disabled.
     */
    OSDisplayType[OSDisplayType["None"] = 0] = "None";
    /**
     * (**DEFAULT**) - native alert dialog display.
     */
    OSDisplayType[OSDisplayType["InAppAlert"] = 1] = "InAppAlert";
    /**
     * native notification display.
     */
    OSDisplayType[OSDisplayType["Notification"] = 2] = "Notification";
})(exports.OSDisplayType || (exports.OSDisplayType = {}));
var OSDisplayType = exports.OSDisplayType;
(function (OSActionType) {
    OSActionType[OSActionType["Opened"] = 0] = "Opened";
    OSActionType[OSActionType["ActionTake"] = 1] = "ActionTake";
})(exports.OSActionType || (exports.OSActionType = {}));
var OSActionType = exports.OSActionType;
/**
 * @name OneSignal
 * @description
 * The OneSignal plugin is an client implementation for using the [OneSignal](https://onesignal.com/) Service.
 * OneSignal is a simple implementation for delivering push notifications.
 *
 * Requires Cordova plugin: `onesignal-cordova-plugin`. For more info, please see the [OneSignal Cordova Docs](https://documentation.onesignal.com/docs/phonegap-sdk-installation).
 *
 * @usage
 * ```typescript
 * import { OneSignal } from 'ionic-native';
 *
 * OneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');
 *
 * OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
 *
 * OneSignal.handleNotificationReceived().subscribe(() => {
 *  // do something when notification is received
 * });
 *
 * OneSignal.handleNotificationOpened().subscribe(() => {
 *   // do something when a notification is opened
 * });
 *
 * OneSignal.endInit();
 * ```
 * @interfaces
 * OSNotification
 * OSLockScreenVisibility
 * OSDisplayType
 * OSNotificationPayload
 * OSActionButton
 * OSBackgroundImageLayout
 * OSNotificationOpenedResult
 * OSActionType
 */
var OneSignal = (function () {
    function OneSignal() {
    }
    /**
     * Start the initialization process. Once you are done configuring OneSignal, call the `endInit` function.
     *
     * @param {string} appId Your OneSignal app id
     * @param {string} googleProjectNumber **ANDROID** - your Google project number; only required for Android GCM/FCM pushes.
     * @returns {any}
     */
    OneSignal.startInit = function (appId, googleProjectNumber) { return; };
    /**
     * Callback to run when a notification is received, whether it was displayed or not.
     *
     * @return {Observable<OneSignalReceivedNotification>}
     */
    OneSignal.handleNotificationReceived = function () { return; };
    /**
     * Callback to run when a notification is tapped on from the notification shade (**ANDROID**) or notification
     * center (**iOS**), or when closing an Alert notification shown in the app (if InAppAlert is enabled in
     * inFocusDisplaying).
     *
     * @return {Observable<OneSignalOpenedNotification>}
     */
    OneSignal.handleNotificationOpened = function () { return; };
    /**
     * **iOS** - Settings for iOS apps
     *
     * @param settings
     *  kOSSettingsKeyAutoPrompt: boolean = true
     *  Auto prompt user for notification permissions.
     *
     *  kOSSettingsKeyInAppLaunchURL: boolean = false
     *  Launch notifications with a launch URL as an in app webview.
     * @returns {any}
     */
    OneSignal.iOSSettings = function (settings) { return; };
    /**
     * Must be called after `startInit` to complete initialization of OneSignal.
     *
     * @returns {any}
     */
    OneSignal.endInit = function () { return; };
    /**
     * Retrieve a list of tags that have been set on the user from the OneSignal server.
     *
     * @returns {Promise<any>} Returns a Promise that resolves when tags are recieved.
     */
    OneSignal.getTags = function () { return; };
    /**
     * Lets you retrieve the OneSignal user id and device token.
     * Your handler is called after the device is successfully registered with OneSignal.
     *
     * @returns {Promise<Object>} Returns a Promise that resolves if the device was successfully registered.
     *
     *  userId {string} OneSignal userId is a UUID formatted string. (unique per device per app)
     *
     *  pushToken {string} A push token is a Google/Apple assigned identifier(unique per device per app).
     */
    OneSignal.getIds = function () { return; };
    /**
     * Tag a user based on an app event of your choosing so later you can create segments on [onesignal.com](https://onesignal.com/) to target these users.
     * Recommend using sendTags over sendTag if you need to set more than one tag on a user at a time.
     *
     * @param {string} Key of your choosing to create or update.
     * @param {string} Value to set on the key. NOTE: Passing in a blank String deletes the key, you can also call deleteTag.
     */
    OneSignal.sendTag = function (key, value) { };
    /**
     * Tag a user based on an app event of your choosing so later you can create segments on [onesignal.com](https://onesignal.com/) to target these users.
     * Recommend using sendTags over sendTag if you need to set more than one tag on a user at a time.
     *
     * @param {string} Pass a json object with key/value pairs like: {key: "value", key2: "value2"}
     */
    OneSignal.sendTags = function (json) { };
    /**
     * Deletes a tag that was previously set on a user with `sendTag` or `sendTags`. Use `deleteTags` if you need to delete more than one.
     *
     * @param {string} Key to remove.
     */
    OneSignal.deleteTag = function (key) { };
    /**
     * Deletes tags that were previously set on a user with `sendTag` or `sendTags`.
     *
     * @param {Array<string>} Keys to remove.
     */
    OneSignal.deleteTags = function (keys) { };
    /**
     * Call this when you would like to prompt an iOS user to accept push notifications with the default system prompt.
     * Only works if you set `kOSSettingsAutoPrompt` to `false` in `iOSSettings`
     */
    OneSignal.registerForPushNotifications = function () { };
    /**
    * Warning:
    * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
    *
    * By default OneSignal always vibrates the device when a notification is displayed unless the device is in a total silent mode.
    * Passing false means that the device will only vibrate lightly when the device is in it's vibrate only mode.
    *
    * @param {boolean} false to disable vibrate, true to re-enable it.
    */
    OneSignal.enableVibrate = function (enable) { };
    /**
    * Warning:
    * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
    *
    * By default OneSignal plays the system's default notification sound when the device's notification system volume is turned on.
    * Passing false means that the device will only vibrate unless the device is set to a total silent mode.
    *
    * @param {boolean} false to disable sound, true to re-enable it.
    */
    OneSignal.enableSound = function (enable) { };
    /**
    *
    * Setting to control how OneSignal notifications will be shown when one is received while your app is in focus. By default this is set to inAppAlert, which can be helpful during development.
    *
    * @param {DisplayType} displayOption
    * @returns {any}
    */
    OneSignal.inFocusDisplaying = function (displayOption) { return; };
    /**
    * You can call this method with false to opt users out of receiving all notifications through OneSignal.
    * You can pass true later to opt users back into notifications.
    *
    * @param {boolean} enable
    */
    OneSignal.setSubscription = function (enable) { };
    /**
    *
    * @param {notificationObj} Parameters see POST [documentation](https://documentation.onesignal.com/v2.0/docs/notifications-create-notification)
    * @returns {Promise<any>} Returns a Promise that resolves if the notification was send successfully.
    */
    OneSignal.postNotification = function (notificationObj) { return; };
    /**
    * Prompts the user for location permission to allow geotagging based on the "Location radius" filter on the OneSignal dashboard.
    */
    OneSignal.promptLocation = function () { };
    /**
     *
     * @param email {string}
     */
    OneSignal.syncHashedEmail = function (email) { };
    /**
    * Enable logging to help debug if you run into an issue setting up OneSignal.
    * The logging levels are as follows: 0 = None, 1= Fatal, 2 = Errors, 3 = Warnings, 4 = Info, 5 = Debug, 6 = Verbose
  
    * The higher the value the more information is shown.
    *
    * @param {loglevel} contains two properties: logLevel (for console logging) and visualLevel (for dialog messages)
    */
    OneSignal.setLogLevel = function (logLevel) { };
    /**
     * constants to use in inFocusDisplaying()
     */
    OneSignal.OSInFocusDisplayOption = {
        None: 0,
        InAppAlert: 1,
        Notification: 2
    };
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "startInit", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], OneSignal, "handleNotificationReceived", null);
    __decorate([
        plugin_1.Cordova({
            observable: true
        })
    ], OneSignal, "handleNotificationOpened", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "iOSSettings", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "endInit", null);
    __decorate([
        plugin_1.Cordova()
    ], OneSignal, "getTags", null);
    __decorate([
        plugin_1.Cordova()
    ], OneSignal, "getIds", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "sendTag", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "sendTags", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "deleteTag", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "deleteTags", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "registerForPushNotifications", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "enableVibrate", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "enableSound", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "inFocusDisplaying", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "setSubscription", null);
    __decorate([
        plugin_1.Cordova()
    ], OneSignal, "postNotification", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "promptLocation", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "syncHashedEmail", null);
    __decorate([
        plugin_1.Cordova({ sync: true })
    ], OneSignal, "setLogLevel", null);
    OneSignal = __decorate([
        plugin_1.Plugin({
            pluginName: 'OneSignal',
            plugin: 'onesignal-cordova-plugin',
            pluginRef: 'plugins.OneSignal',
            repo: 'https://github.com/OneSignal/OneSignal-Cordova-SDK',
            platforms: ['Android', 'iOS', 'Windows', 'FireOS']
        })
    ], OneSignal);
    return OneSignal;
}());
exports.OneSignal = OneSignal;
//# sourceMappingURL=onesignal.js.map