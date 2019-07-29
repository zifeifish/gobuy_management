<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="商品管理" second="商品分类"></bread>
    <el-button type="success" plain>添加分类</el-button>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="分类名称" width="340"></el-table-column>
      <el-table-column prop="address" label="级别" width="180"></el-table-column>
      <el-table-column prop="lev" label="是否有效" width="180"></el-table-column>
      <el-table-column prop="lev" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>
</style>
