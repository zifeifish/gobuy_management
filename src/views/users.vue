<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="用户管理" second="用户列表"></bread>
    <!-- 搜索框 -->
    <el-col>
      <!-- layout布局 -->
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-col>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="#" width="40"></el-table-column>
      <el-table-column prop="name" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="80"></el-table-column>
      <el-table-column prop="option" label="操作"></el-table-column>
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
          id: 1,
          name: "王小虎",
          email: "adsfad@qq.com",
          tel: "666",
          status: "正常",
          option: ""
        },
        {
          id: 2,
          name: "王小虎",
          email: "",
          tel: "",
          status: "",
          option: ""
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
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
