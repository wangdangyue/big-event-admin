<script setup>
import { ref } from 'vue'
import ChannelSelect from '@/views\\article\\components\\ChannelSelect.vue'
import {
  addArticleService,
  artGetInfoService,
  artUpdateInfoService
} from '@/api/article.js'

import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import { baseURL } from '@/utils/request.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const visibleDrawer = ref(false) //抽屉开关
const imgUrl = ref('') //图片链接
const editorRef = ref() // 富文本编辑器
const formRef = ref() // 表单
// 默认重置表单数据
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
// 准备数据
const formModel = ref({ ...defaultForm })
// 准备规则
const rules = {
  title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }],
  cate_id: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }],
  cover_img: [{ required: true, message: '文章封面不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }]
}
// 选择图片触发的事件
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
  // console.log(defaultForm.cover_img)
}
// 通知父类
const emit = defineEmits(['success'])

// 确定编辑或添加按钮
const onPublish = async (state) => {
  formModel.value.state = state
  await formRef.value.validate()
  // 当前接口需要转换成formdata对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  //发请求
  if (formModel.value.id) {
    // 编辑操作
    await artUpdateInfoService(fd)
    ElMessage.success('编辑文章成功！')
    visibleDrawer.value = false
    emit('success', 'update')
  } else {
    //添加操作
    await addArticleService(fd)
    ElMessage.success('发布文章成功！')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    const {
      data: { data }
    } = await artGetInfoService(row.id)
    formModel.value = data
    // 图片需要单独处理
    imgUrl.value = baseURL + data.cover_img
    //服务器需要传入file对象，所有要将网络图片地址转换为file对象存储

    // console.log(data)
    // console.log('编辑回显')
  } else {
    // console.log('添加功能')
    //重置输入框
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
