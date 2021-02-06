"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name PhotoLibrary
 * @description
 * The PhotoLibrary plugin allows access to photos from device by url. So you can use plain img tag to display photos and their thumbnails, and different 3rd party libraries as well.
 * Saving photos and videos to the library is also supported.
 * cdvphotolibrary urls should be trusted by Angular. See plugin homepage to learn how.
 *
 * @usage
 * ```
 * import { PhotoLibrary } from 'ionic-native';
 *
 * PhotoLibrary.requestAuthorization().then(() => {
 *   PhotoLibrary.getLibrary().subscribe({
 *     next: library => {
 *       library.forEach(function(libraryItem) {
 *         console.log(libraryItem.id);          // ID of the photo
 *         console.log(libraryItem.photoURL);    // Cross-platform access to photo
 *         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
 *         console.log(libraryItem.fileName);
 *         console.log(libraryItem.width);
 *         console.log(libraryItem.height);
 *         console.log(libraryItem.creationDate);
 *         console.log(libraryItem.latitude);
 *         console.log(libraryItem.longitude);
 *         console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
 *       });
 *     },
 *     error: err => {},
 *     complete: () => { console.log("could not get photos"); }
 *   });
 * })
 * .catch(err => console.log("permissions weren't granted"));
 *
 * ```
 */
var PhotoLibrary = (function () {
    function PhotoLibrary() {
    }
    /**
     * Retrieves library items. Library item contains photo metadata like width and height, as well as photoURL and thumbnailURL.
     * @param options {GetLibraryOptions} Optional, like thumbnail size and chunks settings.
     * @return {Observable<LibraryItem[]>} Returns library items. If appropriate option was set, will be returned by chunks.
     */
    PhotoLibrary.getLibrary = function (options) { return; };
    /**
     * Asks user permission to access photo library.
     * @param options {RequestAuthorizationOptions} Optional, like whether only read access needed or read/write.
     * @return { Promise<void>} Returns a promise that resolves when permissions are granted, and fails when not.
     */
    PhotoLibrary.requestAuthorization = function (options) { return; };
    /**
     * Returns list of photo albums on device.
     * @return {Promise<AlbumItem[]>} Resolves to list of albums.
     */
    PhotoLibrary.getAlbums = function () { return; };
    /**
     * Provides means to request URL of thumbnail, with specified size or quality.
     * @param photo {string | LibraryItem} Id of photo, or LibraryItem.
     * @param options {GetThumbnailOptions} Options, like thumbnail size or quality.
     * @return {Promise<string>} Resolves to URL of cdvphotolibrary schema.
     */
    PhotoLibrary.getThumbnailURL = function (photo, options) { return; };
    /**
     * Provides means to request photo URL by id.
     * @param photo {string | LibraryItem} Id or LibraryItem.
     * @param options {GetPhotoOptions} Optional options.
     * @return {Promise<string>} Resolves to URL of cdvphotolibrary schema.
     */
    PhotoLibrary.getPhotoURL = function (photo, options) { return; };
    /**
     * Returns thumbnail as Blob.
     * @param photo {string | LibraryItem} Id or LibraryItem.
     * @param options {GetThumbnailOptions} Options, like thumbnail size or quality.
     * @return {Promise<Blob>} Resolves requested thumbnail as blob.
     */
    PhotoLibrary.getThumbnail = function (photo, options) { return; };
    /**
     * Returns photo as Blob.
     * @param photo {string | LibraryItem} Id or LibraryItem.
     * @param options {GetPhotoOptions} Optional options.
     * @return {Promise<Blob>} Resolves requested photo as blob.
     */
    PhotoLibrary.getPhoto = function (photo, options) { return; };
    /**
     * Saves image to specified album. Album will be created if not exists.
     * LibraryItem that represents saved image is returned.
     * @param url {string} URL of a file, or DataURL.
     * @param album {AlbumItem | string} Name of an album or AlbumItem object.
     * @param options {GetThumbnailOptions} Options, like thumbnail size for resulting LibraryItem.
     * @return {Promise<LibraryItem>} Resolves to LibraryItem that represents saved image.
     */
    PhotoLibrary.saveImage = function (url, album, options) { return; };
    /**
     * Saves video to specified album. Album will be created if not exists.
     * @param url {string} URL of a file, or DataURL.
     * @param album {AlbumItem | string} Name of an album or AlbumItem object.
     * @return {Promise<void>} Resolves when save operation completes.
     */
    PhotoLibrary.saveVideo = function (url, album) { return; };
    __decorate([
        plugin_1.CordovaFiniteObservable({
            callbackOrder: 'reverse',
            resultFinalPredicate: function (result) { return result.isLastChunk; },
            resultTransform: function (result) { return result.library; },
        })
    ], PhotoLibrary, "getLibrary", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse',
        })
    ], PhotoLibrary, "requestAuthorization", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse',
        })
    ], PhotoLibrary, "getAlbums", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], PhotoLibrary, "getThumbnailURL", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], PhotoLibrary, "getPhotoURL", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], PhotoLibrary, "getThumbnail", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], PhotoLibrary, "getPhoto", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], PhotoLibrary, "saveImage", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], PhotoLibrary, "saveVideo", null);
    PhotoLibrary = __decorate([
        plugin_1.Plugin({
            pluginName: 'PhotoLibrary',
            plugin: 'cordova-plugin-photo-library',
            pluginRef: 'cordova.plugins.photoLibrary',
            repo: 'https://github.com/terikon/cordova-plugin-photo-library',
            install: 'ionic plugin add cordova-plugin-photo-library --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="To choose photos"'
        })
    ], PhotoLibrary);
    return PhotoLibrary;
}());
exports.PhotoLibrary = PhotoLibrary;
//# sourceMappingURL=photo-library.js.map