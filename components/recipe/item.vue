<template>
    <div class="border dark:border-gray-500 px-3 py-2 rounded">
        <button @click="clickName">
            <h3 class="text-lg font-bold cursor-pointer hover:underline">
                {{ data.name }}
            </h3>
        </button>
        <p>{{ data.desc }}</p>
        <p class="text-xs">
            {{ dayjs(data.created).format("YY-MM-DD") }}
            -
            {{ data.username }}
            -
            {{ data.status }}
            -
            {{ data.group }}
        </p>
    </div>
</template>
<script setup lang="ts">
import type { Recipe } from "~/@types/recipe";
import dayjs from "dayjs";
interface Props {
    data: Recipe;
}
const props = defineProps<Props>(),
    emits = defineEmits(["clickName"]),
    { data } = toRefs(props);
function clickName() {
    emits("clickName");
}
</script>
