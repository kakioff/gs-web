<template>
    <UContainer class="default-layout">
        <Header class="flex-none" />
        <main
            :class="[
                !route.meta.autoHeight && 'h-full',
                !route.meta.fullSize && 'p-5',
            ]"
        >
            <NuxtPage :class="[!route.meta.autoHeight && 'h-full']" />
        </main>

        <UNotifications />
    </UContainer>
</template>
<script setup lang="ts">
const route = useRoute();
</script>
<style lang="scss">
html,
body,
#__nuxt,
.default-layout {
    height: 100%;
}

.default-layout {
    @apply flex flex-col;
}
</style>
