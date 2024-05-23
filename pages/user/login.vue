<template>
    <div class="flex justify-center items-center">
        <NForm class="w-full px-5 md:w-[300px] lg:w-[400px]" @submit.prevent="formSubmit" ref="formRef" :rules="rules"
            :model="formVal" :disabled="status.disabled">
            <h1 class="text-center text-2xl font-bold py-4">{{ isSignin ? '注册' : '登录' }}</h1>
            <NFormItem label="账号" path="name">
                <NInput v-model:value="formVal.name" placeholder="id/用户名/手机/邮箱" />
            </NFormItem>
            <NFormItem label="密码" path="password">
                <NInput v-model:value="formVal.password" type="password" placeholder="登录密码" />
            </NFormItem>
            <NFormItem label="确认密码" path="rePassword" v-if="isSignin">
                <NInput :disabled="!formVal.password" v-model:value="formVal.rePassword" type="password"
                    placeholder="再次输入登录密码" />
            </NFormItem>
            <p class="flex justify-end gap-2">
                <NuxtLink :to="isSignin ? '#' : '#signin'" replace>
                    <NButton :disabled="status.disabled">去{{ isSignin ? '登录' : '注册' }}</NButton>
                </NuxtLink>
                <NButton type="primary" attr-type="submit" :loading="status.loading" :disabled="status.disabled">提交
                </NButton>
            </p>
        </NForm>
    </div>
</template>
<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui';
import { useUserStore } from '~/store/user';

const user = useUserStore(),
    route = useRoute(),
    router = useRouter(),
    message = useMessage(),
    isSignin = computed(() => {
        return /signin/.test(route.hash)
    })

const formRef = ref<FormInst>(),
    status = reactive({
        disabled: false,
        loading: false
    }),
    formVal = reactive({
        name: '',
        password: '',
        rePassword: '',
        remember: false
    }),
    rules: FormRules = {
        name: [{
            required: true,
            validator(rule: FormItemRule, value: string) {

                if (!value)
                    return new Error("账号必须有")
                else if (!/.{3}/.test(value))
                    return new Error("长度最小是3")
                return true
            },
            trigger: ['input', 'blur']
        }],
        password: [{
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value)
                    return new Error("密码必须有")
                else if (!/[\w\W]{6,16}/.test(value))
                    return new Error("长度要在6到16之间")
                return true
            },
            trigger: ['input', 'blur']
        }],
        rePassword: [{
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value)
                    return new Error("必须重新输入密码")
                else if (formVal.password !== value)
                    return new Error("两次输入的密码不一样")
                return true
            },
            trigger: ['input', 'blur']
        }]
    }

const login = () => {
    status.disabled = true
    status.loading = true
    user.login(formVal.name, formVal.password).then(res => {
        message.success("登录成功")
        if (route.query.from){
            router.replace({
                name: route.query.from as string,
                query: route.query
            })
        }
        router.back()
    }).catch(err => {
        message.warning(err.detail || err.message)
    }).finally(() => {
        status.disabled = false
        status.loading = false
    })
}, signin = () => {
    status.disabled = true
    status.loading = true
    user.signin({
        username: formVal.name,
        password: formVal.password
    }).then(res => {
        message.success(res.detail || "注册成功")
        router.replace("#")
    }).catch(err => {
        message.warning(err.detail || err.message)
    }).finally(() => {
        status.disabled = false
        status.loading = false
    })
}, formSubmit = () => {
    formRef.value?.validate(errors => {
        if (errors) {
            message.error('填错了哦')
            return
        }
        if (isSignin.value) signin()
        else login()
    })
}
</script>
<style lang="scss" scoped></style>