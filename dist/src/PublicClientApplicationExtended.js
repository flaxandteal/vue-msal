"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicClientApplicationExtended = void 0;
var AuthCache_1 = require("msal/lib-commonjs/cache/AuthCache");
var UrlUtils_1 = require("msal/lib-commonjs/utils/UrlUtils");
var msal_browser_1 = require("@azure/msal-browser");
var PublicClientApplicationExtended = /** @class */ (function (_super) {
    __extends(PublicClientApplicationExtended, _super);
    function PublicClientApplicationExtended(configuration) {
        var _this = _super.call(this, configuration) || this;
        _this.store = {};
        if (typeof configuration.auth === "undefined") {
            throw new Error('auth options must be passed');
        }
        if (typeof configuration.cache === "undefined") {
            throw new Error('cache options must be passed');
        }
        if (configuration.cache.cacheLocation !== "localStorage" &&
            configuration.cache.cacheLocation !== "sessionStorage") {
            throw new Error('invalid cache location');
        }
        var storeAuthStateInCookie = configuration.cache.storeAuthStateInCookie || false;
        _this.store = new AuthCache_1.AuthCache(configuration.auth.clientId, configuration.cache.cacheLocation, storeAuthStateInCookie);
        return _this;
    }
    PublicClientApplicationExtended.prototype.isCallback = function (hash) {
        return UrlUtils_1.UrlUtils.urlContainsHash(hash);
    };
    return PublicClientApplicationExtended;
}(msal_browser_1.PublicClientApplication));
exports.PublicClientApplicationExtended = PublicClientApplicationExtended;
//# sourceMappingURL=PublicClientApplicationExtended.js.map