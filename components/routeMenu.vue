<template>
    <div>
        <NMenu class="select-none" :value="route.path" @update:value="menuClick" :options="menu"
            :mode="props.horizontal ? 'horizontal' : 'vertical'" />

    </div>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui';

interface Props {
    horizontal?: boolean
    menu?: MenuOption[]
}
const props = withDefaults(defineProps<Props>(), {
}),
    menu = computed(() => {
        if (props.menu) return props.menu
        let lst: MenuOption[] = [{
            label: "主页",
            key: "/"
        }, {
            label: "菜单",
            key: "/recipe",
            children: [{
                label: '总览',
                key: '/recipe'
            }, {
                label: '每日菜单',
                key: '/recipe/daily'
            }]
        }, {
            label: "关于",
            key: "/about"
        }]
        if (size.width.value > 768) {
            lst = [{
                label: "主页",
                key: "/"
            }, {
                label: "菜单",
                key: "/recipe"
            }, {
                label: "关于",
                key: "/about"
            }]
        }
        return lst
    }),
    size = useWindowSize(),
    route = useRoute(),
    router = useRouter(),
    emits = defineEmits(['routeChange']),
    menuClick = (path: string) => {
        router.push(path)
        emits('routeChange', path)
    }

</script>
<style lang="scss" scoped></style>