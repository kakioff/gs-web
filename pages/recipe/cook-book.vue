<template>
    <div>
        <h1 class="text-3xl font-bold mb-4">菜谱</h1>
        
        <div>
            <p v-for="item, index in recipeList" :key="index">{{ item.name }}</p>
        </div>
        {{ recipeList }}
    </div>
</template>
<script setup lang="ts">
import type { Recipe } from '~/@types/recipe';

const { $api } = useNuxtApp()

const recipeList = ref<Recipe[]>([])
function getRecipeList() {
    $api.get<Recipe[]>("/recipe/all").then((res) => {
        if (res.data)
            recipeList.value = res.data
    })
}
onNuxtReady(() => {
    getRecipeList()
})
</script>
<style lang="scss" scoped></style>