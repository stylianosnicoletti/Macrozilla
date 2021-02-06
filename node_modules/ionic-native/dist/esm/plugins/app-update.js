var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
/**
 * @name AppUpdate
 * @description
 * This plugin does self-update for android
 *
 * @usage
 *
 * You should first host an XML file on your server with the following data in it:
 * ```xml
 * <update>
 *     <version>302048</version>
 *     <name>APK Name</name>
 *     <url>https://your-remote-api.com/YourApp.apk</url>
 * </update>
 * ```
 *
 * Then use the following code:
 *
 * ```
 * import { AppUpdate } from 'ionic-native';
 *
 * let updateUrl = 'http://your-remote-api.com/update.xml';
 *
 * AppUpdate.checkAppUpdate(updateUrl);
 * ```
 *
 * The plugin will compare the app version and update it automatically if the API has a newer version to install.
 */
export var AppUpdate = (function () {
    function AppUpdate() {
    }
    /**
     * Check and update
     * @param updateUrl {string} update api url
     * @return {Promise<any>} Returns a promise that resolves when something happens
     */
    AppUpdate.checkAppUpdate = function (updateUrl) { return; };
    __decorate([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], AppUpdate, "checkAppUpdate", null);
    AppUpdate = __decorate([
        Plugin({
            pluginName: 'AppUpdate',
            plugin: 'cordova-plugin-app-update',
            pluginRef: 'AppUpdate',
            repo: 'https://github.com/vaenow/cordova-plugin-app-update',
            platforms: ['Android']
        })
    ], AppUpdate);
    return AppUpdate;
}());
//# sourceMappingURL=app-update.js.map