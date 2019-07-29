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
          :unique-opened="true"
          :router="true"
          >
            <el-submenu v-for="(item,index) in munesList" :key="index" :index="''+index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="(it,num) in item.children" :key="num" :index="it.path">
                <i class="el-icon-menu"></i>
                {{it.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入抽取的axios
import { http } from "../api/http.js";
export default {
  data() {
    return {
      //左侧导航列表
      munesList: []
    };
  },
  created() {
    http.menus().then(backData => {
      console.log(backData);
      this.munesList = backData.data.data;
    });
  }
};
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
      width: 160px;
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
