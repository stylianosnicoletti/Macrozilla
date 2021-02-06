"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @beta
 * @name Pinterest
 * @description
 * Cordova plugin for Pinterest
 *
 * @usage
 * ```
 * import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from 'ionic-native';
 *
 * const scopes = [
 *   Pinterest.SCOPES.READ_PUBLIC,
 *   Pinterest.SCOPES.WRITE_PUBLIC,
 *   Pinterest.SCOPES.READ_RELATIONSHIPS,
 *   Pinterest.SCOPES.WRITE_RELATIONSHIPS
 * ];
 *
 * Pinterest.login(scopes)
 *   .then(res => console.log('Logged in!', res))
 *   .catch(err => console.error('Error loggin in', err));
 *
 * Pinterest.getMyPins()
 *   .then((pins: Array<PinterestPin>) => console.log(pins))
 *   .catch(err => console.error(err));
 *
 * Pinterest.getMe()
 *   .then((user: PinterestUser) => console.log(user));
 *
 * Pinterest.getMyBoards()
 *   .then((boards: Array<PinterestBoard>) => console.log(boards));
 *
 * ```
 * @interfaces
 * PinterestUser
 * PinterestBoard
 * PinterestPin
 */
var Pinterest = (function () {
    function Pinterest() {
    }
    /**
     * Logs the user in using their Pinterest account.
     * @param scopes {Array<string>} Array of scopes that you need access to. You can use Pinterest.SCOPES constant for convenience.
     * @returns {Promise<any>} The response object will contain the user's profile data, as well as the access token (if you need to use it elsewhere, example: send it to your server and perform actions on behalf of the user).
     */
    Pinterest.login = function (scopes) { return; };
    /**
     * Gets the authenticated user's profile
     * @param fields {string} Fields to retrieve, separated by commas. Defaults to all available fields.
     * @returns {Promise<PinterestUser>} Returns a promise that resolves with the user's object
     */
    Pinterest.getMe = function (fields) { return; };
    /**
     *
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestPin>>}
     */
    Pinterest.getMyPins = function (fields, limit) { return; };
    /**
     *
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestBoard>>}
     */
    Pinterest.getMyBoards = function (fields, limit) { return; };
    /**
     * Get the authenticated user's likes.
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestPin>>}
     */
    Pinterest.getMyLikes = function (fields, limit) { return; };
    /**
     * Get the authenticated user's followers.
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestUser>>}
     */
    Pinterest.getMyFollowers = function (fields, limit) { return; };
    /**
     * Get the authenticated user's followed boards.
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestBoard>>}
     */
    Pinterest.getMyFollowedBoards = function (fields, limit) { return; };
    /**
     * Get the authenticated user's followed interests.
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<any>}
     */
    Pinterest.getMyFollowedInterests = function (fields, limit) { return; };
    /**
     * Get a user's profile.
     * @param username
     * @param fields
     * @returns {Promise<PinterestUser>}
     */
    Pinterest.getUser = function (username, fields) { return; };
    /**
     * Get a board's data.
     * @param boardId
     * @param fields
     * @returns {Promise<PinterestBoard>}
     */
    Pinterest.getBoard = function (boardId, fields) { return; };
    /**
     * Get Pins of a specific board.
     * @param boardId {string} The ID of the board
     * @param fields {string} Optional fields separated by comma
     * @param limit {number} Optional limit, defaults to 100, maximum is 100.
     * @returns {Promise<Array<PinterestPin>>}
     */
    Pinterest.getBoardPins = function (boardId, fields, limit) { return; };
    /**
     * Delete a board.
     * @param boardId {string} The ID of the board
     * @returns {Promise<PinterestUser>}
     */
    Pinterest.deleteBoard = function (boardId) { return; };
    /**
     * Create a new board for the authenticated user.
     * @param name {string} Name of the board
     * @param desc {string} Optional description of the board
     * @returns {Promise<PinterestBoard>}
     */
    Pinterest.createBoard = function (name, desc) { return; };
    /**
     * Get a Pin by ID.
     * @param pinId {string} The ID of the Pin
     * @param fields {string} Optional fields separated by comma
     * @returns {Promise<PinterestPin>}
     */
    Pinterest.getPin = function (pinId, fields) { return; };
    /**
     * Deletes a pin
     * @param pinId {string} The ID of the pin
     * @returns {Promise<any>}
     */
    Pinterest.deletePin = function (pinId) { return; };
    /**
     * Creates a Pin
     * @param note {string} Note/Description of the pin
     * @param boardId {string} Board ID to put the Pin under
     * @param imageUrl {string} URL of the image to share
     * @param link {string} Optional link to share
     * @returns {Promise<PinterestPin>}
     */
    Pinterest.createPin = function (note, boardId, imageUrl, link) { return; };
    __decorate([
        plugin_1.CordovaProperty
    ], Pinterest.prototype, "SCOPES", void 0);
    __decorate([
        plugin_1.Cordova()
    ], Pinterest, "login", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMe", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyPins", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyBoards", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyLikes", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyFollowers", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyFollowedBoards", null);
    __decorate([
        plugin_1.Cordova({
            callbackOrder: 'reverse'
        })
    ], Pinterest, "getMyFollowedInterests", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Pinterest, "getUser", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Pinterest, "getBoard", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Pinterest, "getBoardPins", null);
    __decorate([
        plugin_1.Cordova()
    ], Pinterest, "deleteBoard", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], Pinterest, "createBoard", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Pinterest, "getPin", null);
    __decorate([
        plugin_1.Cordova()
    ], Pinterest, "deletePin", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 4,
            errorIndex: 5
        })
    ], Pinterest, "createPin", null);
    Pinterest = __decorate([
        plugin_1.Plugin({
            pluginName: 'Pinterest',
            plugin: 'cordova-plugin-pinterest',
            pluginRef: 'cordova.plugins.Pinterest',
            repo: 'https://github.com/zyramedia/cordova-plugin-pinterest',
            install: 'ionic plugin add cordova-plugin-pinterest --variable APP_ID=YOUR_APP_ID',
            platforms: ['Android', 'iOS']
        })
    ], Pinterest);
    return Pinterest;
}());
exports.Pinterest = Pinterest;
//# sourceMappingURL=pinterest.js.map