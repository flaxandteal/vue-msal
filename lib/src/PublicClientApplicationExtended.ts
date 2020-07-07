import {AuthCache} from "msal/lib-commonjs/cache/AuthCache";
import {UrlUtils} from "msal/lib-commonjs/utils/UrlUtils";
import {Configuration, PublicClientApplication} from "@azure/msal-browser";

export class PublicClientApplicationExtended extends PublicClientApplication {
    public store = {};
    constructor(configuration: Configuration) {
        super(configuration);

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

        const storeAuthStateInCookie = configuration.cache.storeAuthStateInCookie || false;

        this.store = new AuthCache(
            configuration.auth.clientId,
            configuration.cache.cacheLocation,
            storeAuthStateInCookie
        );

    }

    public isCallback(hash: string): boolean {
        return UrlUtils.urlContainsHash(hash);
    }
}
