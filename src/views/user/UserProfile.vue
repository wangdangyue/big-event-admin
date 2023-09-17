<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { UpdateUserInfoService } from '@/api/user.js'
const userStore = useUserStore()
import { ref } from 'vue'
const form = ref() //表单
// 表单数据
const formData = ref({
  username: '',
  nickname: '',
  email: ''
})
// 将信息转递给表单回显
formData.value = userStore.user
// 表单数据规则
const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度在2-10个非空字符之间',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: ['blur', 'change']
    }
  ]
}
// 提交修改
const submitForm = async () => {
  await form.value.validate()
  await UpdateUserInfoService(formData.value)
  ElMessage.success('更新成功')
  userStore.getUser()
}
</script>

<template>
  <PageContainer title="基本资料">
    <!-- <template #extra> asda </template> -->
    <!-- 表单区域 -->
    <template #default>
      <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="登录名称">
          <el-input v-model="formData.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item style="justify-content: flex-end">
          <el-button
            style="justify-content: flex-end"
            type="primary"
            @click="submitForm"
            >提交修改</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </PageContainer>
</template>
<style scoped></style>
