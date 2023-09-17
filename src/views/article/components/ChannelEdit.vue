<script setup>
import { ref } from 'vue'
import { artUpdateChannelService, artAddChannelService } from '@/api/article'
const dialogFormVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  // 1-10个非空格字符
  cate_name: [
    { required: true, message: '分类名称不能为空', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  //   1-15个大小写字母和数字组成的字符串
  cate_alias: [
    { required: true, message: '分类别名不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}
const open = (row) => {
  dialogFormVisible.value = true
  formModel.value = { ...row }
}
defineExpose({
  open
})
const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  dialogFormVisible.value = false
  if (formModel.value.id) {
    const { data } = await artUpdateChannelService(formModel.value)
    ElMessage.success(data.message)
  } else {
    const { data } = await artAddChannelService(formModel.value)
    ElMessage.success(data.message)
  }

  emit('success')
}
</script>

<template>
  <!-- 添加编辑文章分类弹窗 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <el-form-item label="分类名称:" prop="cate_name">
        <el-input
          placeholder="输入分类名称"
          v-model="formModel.cate_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名:" prop="cate_alias">
        <el-input
          placeholder="输入分类别名"
          v-model="formModel.cate_alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
