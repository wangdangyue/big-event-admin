<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <!-- //给全部页面设置中文显示 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
