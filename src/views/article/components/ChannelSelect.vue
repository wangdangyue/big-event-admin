<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const {
    data: { data }
  } = await artGetChannelsService()
  channelList.value = data
  //   console.log(data)
}
getChannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      :label="item.cate_name"
      :value="item.id"
      v-for="item in channelList"
      :key="item.id"
    />
  </el-select>
</template>
