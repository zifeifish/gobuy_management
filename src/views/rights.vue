<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="权限列表"></bread>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column prop="level" label="层级" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入抽取的axios
import { http } from "../api/http.js";
export default {
  name: "rights",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    // 页面一进来发送axjx请求 获取所有权限列表
    http.rights().then(backData => {
      this.tableData = backData.data.data;
      // 处理层级显示
      for (let i = 0; i < backData.data.data.length; i++) {
        switch (backData.data.data[i].level) {
          case "0":
            this.tableData[i].level = "一级";
            break;
          case "1":
            this.tableData[i].level = "二级";
            break;
          case "2":
            this.tableData[i].level = "三级";
            break;
          default:
            break;
        }
      }
    });
  }
};
</script>

<style>
</style>
