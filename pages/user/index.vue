<template>
    <div>
        <h1 class="text-3xl font-bold my-4 mb-10">用户中心</h1>

        <div v-if="!status.editInfo">
            <p class="mt-2">用户名: {{ user.name }}</p>
            <p class="mt-2">邮箱: {{ user.email }}</p>
            <p class="mt-2">电话: {{ user.phone }}</p>
            <p class="mt-2">密码: {{ showPasswd }}</p>
        </div>

        <UForm
            v-else
            :state="user_info"
            class="space-y-2"
            @submit="updateInfo"
            :schema="schema"
        >
            <UFormGroup label="用户名" name="uname">
                <UInput v-model="user_info.uname" type="username" />
            </UFormGroup>
            <UFormGroup label="邮箱" name="email">
                <UInput v-model="user_info.email" type="email" />
            </UFormGroup>
            <UFormGroup label="电话" name="phone">
                <UInput v-model="user_info.phone" type="phone" />
            </UFormGroup>
            <p class="text-right mt-2">
                <UButtonGroup>
                    <UButton type="submit">提交</UButton>
                    <UButton
                        color="red"
                        variant="outline"
                        @click="status.editInfo = false"
                    >
                        取消
                    </UButton>
                </UButtonGroup>
            </p>
        </UForm>

        <UModal v-model="status.changePasswd" prevent-close>
            <UCard>
                <UForm
                    :state="cpwInfo"
                    class="space-y-2"
                    @submit="changePassword"
                    :schema="cpwSchema"
                    ref="cpwForm"
                >
                    <UFormGroup label="原密码" name="oldPasswd">
                        <UInput v-model="cpwInfo.oldPasswd" type="password" />
                    </UFormGroup>
                    <UFormGroup label="新密码" name="newPasswd">
                        <UInput v-model="cpwInfo.newPasswd" type="password" />
                    </UFormGroup>
                    <UFormGroup label="重复新密码" name="reNewPasswd">
                        <UInput v-model="cpwInfo.reNewPasswd" type="password" />
                    </UFormGroup>
                    <button type="submit" class="hidden" />
                </UForm>
                <template #footer>
                    <div class="text-right">
                        <UButtonGroup>
                            <UButton
                                color="blue"
                                variant="outline"
                                @click="cpwForm.submit()"
                            >
                                提交
                            </UButton>
                            <UButton
                                color="red"
                                variant="outline"
                                @click="status.changePasswd = false"
                            >
                                取消
                            </UButton>
                        </UButtonGroup>
                    </div>
                </template>
            </UCard>
        </UModal>

        <div class="py-2 px-1 gap-2 flex flex-row justify-end">
            <UButtonGroup v-if="!status.editInfo">
                <UButton @click="startEditInfo">修改资料</UButton>
                <UButton color="blue" @click="status.changePasswd = true"
                    >修改密码</UButton
                >
                <UButton color="red" variant="outline" @click="user.signout">
                    Sign out
                </UButton>
            </UButtonGroup>
        </div>
    </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import { useUserStore } from "~/store/user";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
    middleware: ["auth"],
});
const user = useUserStore(),
    status = reactive({
        loading: false,
        editInfo: false,
        changePasswd: false,
    }),
    showPasswd = computed(() => (user.has_password ? "*********" : "-")),
    user_info = ref({
        uname: user.name,
        email: user.email,
        phone: user.phone,
    });
const toast = useToast();

const schema = z.object({
    uname: z.string().min(3, "用户名至少3个字符"),
    email: z.string().email("请输入正确的邮箱"),
    phone: z.string().min(11, "请输入正确的手机号"),
});
type Schema = z.output<typeof schema>;

const startEditInfo = () => {
        user_info.value = {
            uname: user.name,
            email: user.email,
            phone: user.phone,
        };
        status.editInfo = true;
    },
    updateInfo = async (event: FormSubmitEvent<Schema>) => {
        status.loading = true;
        try {
            let res = await user.updateInfo(event.data);
            toast.add({
                title: res.detail || "更新成功",
            });
            user.$state = {
                ...user.$state,
                ...res.data,
            };
        } catch (err) {
            console.error(err);
            toast.add({
                title: "更新失败",
            });
        }
        status.editInfo = false;
        status.loading = false;
    },
    cpwInfo = reactive({
        oldPasswd: "",
        newPasswd: "",
        reNewPasswd: "",
    }),
    cpwSchema = z.object({
        oldPasswd: z
            .string()
            .min(6, "密码至少6个字符")
            .refine(async (val) => {
                try {
                    await user.checkPassword(val);
                    return true;
                } catch {
                    return false;
                }
            }, "验证失败"),
        newPasswd: z.string().min(6, "密码至少6个字符"),
        reNewPasswd: z.string().min(6, "密码至少6个字符").refine((val) => val == cpwInfo.newPasswd, {
            message: "两次输入的密码不一致",
        }),
    }),
    cpwForm = ref(),
    changePassword = async ({ data }: { data: cpwInfoType }) => {
        user.updateInfo({
            passwd: data.reNewPasswd,
        })
            .then((res) => {
                toast.add({
                    title: res.detail || "修改成功",
                });
                cpwInfo.oldPasswd = "";
                cpwInfo.newPasswd = "";
                cpwInfo.reNewPasswd = "";
                status.changePasswd = false;
            })
            .catch((err) => {
                toast.add({
                    title: err.detail || "修改失败",
                    color: "red",
                });
            });
    };
type cpwInfoType = z.infer<typeof cpwSchema>;
</script>
<style lang="scss" scoped></style>
