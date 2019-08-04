<template>
  <div>
    <!-- alert提示框 -->
    <el-alert title="消息提示的文案" type="info" center show-icon class="my_alert"></el-alert>
    <!-- 步骤条 -->
    <el-steps  :active="+active" finish-status="success" align-center class="my_steps">
      <el-step title="基本信息"></el-step>
      <el-step title="商品总数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <template>
      <el-tabs v-model="active" tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息" >基本信息</el-tab-pane>
        <el-tab-pane label="商品总数" name="1">商品总数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
.my_alert {
  margin: 20px auto;
}
.my_steps {
  margin-bottom: 30px;
}
</style>
