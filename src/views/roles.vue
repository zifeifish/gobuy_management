<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="角色列表"></bread>
    <el-button>添加角色</el-button>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="arrow" width="40"></el-table-column>
      <el-table-column prop="id" label="#" width="40"></el-table-column>
      <el-table-column prop="date" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="name" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          arrow: ">",
          id: 1,
          date: "主管",
          name: "技术负责人",
          address: ""
        },
        {
          arrow: ">",
          id: 2,
          date: "主管",
          name: "技术负责人",
          address: ""
        }
      ]
    };
  }
};
</script>

<style>
</style>
