"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name LaunchReview
 * @description
 *
 * This launches the native store app in order for the user to leave a review.
 * On Android, the plugin opens the the app's storepage in the Play Store where the user can leave a review by pressing the stars to give a rating.
 * On iOS, the plugin opens the app's storepage in the App Store and focuses the Review tab, where the user can leave a review by pressing "Write a review".
 *
 * @usage
 * ```
 * import { LaunchReview } from 'ionic-native';
 *
 * const appId: string = 'yourAppId';
 * LaunchReview.launch(appId)
 *   .then(() => console.log('Successfully launched store app');
 * ```
 */
var LaunchReview = (function () {
    function LaunchReview() {
    }
    /**
     * Launch store app using given app ID
     * @returns {Promise<void>}
     */
    LaunchReview.launch = function (appId) { return; };
    __decorate([
        plugin_1.Cordova()
    ], LaunchReview, "launch", null);
    LaunchReview = __decorate([
        plugin_1.Plugin({
            pluginName: 'LaunchReview',
            plugin: 'cordova-launch-review',
            pluginRef: 'LaunchReview',
            repo: 'https://github.com/dpa99c/cordova-launch-review',
            platforms: ['Android', 'iOS']
        })
    ], LaunchReview);
    return LaunchReview;
}());
exports.LaunchReview = LaunchReview;
//# sourceMappingURL=launch-review.js.map