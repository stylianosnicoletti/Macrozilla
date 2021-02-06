var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordovaPropertyGet, cordovaPropertySet, cordova } from '@ionic-native/core';
import { Observable } from 'rxjs';
var ScreenOrientationOriginal = /** @class */ (function (_super) {
    __extends(ScreenOrientationOriginal, _super);
    function ScreenOrientationOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Convenience enum for possible orientations
         */
        _this.ORIENTATIONS = {
            PORTRAIT_PRIMARY: 'portrait-primary',
            PORTRAIT_SECONDARY: 'portrait-secondary',
            LANDSCAPE_PRIMARY: 'landscape-primary',
            LANDSCAPE_SECONDARY: 'landscape-secondary',
            PORTRAIT: 'portrait',
            LANDSCAPE: 'landscape',
            ANY: 'any',
        };
        return _this;
    }
    ScreenOrientationOriginal.prototype.onChange = function () { return cordova(this, "onChange", { "eventObservable": true, "event": "orientationchange", "element": "window" }, arguments); };
    ScreenOrientationOriginal.prototype.lock = function (orientation) { return cordova(this, "lock", { "otherPromise": true }, arguments); };
    ScreenOrientationOriginal.prototype.unlock = function () { return cordova(this, "unlock", { "sync": true }, arguments); };
    Object.defineProperty(ScreenOrientationOriginal.prototype, "type", {
        get: function () { return cordovaPropertyGet(this, "type"); },
        set: function (value) { cordovaPropertySet(this, "type", value); },
        enumerable: false,
        configurable: true
    });
    ScreenOrientationOriginal.pluginName = "ScreenOrientation";
    ScreenOrientationOriginal.plugin = "cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.pluginRef = "screen.orientation";
    ScreenOrientationOriginal.repo = "https://github.com/apache/cordova-plugin-screen-orientation";
    ScreenOrientationOriginal.platforms = ["Android", "iOS", "Windows"];
    return ScreenOrientationOriginal;
}(IonicNativePlugin));
var ScreenOrientation = new ScreenOrientationOriginal();
export { ScreenOrientation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3NjcmVlbi1vcmllbnRhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxzRUFBdUQsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQTJESyxxQ0FBaUI7OztRQUN0RDs7V0FFRztRQUNILGtCQUFZLEdBQUc7WUFDYixnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsa0JBQWtCLEVBQUUsb0JBQW9CO1lBQ3hDLGlCQUFpQixFQUFFLG1CQUFtQjtZQUN0QyxtQkFBbUIsRUFBRSxxQkFBcUI7WUFDMUMsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsR0FBRyxFQUFFLEtBQUs7U0FDWCxDQUFDOzs7SUFVRixvQ0FBUTtJQVdSLGdDQUFJLGFBQUMsV0FBbUI7SUFReEIsa0NBQU07MEJBTU4sbUNBQUk7Ozs7Ozs7Ozs7OzRCQTVHTjtFQTZEdUMsaUJBQWlCO1NBQTNDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIENvcmRvdmFQcm9wZXJ0eSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQG5hbWUgU2NyZWVuIE9yaWVudGF0aW9uXG4gKiBAcHJlbWllciBzY3JlZW4tb3JpZW50YXRpb25cbiAqIEBkZXNjcmlwdGlvblxuICogQ29yZG92YSBwbHVnaW4gdG8gc2V0L2xvY2sgdGhlIHNjcmVlbiBvcmllbnRhdGlvbiBpbiBhIGNvbW1vbiB3YXkuXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGBjb3Jkb3ZhLXBsdWdpbi1zY3JlZW4tb3JpZW50YXRpb25gLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlIHRoZSBbU2NyZWVuIE9yaWVudGF0aW9uIHBsdWdpbiBkb2NzXShodHRwczovL2dpdGh1Yi5jb20vYXBhY2hlL2NvcmRvdmEtcGx1Z2luLXNjcmVlbi1vcmllbnRhdGlvbikuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBTY3JlZW5PcmllbnRhdGlvbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvc2NyZWVuLW9yaWVudGF0aW9uL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBzY3JlZW5PcmllbnRhdGlvbjogU2NyZWVuT3JpZW50YXRpb24pIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiAvLyBnZXQgY3VycmVudFxuICogY29uc29sZS5sb2codGhpcy5zY3JlZW5PcmllbnRhdGlvbi50eXBlKTsgLy8gbG9ncyB0aGUgY3VycmVudCBvcmllbnRhdGlvbiwgZXhhbXBsZTogJ2xhbmRzY2FwZSdcbiAqXG4gKiAvLyBzZXQgdG8gbGFuZHNjYXBlXG4gKiB0aGlzLnNjcmVlbk9yaWVudGF0aW9uLmxvY2sodGhpcy5zY3JlZW5PcmllbnRhdGlvbi5PUklFTlRBVElPTlMuTEFORFNDQVBFKTtcbiAqXG4gKiAvLyBhbGxvdyB1c2VyIHJvdGF0ZVxuICogdGhpcy5zY3JlZW5PcmllbnRhdGlvbi51bmxvY2soKTtcbiAqXG4gKiAvLyBkZXRlY3Qgb3JpZW50YXRpb24gY2hhbmdlc1xuICogdGhpcy5zY3JlZW5PcmllbnRhdGlvbi5vbkNoYW5nZSgpLnN1YnNjcmliZShcbiAqICAgICgpID0+IHtcbiAqICAgICAgICBjb25zb2xlLmxvZyhcIk9yaWVudGF0aW9uIENoYW5nZWRcIik7XG4gKiAgICB9XG4gKiApO1xuICpcbiAqIGBgYFxuICpcbiAqIEBhZHZhbmNlZFxuICpcbiAqIEFjY2VwdGVkIG9yaWVudGF0aW9uIHZhbHVlczpcbiAqXG4gKiB8IFZhbHVlICAgICAgICAgICAgICAgICAgICAgICAgIHwgRGVzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IHBvcnRyYWl0LXByaW1hcnkgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBwcmltYXJ5IHBvcnRyYWl0IG1vZGUuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHBvcnRyYWl0LXNlY29uZGFyeSAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBzZWNvbmRhcnkgcG9ydHJhaXQgbW9kZS4gICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGxhbmRzY2FwZS1wcmltYXJ5ICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBwcmltYXJ5IGxhbmRzY2FwZSBtb2RlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGxhbmRzY2FwZS1zZWNvbmRhcnkgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGluIHRoZSBzZWNvbmRhcnkgbGFuZHNjYXBlIG1vZGUuICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IHBvcnRyYWl0ICAgICAgICAgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGVpdGhlciBwb3J0cmFpdC1wcmltYXJ5IG9yIHBvcnRyYWl0LXNlY29uZGFyeSAoc2Vuc29yKS4gICB8XG4gKiB8IGxhbmRzY2FwZSAgICAgICAgICAgICAgICAgICAgIHwgVGhlIG9yaWVudGF0aW9uIGlzIGVpdGhlciBsYW5kc2NhcGUtcHJpbWFyeSBvciBsYW5kc2NhcGUtc2Vjb25kYXJ5IChzZW5zb3IpLiB8XG4gKlxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1NjcmVlbk9yaWVudGF0aW9uJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tc2NyZWVuLW9yaWVudGF0aW9uJyxcbiAgcGx1Z2luUmVmOiAnc2NyZWVuLm9yaWVudGF0aW9uJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcGFjaGUvY29yZG92YS1wbHVnaW4tc2NyZWVuLW9yaWVudGF0aW9uJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJywgJ1dpbmRvd3MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyZWVuT3JpZW50YXRpb24gZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBlbnVtIGZvciBwb3NzaWJsZSBvcmllbnRhdGlvbnNcbiAgICovXG4gIE9SSUVOVEFUSU9OUyA9IHtcbiAgICBQT1JUUkFJVF9QUklNQVJZOiAncG9ydHJhaXQtcHJpbWFyeScsXG4gICAgUE9SVFJBSVRfU0VDT05EQVJZOiAncG9ydHJhaXQtc2Vjb25kYXJ5JyxcbiAgICBMQU5EU0NBUEVfUFJJTUFSWTogJ2xhbmRzY2FwZS1wcmltYXJ5JyxcbiAgICBMQU5EU0NBUEVfU0VDT05EQVJZOiAnbGFuZHNjYXBlLXNlY29uZGFyeScsXG4gICAgUE9SVFJBSVQ6ICdwb3J0cmFpdCcsXG4gICAgTEFORFNDQVBFOiAnbGFuZHNjYXBlJyxcbiAgICBBTlk6ICdhbnknLFxuICB9O1xuICAvKipcbiAgICogTGlzdGVuIHRvIG9yaWVudGF0aW9uIGNoYW5nZSBldmVudFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHZvaWQ+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIGV2ZW50T2JzZXJ2YWJsZTogdHJ1ZSxcbiAgICBldmVudDogJ29yaWVudGF0aW9uY2hhbmdlJyxcbiAgICBlbGVtZW50OiAnd2luZG93JyxcbiAgfSlcbiAgb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2sgdGhlIG9yaWVudGF0aW9uIHRvIHRoZSBwYXNzZWQgdmFsdWUuXG4gICAqIFNlZSBiZWxvdyBmb3IgYWNjZXB0ZWQgdmFsdWVzXG4gICAqIEBwYXJhbSBvcmllbnRhdGlvbiB7c3RyaW5nfSBUaGUgb3JpZW50YXRpb24gd2hpY2ggc2hvdWxkIGJlIGxvY2tlZC4gQWNjZXB0ZWQgdmFsdWVzIHNlZSB0YWJsZSBhYm92ZS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoeyBvdGhlclByb21pc2U6IHRydWUgfSlcbiAgbG9jayhvcmllbnRhdGlvbjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogVW5sb2NrIGFuZCBhbGxvdyBhbGwgb3JpZW50YXRpb25zLlxuICAgKi9cbiAgQENvcmRvdmEoeyBzeW5jOiB0cnVlIH0pXG4gIHVubG9jaygpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBvcmllbnRhdGlvbiBvZiB0aGUgZGV2aWNlLlxuICAgKi9cbiAgQENvcmRvdmFQcm9wZXJ0eSgpXG4gIHR5cGU6IHN0cmluZztcbn1cbiJdfQ==