<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <div class="page-channel">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <!-- <el-button class="button">添加分类</el-button> -->
          <slot name="extra"></slot>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.page-channel {
  height: 100%;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-light);
}
.box-card {
  box-sizing: border-box;
  .card-header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-card__body {
    padding-bottom: 0px;
    // background-color: blue;
  }
}
.is-always-shadow {
  box-shadow: none;
}
.el-card {
  border: 0px;
}
</style>
