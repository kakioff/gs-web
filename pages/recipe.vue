<template>
    <div class="flex flex-row w-full h-full ">
        <div class="w-[200px] flex-none hidden md:block">
            <RouteMenu :menu="menu" />
        </div>
        <div>
            <NuxtPage />
        </div>
        <!-- <Teleport to="#header-xs-menu">
            <div>
                <hr>
                <h2 class="text-xl font-bold px-3 pt-5 pb-2">菜单</h2>
                <RouteMenu :menu="menu" />
            </div>
        </Teleport> -->
    </div>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui';

const menu: MenuOption[] = [{
    label: '总览',
    key: '/recipe'
}, {
    label: '每日菜单',
    key: '/recipe/daily'
}]
</script>
<style lang="scss" scoped></style>