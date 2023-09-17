<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStroe = useUserStore()
import { UserRegisterService, UserLoginService } from '@/api/user.js'
const isRegister = ref(true)
const router = useRouter()
// 整个用于提交的form数据对象,注册时需要传递的参数
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 整个表单的校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      // validator：函数自定义校验，rule 当前校验规则相关的信息，value所校验的表单元素目前的表单值，callback回调，成功callback()，失败callback(new Error(错误信息))
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
//绑定form表单，获取整个表单数据进行校验
const form = ref()
//点击注册调用该函数
const register = async () => {
  // 对整个表单内容进行校验
  await form.value.validate()
  // 校验通过执行下面命令
  const { data } = await UserRegisterService(formModel.value)
  // console.log(data)
  // 注册成功
  if (data.code === 0) {
    isRegister.value = false
    ElMessage({
      message: data.message,
      type: 'success'
    })
  } else {
    ElMessage({
      message: data.message,
      type: 'error'
    })
  }
}
//点击登录调用该函数
const login = async () => {
  // 对整个表单内容进行校验
  await form.value.validate()
  // 校验通过执行下面命令
  const { data } = await UserLoginService(formModel.value)
  // console.log(data)
  if (data.code === 0) {
    userStroe.setToken(data.token)
    ElMessage.success(data.message)
    router.push('/')
  } else {
    ElMessage.error(data.message)
  }
}
// 页面切换的时候重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page bg">
    <el-col :span="12"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录页面 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            style="color: #c3c8c6"
            type="info"
            :underline="false"
            @click="isRegister = false"
          >
            ← 登录
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 注册页面 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="formModel"
        :rules="rules"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox style="color: #c3c8c6">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            style="color: #c3c8c6"
            type="info"
            :underline="false"
            @click="isRegister = true"
          >
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.bg {
  background:
    url('@/assets/logo2.png') no-repeat 2% top / 140px auto,
    url('@/assets/home-login-bg.jpg') no-repeat center / cover;

  // border-radius: 0 20px 20px 0;
  // opacity: 0.2;
}
h1 {
  color: #fff;
}
</style>
