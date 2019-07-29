<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="角色列表"></bread>
    <!-- 搜索框 -->
    <el-col>
      <!-- layout布局 -->
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-col>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(){},
    handleCurrentChange(){}
  },
};
</script>

<style lang='less' scoped>
.my_bread {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background-color: #d3dce6;
}
</style>
