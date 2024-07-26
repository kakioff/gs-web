<template>
  <header class="h-[40px] w-full shadow-sm hover:shadow transition-all px-2">
    <div
      class="flex items-center justify-between flex-row container mx-auto h-full"
    >
      <NuxtLink to="/">
        <span class="font-bold select-none text-lg">Goodstuff</span>
      </NuxtLink>
      <div class="hidden md:block">
        <RouteMenu horizontal />
      </div>
      <div class="grid grid-cols-2">
        <button @click="toggleDarkMode()" class="cursor-pointer">
          <span v-if="!colorMode.unknown">
            <Icon
              name="tabler:device-desktop-cog"
              v-show="colorMode.preference == 'system'"
            />
            <Icon
              name="tabler:sun-high"
              v-show="colorMode.preference == 'dark'"
            />
            <Icon
              name="tabler:moon-stars"
              v-show="colorMode.preference == 'light'"
            />
          </span>
        </button>
        <NuxtLink to="/user" class="hidden md:block">
          <span v-if="user.token">{{ user.name || user.id }}</span>
          <span v-else>登录</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from "~/store/user";

const user = useUserStore(),
  colorMode = useColorMode()

/**
 * 切换系统、黑暗、亮色
 */
function toggleDarkMode() {
  if (colorMode.preference == "light") colorMode.preference = "system";
  else if (colorMode.preference == "system") colorMode.preference = "dark";
  else colorMode.preference = "light";
}

const drawer = ref(false);
</script>
