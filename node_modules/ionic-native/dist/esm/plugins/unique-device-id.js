var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
/**
 * @name UniqueDeviceID
 * @description
 * This plugin produces a unique, cross-install, app-specific device id.
 *
 * @usage
 * ```
 * import { UniqueDeviceID } from 'ionic-native';
 *
 * UniqueDeviceID.get()
 *   .then((uuid: any) => console.log(uuid))
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
export var UniqueDeviceID = (function () {
    function UniqueDeviceID() {
    }
    /**
     * Gets a unique, cross-install, app-specific device id.
     * @return {Promise<string>} Returns a promise that resolves when something happens
     */
    UniqueDeviceID.get = function () { return; };
    __decorate([
        Cordova()
    ], UniqueDeviceID, "get", null);
    UniqueDeviceID = __decorate([
        Plugin({
            pluginName: 'UniqueDeviceID',
            plugin: 'cordova-plugin-uniquedeviceid',
            pluginRef: 'window.plugins.uniqueDeviceID',
            repo: 'https://github.com/Paldom/UniqueDeviceID'
        })
    ], UniqueDeviceID);
    return UniqueDeviceID;
}());
//# sourceMappingURL=unique-device-id.js.map