<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="订单管理" second="订单列表"></bread>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop label="#" width="40"></el-table-column>
      <el-table-column prop label="订单编号" width="300"></el-table-column>
      <el-table-column prop label="订单价格" width="100"></el-table-column>
      <el-table-column prop label="是否付款" width="100">
        <el-button type="danger" plain size="mini">未付款</el-button>
      </el-table-column>
      <el-table-column prop label="是否发货" width="180"></el-table-column>
      <el-table-column prop label="下单时间" width="180"></el-table-column>
      <el-table-column prop label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
      </el-table-column>
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
