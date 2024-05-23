import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware((to, from) => {
    let user = useUserStore(),
        config = useAppConfig(),
        route = useRoute()
    if (!user.token) {
        return navigateTo("/user/login")
        
    }
})