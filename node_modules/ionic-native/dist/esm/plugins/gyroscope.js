var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
import { Observable } from 'rxjs/Observable';
/**
 * @name Gyroscope
 * @description Read Gyroscope sensor data
 * @usage
 * ```
 * import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from 'ionic-native';
 *
 *
 * let options: GyroscopeOptions = {
 *    frequency: 1000
 * };
 *
 * Gyroscope.getCurrent(options)
 *   .then((orientation: GyroscopeOrientation) => {
 *      console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
 *    })
 *   .catch()
 *
 *
 * Gyroscope.watch()
 *    .subscribe((orientation: GyroscopeOrientation) => {
 *       console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
 *    });
 *
 * ```
 */
export var Gyroscope = (function () {
    function Gyroscope() {
    }
    /**
     * Watching for gyroscope sensor changes
     * @param options {GyroscopeOptions} (optional)
     * @return {Observable<GyroscopeOrientation>} Returns an Observable that resolves GyroscopeOrientation
     */
    Gyroscope.watch = function (options) {
        return new Observable(function (observer) {
            var watchId = navigator.gyroscope.watch(observer.next.bind(observer), observer.next.bind(observer), options);
            return function () { return navigator.gyroscope.clearWatch(watchId); };
        });
    };
    /**
    * Get current data from gyroscope sensor
    * @param options {GyroscopeOptions} (optional)
    * @return {Promise<GyroscopeOrientation>} Returns a promise that resolves GyroscopeOrientation
    */
    Gyroscope.getCurrent = function (options) { return; };
    __decorate([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Gyroscope, "getCurrent", null);
    Gyroscope = __decorate([
        Plugin({
            pluginName: 'Gyroscope',
            plugin: 'cordova-plugin-gyroscope',
            pluginRef: 'navigator.gyroscope',
            repo: 'https://github.com/NeoLSN/cordova-plugin-gyroscope',
            platforms: ['Android', 'iOS']
        })
    ], Gyroscope);
    return Gyroscope;
}());
//# sourceMappingURL=gyroscope.js.map