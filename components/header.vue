<template>
    <header class="h-[40px] w-full shadow-sm hover:shadow transition-all px-2">
        <div class="flex items-center justify-between flex-row container mx-auto h-full">
            <NuxtLink to="/">
                <span class=" font-bold select-none text-lg">Goodstuff</span>
            </NuxtLink>
            <div class="hidden md:block">
                <RouteMenu horizontal />
            </div>
            <NuxtLink to="/user" class="hidden md:block">
                <span v-if="user.token">{{ user.username || user.id }}</span>
                <span v-else>登录</span>
            </NuxtLink>

            <div class="block md:hidden">
                <Icon name="material-symbols:menu" class="text-xl cursor-pointer" @click="drawer = !drawer" />
                <div class=" fixed top-0 w-full h-full bg-white z-50 transition-all duration-[300ms]" :class="[drawer?'left-0':'left-full']" placement="right" default-width="100%">
                    <div class="flex justify-end items-center p-2 pt-3 text-2xl">
                        <Icon name="material-symbols:close" class=" cursor-pointer" @click="drawer = false" />
                    </div>
                    <RouteMenu @route-change="drawer = false" />
                    
                    <div id="header-xs-menu">

                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { useUserStore } from '~/store/user';

const user = useUserStore()

const drawer = ref(false)
</script>