<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="权限列表"></bread>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="#" width="40"></el-table-column>
      <el-table-column prop="date" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="address" label="路径" width="180"></el-table-column>
      <el-table-column prop="lev" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "商品管理",
          address: "goods",
          lev: "一级"
        },
        {
          id: 2,
          date: "商品管理",
          address: "goods",
          lev: "一级"
        }
      ]
    };
  }
};
</script>

<style>
</style>
