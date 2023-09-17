<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetListService, artDelInfoService } from '@/api/article'
import { formatTime } from '@/utils/format.js'
import AritcleEdit from '@/views/article/components/ArticleEdit.vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { ref } from 'vue'
const articleEditRef = ref()
const total = ref(0)
const tabelList = ref([])
const loading = ref(false) //loading状态
// const cateId = ref(57178)
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 获取文章列表
const getManageList = async () => {
  loading.value = true
  const {
    data: { data, total: to }
  } = await artGetListService(params.value)
  tabelList.value = data
  total.value = to
  loading.value = false
}
getManageList()
// 添加文章
const addArticle = async () => {
  articleEditRef.value.open({})
}
//编辑文章
const handleEdit = (row) => {
  articleEditRef.value.open(row)
}
// 删除文章
const handleDelete = async (row) => {
  await ElMessageBox.confirm('你确定要删除该文章吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const { data } = await artDelInfoService(row.id)
  ElMessage.success(data.message)
  getManageList()
}
// 添加或者编辑成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
    getManageList()
  } else {
    // 编辑直接渲染当前页
    getManageList()
  }
}
//当前页码改变
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getManageList()
  // console.log(params.value)
  // console.log('每页条数', page)
}
//当前页数据条数变
const onSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getManageList()
  // console.log(params.value)
  // console.log('当前页码', size)
}
// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getManageList()
}
// 重置
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getManageList()
}
//给数组排序
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:" width="10px" style="width: 30%">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:" style="width: 30%">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="tabelList" v-loading="loading">
      <el-table-column prop="title" label="标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-button
            size="small"
            type="success"
            :icon="Edit"
            circle
            plain
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="handleDelete(row)"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无文章">
          <el-button type="primary" @click="addArticle">添加文章</el-button>
        </el-empty>
      </template>
    </el-table>
    <!-- 抽屉 -->
    <AritcleEdit ref="articleEditRef" @success="onSuccess"></AritcleEdit>
    <!-- 分页区 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next "
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>

<style></style>
