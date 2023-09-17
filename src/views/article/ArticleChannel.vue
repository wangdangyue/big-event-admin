<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'

const dialog = ref()
const loading = ref(false)
const channelList = ref([])

const getChannelList = async () => {
  loading.value = true
  const {
    data: { data }
  } = await artGetChannelsService()
  channelList.value = data
  loading.value = false
  // console.log(channelList.value)
}
onMounted(() => {
  getChannelList()
})

//添加分类
const addChannel = async () => {
  dialog.value.open({})
}
//编辑分类
const onEditChannel = ($index, row) => {
  dialog.value.open(row)
}
//删除分类
const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const { data } = await artDelChannelService(row.id)
  ElMessage.success(data.message)
  getChannelList()
}
//更新列表
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <div>
      <!-- 文章分类列表显示 -->
      <el-table v-loading="loading" :data="channelList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column prop="" label="操作" width="90">
          <template #default="{ row, $index }">
            <el-button
              :icon="Edit"
              type="success"
              size="small"
              circle
              plain
              @click="onEditChannel($index, row)"
            ></el-button>
            <el-button
              :icon="Delete"
              type="danger"
              size="small"
              circle
              plain
              @click="onDeleteChannel(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无文章分类">
            <el-button type="primary" @click="addChannel">添加分类</el-button>
          </el-empty>
        </template>
      </el-table>
      <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    </div>
  </page-container>
</template>

<style></style>
