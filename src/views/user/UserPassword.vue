<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { UpdateUserPasswordService } from '@/api/user.js'
const form = ref() // 表单对象
// 表单里面的值
const defaultForm = {
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
}
const formData = ref({ ...defaultForm })
// 表单规则
const rules = ref({
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '原密码长度在6-15个字符之间',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '新密码长度在6-15个字符之间',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === formData.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '确认新密码长度在6-15个字符之间',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.new_pwd) {
          callback(new Error('确认新密码与新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
// 提交
const submitForm = async () => {
  await form.value.validate()
  await UpdateUserPasswordService(formData.value)
  ElMessage.success('密码修改成功')
  resetForm()
}
//重置密码
const resetForm = () => {
  formData.value = { ...defaultForm }
}
</script>

<template>  
    <page-container title="重置密码">
      <template #default>
        <el-form
          :model="formData"
          :rules="rules"
          ref="form"
          label-width="100px"
          style="max-width: 460px"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input
              v-model="formData.old_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              v-model="formData.new_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input
              v-model="formData.re_pwd"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </page-container>
  </template>
