<template>
  <div>
    <!-- 搜索框 -->
    <el-col>
      <!-- layout布局 -->
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="$router.push('/goods/addGoods')">添加商品</el-button>
      </el-col>
    </el-col>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="#" width="40"></el-table-column>
      <el-table-column prop="date" label="商品名称" width="480"></el-table-column>
      <el-table-column prop="address" label="商品价格（元）" width="140"></el-table-column>
      <el-table-column prop="lev" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="lev" label="创建时间" width="140"></el-table-column>
      <el-table-column prop="lev" label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
      </el-table-column>
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
