<template>
    <div class="flex justify-center items-center">
        <UForm
            :state="formVal"
            class="w-full px-5 md:w-[300px] lg:w-[400px] space-y-4"
            @submit="formSubmit"
            :schema="isSignin ? signInSchema : schema"
        >
            <h1 class="text-center text-2xl font-bold py-4">
                {{ isSignin ? "注册" : "登录" }}
            </h1>
            <UFormGroup label="账号" name="username">
                <UInput
                    :disabled="status.disabled"
                    v-model="formVal.username"
                    placeholder="id/用户名/手机/邮箱"
                />
            </UFormGroup>
            <UFormGroup label="密码" name="password">
                <UInput
                    :disabled="status.disabled"
                    type="password"
                    v-model="formVal.password"
                    placeholder="登录密码"
                />
            </UFormGroup>
            <UFormGroup label="确认密码" name="rePassword" v-if="isSignin">
                <UInput
                    type="password"
                    :disabled="!formVal.password || status.disabled"
                    v-model="formVal.rePassword"
                    placeholder="再次输入登录密码"
                />
            </UFormGroup>
            <p class="flex justify-end gap-2 mt-3">
                <NuxtLink :to="isSignin ? '#' : '#signin'" replace>
                    <UButton :disabled="status.disabled">
                        去{{ isSignin ? "登录" : "注册" }}
                    </UButton>
                </NuxtLink>
                <UButton
                    type="submit"
                    :loading="status.loading"
                    :disabled="status.disabled"
                >
                    提交
                </UButton>
            </p>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { useUserStore } from "~/store/user";

const user = useUserStore(),
    route = useRoute(),
    router = useRouter(),
    toast = useToast(),
    isSignin = computed(() => {
        return /signin/.test(route.hash);
    });

const status = reactive({
        disabled: false,
        loading: false,
    }),
    formVal = reactive({
        username: "",
        password: "",
        rePassword: "",
        remember: false,
    }),
    schema = z.object({
        username: z.string().min(3, "账号长度不能小于3"),
        password: z.string().regex(/[\w\W]{6,16}/, "密码长度要在6到16之间"),
    }),
    signInSchema = z.object({
        username: z.string().min(3, "账号长度不能小于3"),
        password: z.string().regex(/[\w\W]{6,16}/, "密码长度要在6到16之间"),
        rePassword: z
            .string()
            .refine((val) => val == formVal.password, "两次输入的密码不一样"),
    });

type Schema = z.output<typeof schema>;

const login = () => {
        status.disabled = true;
        status.loading = true;
        user.login(formVal.username, formVal.password)
            .then((res) => {
                toast.add({
                    title: "登录成功",
                });
                if (route.query.from) {
                    router.replace({
                        name: route.query.from as string,
                        query: route.query,
                    });
                }
                router.back();
            })
            .catch((err) => {
                toast.add({
                    title: err.detail || err.message,
                    color: "red",
                });
            })
            .finally(() => {
                status.disabled = false;
                status.loading = false;
            });
    },
    signin = () => {
        status.disabled = true;
        status.loading = true;
        user.signin({
            name: formVal.username,
            passwd: formVal.password,
        })
            .then((res) => {
                toast.add({
                    title: res.detail || "注册成功",
                });
                router.replace("#");
            })
            .catch((err) => {
                toast.add({
                    title: err.detail || err.message,
                    color: "red",
                });
            })
            .finally(() => {
                status.disabled = false;
                status.loading = false;
            });
    },
    formSubmit = (event: FormSubmitEvent<Schema>) => {
        if (isSignin.value) signin();
        else login();
    };

</script>
<style lang="scss" scoped></style>
