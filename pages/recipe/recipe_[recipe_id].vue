<template>
    <div class="w-full">
        <h2 class="text-2xl font-bold w-full border-b">{{ data?.name }}</h2>
        <p class="mb-6 text-xs text-right">{{ data?.created }}</p>
        <p>
            {{ data?.desc }}
        </p>
        <div v-if="data?.ingredients" class="mt-10">
            <UDivider label="原材料" class="mb-5" />
            <p
                v-for="item in data.ingredients"
                :key="item.id"
                class="py-1 px-2 rounded shadow dark:shadow-gray-700 my-2 cursor-pointer"
            >
                <span
                    @click="item.done = !item.done"
                    class="transition-all duration-500 bg-gradient-to-r from-white to-white bg-no-repeat"
                    :style="{
                        backgroundPosition: 'left center',
                        backgroundSize: `${item.done ? 100 : 0}% 1px`,
                    }"
                >
                    {{ item.name }}{{ item.quantity }}{{ item.unit }}
                </span>
                <span v-if="!item.done" class="block mt-1">
                    {{ item.desc }}
                </span>
            </p>
        </div>
        <div v-if="data?.steps" class="mt-10">
            <UDivider label="步骤" class="mb-5" />
            <div
                v-for="(item, i) in data.steps"
                :key="item.id"
                class="relative px-10"
            >
                <span
                    class="absolute left-0 text-xl leading-6 text-center w-7 h-7 bg-primary-700 rounded-full"
                >
                    {{ i + 1 }}
                </span>
                <h3 class="font-bold mb-2">{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { RecipeDetail } from "~/@types/recipe";

const { $api } = useNuxtApp(),
    toast = useToast(),
    route = useRoute(),
    recipe_id = route.params.recipe_id;
const data = ref<RecipeDetail>();
async function getDetail() {
    let res = await $api
        .get<RecipeDetail>("/recipe/item", {
            params: {
                recipe_id,
            },
        })
        .catch((err) => {
            toast.add({
                title: err.detail || "获取失败",
            });
            throw err.detail || "获取失败";
        });
    data.value = res.data;
    document.title = data.value?.name || "菜谱";
}
onNuxtReady(async () => {
    await getDetail();
});
</script>
