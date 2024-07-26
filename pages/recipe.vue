<template>
    <div class="flex flex-row w-full h-full">
        <div class="w-[200px] flex-none hidden md:block">
            <RouteMenu :menu="recipeMenu" />
        </div>
        <NuxtPage />
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
import { recipeMenu } from "~/config/menu";
</script>
<style lang="scss" scoped></style>
