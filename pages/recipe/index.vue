<template>
    <div>
        <p>
            准备放快过期的食物和每日菜单
        </p>

        <NuxtLink to="/recipe/daily">
            <NButton type="info">每日菜单</NButton>
        </NuxtLink>
        <p>
            <NuxtLink to="/recipe/cook-book">
                <NButton type="info">菜谱</NButton>
            </NuxtLink>
        </p>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped></style>