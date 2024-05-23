<template>
    <div>
        {{ user.username || user.id }}
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/store/user';

const user = useUserStore()
</script>
<style lang="scss" scoped></style>