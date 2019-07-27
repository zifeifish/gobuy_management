<template>
  <el-container class="mian_container">
    <el-header class="header">
      <img src="../assets/logo.png" alt="">
      <h2>gobuy电商后台管理系统</h2>
      <a href="#" class="singout">退出</a>
    </el-header>
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
    // 伸缩布局
    display: flex;
    // 主轴对其方式
    justify-content: space-between;
    // 次轴对其方式
    align-items: center;
    img{
      width: 180px;
      height: 60px;
    }
    h2{
      display: inline-block;
      color:cornflowerblue;
    }
    .singout{
      color: brown;
    }
  }
  .aside {
    background-color: #fff;
  }
  .my_main {
    background-color: #e9eef3;
  }
}
</style>
