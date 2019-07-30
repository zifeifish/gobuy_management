<template>
  <!-- 面包屑导航栏 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my_bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 父组件向子组件传值
  props: ["first", "second"]
};
</script>

<style lang='less' scoped>
.my_bread {
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
  background-color: #d3dce6;
}
/deep/.el-breadcrumb__inner {
  color: rgb(38, 0, 255);
}
</style>
