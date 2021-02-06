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
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var NativeStorageOriginal = /** @class */ (function (_super) {
    __extends(NativeStorageOriginal, _super);
    function NativeStorageOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeStorageOriginal.prototype.initWithSuiteName = function (reference) { return cordova(this, "initWithSuiteName", { "platforms": ["iOS"] }, arguments); };
    NativeStorageOriginal.prototype.setItem = function (reference, value) { return cordova(this, "setItem", {}, arguments); };
    NativeStorageOriginal.prototype.getItem = function (reference) { return cordova(this, "getItem", {}, arguments); };
    NativeStorageOriginal.prototype.keys = function () { return cordova(this, "keys", {}, arguments); };
    NativeStorageOriginal.prototype.remove = function (reference) { return cordova(this, "remove", {}, arguments); };
    NativeStorageOriginal.prototype.clear = function () { return cordova(this, "clear", {}, arguments); };
    NativeStorageOriginal.pluginName = "NativeStorage";
    NativeStorageOriginal.plugin = "cordova-plugin-nativestorage";
    NativeStorageOriginal.pluginRef = "NativeStorage";
    NativeStorageOriginal.repo = "https://github.com/TheCocoaProject/cordova-plugin-nativestorage";
    NativeStorageOriginal.platforms = ["Android", "Browser", "iOS", "macOS", "Windows"];
    return NativeStorageOriginal;
}(IonicNativePlugin));
var NativeStorage = new NativeStorageOriginal();
export { NativeStorage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL25hdGl2ZS1zdG9yYWdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQW9DckMsaUNBQWlCOzs7O0lBU2xELHlDQUFpQixhQUFDLFNBQWlCO0lBV25DLCtCQUFPLGFBQUMsU0FBaUIsRUFBRSxLQUFVO0lBVXJDLCtCQUFPLGFBQUMsU0FBaUI7SUFTekIsNEJBQUk7SUFVSiw4QkFBTSxhQUFDLFNBQWlCO0lBU3hCLDZCQUFLOzs7Ozs7d0JBL0ZQO0VBcUNtQyxpQkFBaUI7U0FBdkMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIEBuYW1lIE5hdGl2ZSBTdG9yYWdlXG4gKiBAcHJlbWllciBuYXRpdmVzdG9yYWdlXG4gKiBAZGVzY3JpcHRpb24gTmF0aXZlIHN0b3JhZ2Ugb2YgdmFyaWFibGVzIGluIEFuZHJvaWQgYW5kIGlPU1xuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTmF0aXZlU3RvcmFnZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbmF0aXZlLXN0b3JhZ2Uvbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdGl2ZVN0b3JhZ2U6IE5hdGl2ZVN0b3JhZ2UpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIHRoaXMubmF0aXZlU3RvcmFnZS5zZXRJdGVtKCdteWl0ZW0nLCB7cHJvcGVydHk6ICd2YWx1ZScsIGFub3RoZXJQcm9wZXJ0eTogJ2Fub3RoZXJWYWx1ZSd9KVxuICogICAudGhlbihcbiAqICAgICAoKSA9PiBjb25zb2xlLmxvZygnU3RvcmVkIGl0ZW0hJyksXG4gKiAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3Igc3RvcmluZyBpdGVtJywgZXJyb3IpXG4gKiAgICk7XG4gKlxuICogdGhpcy5uYXRpdmVTdG9yYWdlLmdldEl0ZW0oJ215aXRlbScpXG4gKiAgIC50aGVuKFxuICogICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gKiAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcilcbiAqICAgKTtcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ05hdGl2ZVN0b3JhZ2UnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1uYXRpdmVzdG9yYWdlJyxcbiAgcGx1Z2luUmVmOiAnTmF0aXZlU3RvcmFnZScsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vVGhlQ29jb2FQcm9qZWN0L2NvcmRvdmEtcGx1Z2luLW5hdGl2ZXN0b3JhZ2UnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdtYWNPUycsICdXaW5kb3dzJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdGl2ZVN0b3JhZ2UgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXNlcyBzaGFyZWQgc3RvcmFnZSB3aXRoIHRoZSBzdWl0ZSBuYW1lIHdoZW4gdXNpbmcgYXBwIGdyb3VwcyBpbiBpT1NcbiAgICogQHBhcmFtIHJlZmVyZW5jZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnaU9TJ10sXG4gIH0pXG4gIGluaXRXaXRoU3VpdGVOYW1lKHJlZmVyZW5jZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBhIHZhbHVlXG4gICAqIEBwYXJhbSByZWZlcmVuY2Uge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHNldEl0ZW0ocmVmZXJlbmNlOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgc3RvcmVkIGl0ZW1cbiAgICogQHBhcmFtIHJlZmVyZW5jZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRJdGVtKHJlZmVyZW5jZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmluZyBhbGwga2V5c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBrZXlzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzaW5nbGUgc3RvcmVkIGl0ZW1cbiAgICogQHBhcmFtIHJlZmVyZW5jZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICByZW1vdmUocmVmZXJlbmNlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBzdG9yZWQgdmFsdWVzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBjbGVhcigpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19