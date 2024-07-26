<template>
    <div class="flex flex-row gap-5">
        <UButtonGroup class="items-center">
            <span>难度：</span>
            <USelectMenu
                class="w-20"
                v-model="gradeValue"
                :options="gradeOptions"
                @change="selectChange"
            />
        </UButtonGroup>
        <UCheckbox
            v-model="customGrade.emptyFirst"
            @change="updateConfig()"
            name="emptyFirst"
            label="第一步必空"
            class="select-none"
        />
        <UForm
            v-if="gradeValue.value === 3"
            :state="customGrade"
            @submit="customConfigSubmit"
            class="flex flex-row gap-5 outline outline-1 outline-slate-600 px-3 py-1 rounded"
        >
            <UInput v-model="customGrade.width" type="number" class="w-20">
                <template #leading> 宽: </template>
            </UInput>

            <UInput v-model="customGrade.height" type="number" class="w-20">
                <template #leading> 高: </template>
            </UInput>

            <UInput v-model="customGrade.mineCount" type="number" class="w-20">
                <template #leading> 雷: </template>
            </UInput>
            <UButton type="submit">OK</UButton>
        </UForm>
    </div>
</template>
<script setup lang="ts">
interface Props {
    modelValue: MineSweeperConfig;
}
const props = withDefaults(defineProps<Props>(), {
        modelValue: () => ({
            width: 0,
            height: 0,
            mineCount: 0,
            emptyFirst: true,
        }),
    }),
    emits = defineEmits(["update:modelValue"]);

const gradeOptions = [
        {
            value: 0,
            label: "简单",
        },
        {
            value: 1,
            label: "一般",
        },
        {
            value: 2,
            label: "困难",
        },
        {
            value: 3,
            label: "自定",
        },
    ],
    gradeValue = ref(gradeOptions[1]),
    preGrade = [
        {
            width: 5,
            height: 5,
            mineCount: 10,
        },
        {
            width: 10,
            height: 10,
            mineCount: 20,
        },
        {
            width: 15,
            height: 15,
            mineCount: 40,
        },
    ],
    gradeConfig = computed(() =>
        gradeValue.value.value == 3
            ? customGrade
            : preGrade[gradeValue.value.value]
    ),
    customGrade = reactive<MineSweeperConfig>({
        width: 0,
        height: 0,
        mineCount: 0,
        emptyFirst: true,
    });

const selectChange = (value: any) => {
        if (value.value == 3) return;
        updateConfig(gradeConfig.value);
    },
    customConfigSubmit = () => {
        updateConfig(Object.assign({}, customGrade));
    },
    updateConfig = (config = gradeConfig.value) => {
        console.log(
            Object.assign({}, props.modelValue, config, {
                emptyFirst: customGrade.emptyFirst,
            })
        );

        emits(
            "update:modelValue",
            Object.assign({}, props.modelValue, config, {
                emptyFirst: customGrade.emptyFirst,
            })
        );
    };

onNuxtReady(() => {
    updateConfig();
});
</script>
