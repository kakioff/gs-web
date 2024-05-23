<template>
    <div>
        <n-descriptions bordered label-placement="left" :columns="1">
            <n-descriptions-item v-for="v, k in user.$state" :key="k" :label="k">
                {{ v }}
            </n-descriptions-item>
        </n-descriptions>
        <p class="text-right my-2">
            <NButton type="error" @click="user.signout">Sign out</NButton>
        </p>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/store/user';
definePageMeta({
    middleware: ['auth'],
});
const user = useUserStore()
</script>
<style lang="scss" scoped></style>