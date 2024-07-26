<template>
    <div
        class="flex gap-3"
        :class="[props.horizontal ? 'flex-row' : 'flex-col']"
    >
        <UDropdown
            v-for="item in menu"
            :key="item.key"
            mode="hover"
            :items="item.children ? [item.children] : []"
            :popper="{ placement: 'bottom' }"
        >
            <NuxtLink :to="item.key || '/'">{{ item.label }}</NuxtLink>

            <template #item="{ item: child }">
                <NuxtLink :to="child.key" class="min-w-full text-left px-5">{{ child.label }}</NuxtLink>
            </template>
        </UDropdown>
        <!-- <NMenu class="select-none" :value="route.path" @update:value="menuClick" :options="menu"
            :mode="props.horizontal ? 'horizontal' : 'vertical'" /> -->
    </div>
</template>
<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { mainMenu } from "~/config/menu";

interface Props {
    horizontal?: boolean;
    menu?: MenuOption[];
}
const props = withDefaults(defineProps<Props>(), {}),
    menu = computed(() => {
        if (props.menu) return props.menu;
        return mainMenu
    }),
    size = useWindowSize(),
    route = useRoute(),
    router = useRouter(),
    emits = defineEmits(["routeChange"]),
    menuClick = (path: string) => {
        router.push(path);
        emits("routeChange", path);
    };
</script>
<style lang="scss" scoped></style>
