<template>
  <el-container class="mian_container">
    <el-header class="header">
      <img src="../assets/logo.png" alt />
      <h2>gobuy电商后台管理系统</h2>
      <a href="#" class="singout">退出</a>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧栏导航 -->
        <el-row class="tac">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                <span slot="title">商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                <span slot="title">分类参数</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                <span slot="title">数据报表</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
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
    img {
      width: 170px;
      height: 60px;
    }
    h2 {
      display: inline-block;
      color: cornflowerblue;
    }
    .singout {
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
