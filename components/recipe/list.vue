<template>
    <div>
        <RecipeItem
            v-for="item in props.data"
            :key="item.id"
            :data="item"
            @click-name="clickItem(item)"
        />
    </div>
</template>
<script setup lang="ts">
import type { Recipe } from "~/@types/recipe";

interface Props {
    data: Recipe[];
}
const props = withDefaults(defineProps<Props>(), {
        data: () => [],
    }),
    emits = defineEmits<{
        clickItem: [recipe: Recipe];
    }>();

function clickItem(re: Recipe) {
    emits("clickItem", re);
}
</script>
