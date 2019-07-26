<template>
  <el-container class="mian_container">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="my_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.mian_container {
  height: 100%;
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #b3c0d1;
  }
  .aside {
    background-color: #fff;
  }
  .my_main {
    background-color: #e9eef3;
  }
}
</style>
