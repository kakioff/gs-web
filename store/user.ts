import { defineStore } from 'pinia'
import { defaultUserInfo, type UserInfo, type SignIn } from '~/@types/user'

export const useUserStore = defineStore('user', {
    state(): UserInfo {
        return {
            ...defaultUserInfo
        }
    },
    actions: {
        async signout() {
            const { $api } = useNuxtApp()
            this.$reset()
            let data = await $api.request("/user/signout", {
                method: "get"
            })
            return data
        },
        async getInfo() {
            const { $api } = useNuxtApp(),
                userToken = this.token
            let data = await $api.request<UserInfo>("/user/info", {
                method: "get"
            })
            data.data && (this.$state = data.data)
            this.token = userToken
            return this.$state
        },
        async login(username: string, password: string) {
            const { $api } = useNuxtApp()
            let res = await $api.post<{
                access_token: string,
                token_type: string
            }>("/user/login", {
                data: {
                    username, password
                }
            })
            this.token = res.data?.access_token
            return this.getInfo()
        },
        async signin(opt: SignIn) {
            const { $api } = useNuxtApp()
            let res = await $api.post("/user/signin", {
                data: {
                    ...opt
                }
            })
            return res
        }
    },
    persist: true,
})
