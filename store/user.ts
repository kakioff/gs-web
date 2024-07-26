import { defineStore } from "pinia";
import type { ApiData } from "~/@types/api";
import {
    defaultUserInfo,
    type UserInfo,
    type SignIn,
    type UpdateInfo,
} from "~/@types/user";

export const useUserStore = defineStore("user", {
    state(): UserInfo {
        return {
            ...defaultUserInfo,
        };
    },
    actions: {
        async signout() {
            const { $api } = useNuxtApp();
            this.$reset();
            let data = await $api.request("/user/signout", {
                method: "get",
            });
            return data;
        },
        async getInfo() {
            const { $api } = useNuxtApp(),
                userToken = this.token;
            let data = await $api.request<UserInfo>("/user/info", {
                method: "get",
            });
            data.data && (this.$state = data.data);
            this.token = userToken;
            return this.$state;
        },
        async login(name: string, passwd: string) {
            const { $api } = useNuxtApp();
            let res = await $api.post<{
                token: string;
                token_type: string;
            }>("/user/login", {
                data: {
                    name,
                    passwd,
                },
            });
            this.token = res.data?.token;
            return this.getInfo();
        },
        async signin(opt: SignIn) {
            const { $api } = useNuxtApp();
            let res = await $api.put("/user/create", {
                data: {
                    ...opt,
                },
            });
            return res;
        },
        async updateInfo(opts: UpdateInfo) {
            const { $api } = useNuxtApp();
            let res = await $api.post<UserInfo>("/user/update", {
                data: {
                    ...opts,
                },
            });
            return res;
        },

        async checkPassword(passwd: string) {
            const { $api } = useNuxtApp();
            let res = await $api.post<string>("/user/check-password", {
                data: {
                    passwd,
                },
                skipAuth: true
            });
            return res;
        },
    },
    persist: true,
});
