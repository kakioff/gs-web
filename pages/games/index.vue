<template lang="pug">
div
    h2.font-bold.text-3xl.mb-3 游戏
    NuxtLink(v-for="item in gameMenu" :key="item.key" :to="item.key" class="underline") {{ item.label }}

</template>
<script setup lang="ts">
import { gameMenu } from "~/config/menu";
</script>
