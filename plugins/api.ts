
// @ts-ignore
import type { Store } from "@pinia/nuxt/dist/runtime/composables";
import { useUserStore } from "~/store/user";
import type { Router } from "vue-router";
import type { UserInfo } from "~/@types/user";
import type { ApiData } from "~/@types/api";

interface RequestConfig extends RequestInit {
    data?: object,
    api_base?: string,
    params?: string | Record<string, any> | string[][] | URLSearchParams,
    steam?: boolean
    isFile?: boolean
    skipAuth?: boolean
}

class APIS {
    api_base = ""
    user: Store<"user", UserInfo, {}, {}> | null = null
    visitor: any | null = null
    router: Router

    constructor(api_base: string) {
        this.api_base = api_base
        this.user = useUserStore()
        // this.visitor = useVisitorStore()
        this.router = useRouter()
    }
    public createController() {
        return new AbortController()
    }
    public json2query(json: RequestConfig["params"]) {
        if (typeof json == "string")
            return json;
        if (!json) return ""
        const filteredParams = Object.fromEntries(
            Object.entries(json).filter(([_, value]) => value !== undefined)
        );

        return new URLSearchParams(filteredParams).toString();
    }
    public async request_stream(path: string, config?: RequestConfig): Promise<Response> {
        let res = await this.request(path, {
            ...config, steam: true
        })
        return res as Response
    }
    public async get<T>(path: string, config?: RequestConfig): Promise<ApiData<T>> {
        return await this.request<T>(path, {
            method: 'GET',
            ...config
        })
    }
    public async post<T>(path: string, config?: RequestConfig): Promise<ApiData<T>> {
        return await this.request<T>(path, {
            method: 'POST',
            ...config
        })
    }
    public async request<T>(path: string, config?: RequestConfig): Promise<ApiData<T>> {
        let url = (config?.api_base || this.api_base) + path,
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + this.user?.token,
                "visitorId": this.visitor?.id,
                ...config?.headers
            },
            queryString = this.json2query(config?.params || {})

        // let queryString = new URLSearchParams(config?.params).toString();
        if (queryString)
            url += "?" + queryString;

        let response = await fetch(url, {
            method: "post",
            headers: headers,
            ...config,
            body: config?.data && JSON.stringify(config.data)
        });
        // @ts-ignore
        if (config?.steam || config?.isFile) return response
        if (!config?.skipAuth)
            if (response.status == 401) {
                this.user?.$reset()
            }
        if (response.status >= 400)
            throw await response.json()
        let result: ApiData<T> = await response.json();
        if (!result.code) result.code = response.status;
        return result;
    }

}
export default defineNuxtPlugin(() => {
    let config = getConfig()

    let api = new APIS(config.api_base)
    return {
        "provide": {
            "api": api
        }
    }
});