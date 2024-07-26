<template>
    <div>
        <h1 class="text-3xl font-bold mb-4">菜谱</h1>

        <RecipeList :data="recipeLst" @click-item="openRecipe" />
    </div>
</template>
<script setup lang="ts">
import type { Recipe } from "~/@types/recipe";

const { $api } = useNuxtApp();

const recipeLst = ref<Recipe[]>([]);
function getRecipeList() {
    $api.get<Recipe[]>("/recipe/list").then((res) => {
        if (res.data) recipeLst.value = res.data;
    });
}

function openRecipe(recipe: Recipe) {
    window.open(`/recipe/recipe_${recipe.id}`, "_blank");
}
onNuxtReady(() => {
    getRecipeList();
});
</script>
<style lang="scss" scoped></style>
