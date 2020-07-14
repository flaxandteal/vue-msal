'use strict';
import { Options, MSALBasic } from './src/types';
import { MSAL } from './src/main';
import { mixin } from "./mixin";
export const msalMixin = mixin;

export default class msalPlugin {
    _msal?: MSAL;
    static async install(Vue: any, options: Options): Promise<any> {
        const plugin = new msalPlugin(options, Vue);
        Vue.prototype.$msal = plugin;
    }
    constructor(options: Options, Vue: any = undefined) {
        const msal = new MSAL(options);
        if (Vue && options.framework && options.framework.globalMixin) {
            Vue.mixin(mixin);
        }
        const exposed: MSALBasic = {
            data: msal.data,
            _msal: msal,
            signIn() { msal.signIn(); },
            async signOut() { await msal.signOut(); },
            isAuthenticated() { return msal.isAuthenticated(); },
            async acquireToken(request, retries = 0) { return await msal.acquireToken(request, retries); },
            async msGraph(endpoints, batchUrl) { return await msal.msGraph(endpoints, batchUrl) },
            saveCustomData(key: string, data: any) { msal.saveCustomData(key, data); }
        };
        return exposed;
    }
}
