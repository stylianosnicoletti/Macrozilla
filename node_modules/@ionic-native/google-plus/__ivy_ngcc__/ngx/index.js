import { __extends } from "tslib";
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
import * as ɵngcc0 from '@angular/core';
var GooglePlus = /** @class */ (function (_super) {
    __extends(GooglePlus, _super);
    function GooglePlus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GooglePlus.prototype.login = function (options) { return cordova(this, "login", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    GooglePlus.prototype.trySilentLogin = function (options) { return cordova(this, "trySilentLogin", {}, arguments); };
    GooglePlus.prototype.logout = function () { return cordova(this, "logout", {}, arguments); };
    GooglePlus.prototype.disconnect = function () { return cordova(this, "disconnect", {}, arguments); };
    GooglePlus.prototype.getSigningCertificateFingerprint = function () { return cordova(this, "getSigningCertificateFingerprint", {}, arguments); };
    GooglePlus.pluginName = "GooglePlus";
    GooglePlus.plugin = "cordova-plugin-googleplus";
    GooglePlus.pluginRef = "window.plugins.googleplus";
    GooglePlus.repo = "https://github.com/EddyVerbruggen/cordova-plugin-googleplus";
    GooglePlus.install = "ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid";
    GooglePlus.installVariables = ["REVERSED_CLIENT_ID"];
    GooglePlus.platforms = ["Android", "iOS"];
GooglePlus.ɵfac = function GooglePlus_Factory(t) { return ɵGooglePlus_BaseFactory(t || GooglePlus); };
GooglePlus.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: GooglePlus, factory: function (t) { return GooglePlus.ɵfac(t); } });
var ɵGooglePlus_BaseFactory = /*@__PURE__*/ ɵngcc0.ɵɵgetInheritedFactory(GooglePlus);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GooglePlus, [{
        type: Injectable
    }], null, null); })();
    return GooglePlus;
}(IonicNativePlugin));
export { GooglePlus };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvZ29vZ2xlLXBsdXMvbmd4L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sOEJBQXNDLE1BQU0sb0JBQW9CLENBQUM7O0FBQ3hFO0FBS0EsSUF1QmdDLDhCQUFpQjtBQUFDO0FBRTlCO0FBRW5CO0FBQU0sSUFNTCwwQkFBSyxhQUFDLE9BQVk7QUFLNEIsSUFLOUMsbUNBQWMsYUFBQyxPQUFhO0FBS1QsSUFJbkIsMkJBQU07QUFLaUIsSUFJdkIsK0JBQVU7QUFLaUIsSUFJM0IscURBQWdDO0FBSXNCO0FBQTBDO0FBQXFEO0FBQXdEO0FBQXFGO0FBQWdJO0FBQTBEOzhDQXBEN2QsVUFBVTs7Ozs7MEJBQ0w7QUFBQyxxQkE5QlA7QUFBRSxFQThCOEIsaUJBQWlCO0FBQ2hELFNBRFksVUFBVTtBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbi8qKlxuICogQG5hbWUgR29vZ2xlIFBsdXNcbiAqIEBkZXNjcmlwdGlvblxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBHb29nbGVQbHVzIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9nb29nbGUtcGx1cy9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlUGx1czogR29vZ2xlUGx1cykgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5nb29nbGVQbHVzLmxvZ2luKHt9KVxuICogICAudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSlcbiAqICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICpcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0dvb2dsZVBsdXMnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1nb29nbGVwbHVzJyxcbiAgcGx1Z2luUmVmOiAnd2luZG93LnBsdWdpbnMuZ29vZ2xlcGx1cycsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vRWRkeVZlcmJydWdnZW4vY29yZG92YS1wbHVnaW4tZ29vZ2xlcGx1cycsXG4gIGluc3RhbGw6ICdpb25pYyBjb3Jkb3ZhIHBsdWdpbiBhZGQgY29yZG92YS1wbHVnaW4tZ29vZ2xlcGx1cyAtLXZhcmlhYmxlIFJFVkVSU0VEX0NMSUVOVF9JRD1teXJldmVyc2VkY2xpZW50aWQnLFxuICBpbnN0YWxsVmFyaWFibGVzOiBbJ1JFVkVSU0VEX0NMSUVOVF9JRCddLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlUGx1cyBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIFRoZSBsb2dpbiBmdW5jdGlvbiB3YWxrcyB0aGUgdXNlciB0aHJvdWdoIHRoZSBHb29nbGUgQXV0aCBwcm9jZXNzLlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIHN1Y2Nlc3NJbmRleDogMSxcbiAgICBlcnJvckluZGV4OiAyLFxuICB9KVxuICBsb2dpbihvcHRpb25zOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBZb3UgY2FuIGNhbGwgdHJ5U2lsZW50TG9naW4gdG8gY2hlY2sgaWYgdGhleSdyZSBhbHJlYWR5IHNpZ25lZCBpbiB0byB0aGUgYXBwIGFuZCBzaWduIHRoZW0gaW4gc2lsZW50bHkgaWYgdGhleSBhcmUuXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHRyeVNpbGVudExvZ2luKG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgY2xlYXIgdGhlIE9BdXRoMiB0b2tlbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgbG9nb3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBjbGVhciB0aGUgT0F1dGgyIHRva2VuLCBmb3JnZXQgd2hpY2ggYWNjb3VudCB3YXMgdXNlZCB0byBsb2dpbiwgYW5kIGRpc2Nvbm5lY3QgdGhhdCBhY2NvdW50IGZyb20gdGhlIGFwcC4gVGhpcyB3aWxsIHJlcXVpcmUgdGhlIHVzZXIgdG8gYWxsb3cgdGhlIGFwcCBhY2Nlc3MgYWdhaW4gbmV4dCB0aW1lIHRoZXkgc2lnbiBpbi4gQmUgYXdhcmUgdGhhdCB0aGlzIGVmZmVjdCBpcyBub3QgYWx3YXlzIGluc3RhbnRhbmVvdXMuIEl0IGNhbiB0YWtlIHRpbWUgdG8gY29tcGxldGVseSBkaXNjb25uZWN0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBkaXNjb25uZWN0KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCByZXRyaWV2ZSB0aGUgQW5kcm9pZCBzaWduaW5nIGNlcnRpZmljYXRlIGZpbmdlcnByaW50IHdoaWNoIGlzIHJlcXVpcmVkIGluIHRoZSBHb29nbGUgRGV2ZWxvcGVyIENvbnNvbGUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldFNpZ25pbmdDZXJ0aWZpY2F0ZUZpbmdlcnByaW50KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=