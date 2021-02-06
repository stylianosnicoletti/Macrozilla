var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Cordova, Plugin } from './plugin';
import { Observable } from 'rxjs/Observable';
/**
 * @name Geofence
 * @description Monitors circular geofences around latitude/longitude coordinates, and sends a notification to the user when the boundary of a geofence is crossed. Notifications can be sent when the user enters and/or exits a geofence.
 * Geofences persist after device reboot. Geofences will be monitored even when the app is not running.
 * @usage
 * ```
 * import { Geofence } from 'ionic-native';
 * import { Platform } from  'ionic-angular'
 * ...
 *
 * constructor(private platform: Platform) {
 *   this.platform.ready().then(() => {
         // initialize the plugin
 *       Geofence.initialize().then(
 *         // resolved promise does not return a value
 *         () => console.log('Geofence Plugin Ready'),
 *         (err) => console.log(err)
 *       )
 *   })
 * }
 *
 * private addGeofence() {
 *   //options describing geofence
 *   let fence = {
 *     id: "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb", //any unique ID
 *     latitude:       37.285951, //center of geofence radius
 *     longitude:      -121.936650,
 *     radius:         100, //radius to edge of geofence
 *     transitionType: 3, //see 'Transition Types' below
 *     notification: { //notification settings
 *         id:             1, //any unique ID
 *         title:          "You crossed a fence", //notification title
 *         text:           "You just arrived to Gliwice city center.", //notification body
 *         openAppOnClick: true //open app when notification is tapped
 *     }
 *   }
 *
 *   Geofence.addOrUpdate(fence).then(
 *      () => console.log('Geofence added'),
 *      (err) => console.log('Geofence failed to add')
 *    );
 * }
 *
 * ```
 * ### Transition Types ###
 * Transition type specifies whether the geofence should trigger when the user enters and/or leaves the geofence.
 *
 * #### Supported values ####
 * - 1: Enter
 * - 2: Leave
 * - 3: Both
 *
 * ### Defining a Geofence ###
 * Geofences are defined by an object that is passed to `addOrUpdate()`. Object properties are:
 * - id: Any unique ID for the geofence. This ID is used to remove and update a geofence
 * - latitude: Latitude coordinate of the center of the geofence radius
 * - longitude: Latitude coordinate of the center of the geofence radius
 * - radius: Radius from the center to the edge of the geofence
 * - transitionType: Type of geofence transition to monitor for. See 'Transition Types' above
 * - notification: Object. Options for defining the notification sent when a geofence is crossed
 *   - id: Any unique ID
 *   - title: Notification title
 *   - text: Notification body
 *   - openAppOnClick: Boolean. Whether to open the app when the notification is tapped by the user
 *
 * ### Troubleshooting ###
 * #### I get compile errors when I run `ionic build ios` or `ionic run ios`. ####
 * This could be caused by the Cordova project directory in `/platforms/ios` not being named correctly.
 * Try running `ionic platform rm <platform>` then run `ionic platform add <platform>` to recreate the
 * platform directories.
 */
export var Geofence = (function () {
    function Geofence() {
    }
    /**
     * Initializes the plugin. User will be prompted to allow the app to use location and notifications.
     *
     * @returns {Promise<void>}
     */
    Geofence.initialize = function () { return; };
    ;
    /**
     * Adds a new geofence or array of geofences. For geofence object, see above.
     *
     * @returns {Promise<void>}
     */
    Geofence.addOrUpdate = function (geofences) { return; };
    ;
    /**
     * Removes a geofence or array of geofences. `geofenceID` corresponds to one or more IDs specified when the
     * geofence was created.
     *
     * @returns {Promise<void>}
     */
    Geofence.remove = function (geofenceId) { return; };
    ;
    /**
     * Removes all geofences.
     *
     * @returns {Promise<void>}
     */
    Geofence.removeAll = function () { return; };
    ;
    /**
     * Returns an array of geofences currently being monitored.
     *
     * @returns {Promise<Array<string>>}
     */
    Geofence.getWatched = function () { return; };
    ;
    /**
     * Called when a geofence is crossed in the direction specified by `TransitType`.
     *
     * @returns {Observable<any>}
     */
    Geofence.onTransitionReceived = function () {
        return new Observable(function (observer) {
            window && window.geofence && (window.geofence.onTransitionReceived = observer.next.bind(observer));
            return function () { return window.geofence.onTransitionReceived = function () { }; };
        });
    };
    /**
     * Called when the user clicks a geofence notification. iOS and Android only.
     *
     * @returns {Observable<any>}
     */
    Geofence.onNotificationClicked = function () {
        return new Observable(function (observer) {
            window && window.geofence && (window.geofence.onNotificationClicked = observer.next.bind(observer));
            return function () { return window.geofence.onNotificationClicked = function () { }; };
        });
    };
    Geofence.TransitionType = {
        ENTER: 1,
        EXIT: 2,
        BOTH: 3
    };
    __decorate([
        Cordova()
    ], Geofence, "initialize", null);
    __decorate([
        Cordova()
    ], Geofence, "addOrUpdate", null);
    __decorate([
        Cordova()
    ], Geofence, "remove", null);
    __decorate([
        Cordova()
    ], Geofence, "removeAll", null);
    __decorate([
        Cordova()
    ], Geofence, "getWatched", null);
    Geofence = __decorate([
        Plugin({
            pluginName: 'Geofence',
            plugin: 'cordova-plugin-geofence',
            pluginRef: 'geofence',
            repo: 'https://github.com/cowbell/cordova-plugin-geofence/',
            platforms: ['Android', 'iOS', 'Windows Phone 8', 'Windows Phone']
        })
    ], Geofence);
    return Geofence;
}());
//# sourceMappingURL=geofence.js.map