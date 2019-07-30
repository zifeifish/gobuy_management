<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="用户管理" second="用户列表"></bread>
    <!-- 搜索框 -->
    <el-col>
      <!-- layout布局 -->
      <el-col :span="6">
        <el-input 
        placeholder="请输入内容" 
        class="input-with-select" 
        v-model.trim="usersData.query"
        @keyup.enter.native="getUsersData()"
        >
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-col>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="280"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="80">
        <template slot-scope="scope">
          <!-- 开关 -->
          <!-- scope.row 保存的是当前自定义列里的数据 -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersData.pagenum"
      :page-sizes="[3, 5,10]"
      :page-size="usersData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total='total'
    ></el-pagination>

    <!-- 添加用户弹出框 -->
    <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
          <el-form status-icon label-width="100px" class="demo-ruleForm" label-position="left">
            <el-form-item label="用户名" prop>
              <el-input type="text" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="password">
              <el-input type="email" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="password">
              <el-input type="tel" autocomplete="off" :label-width="formLabelWidth"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
    </el-dialog>-->
  </div>
</template>

<script>
// 导入http 发请求
import { http } from "../api/http";

export default {
  data() {
    return {
      // 用户列表查询参数
      usersData: {
        query: "", // 查询参数
        pagenum: 1, // 当前页
        pagesize: 3 // 每页条数
      },
      // 数据总条数
      total: "",
      // 表格数据
      tableData: [],
      // 对话框参数
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 封装获取用户数据列表 方法
    getUsersData() {
      http.users(this.usersData).then(backData => {
        console.log(backData);
        // 表格数据
        this.tableData = backData.data.data.users;
        // 总数据量
        this.total = backData.data.data.total;
      });
    },
    // 选择每页显示数量
    handleSizeChange(pagesize) {
      // 修改要显示的条数
      this.usersData.pagesize = pagesize;
      this.getUsersData();
    },
    // 点击页码
    handleCurrentChange(pagenum) {
      // 修改当前页码
      this.usersData.pagenum = pagenum;
      this.getUsersData();
    },
    // 搜索框
    search() {
      // 获取数据
      this.getUsersData();
    }
  },
  created() {
    // 页面一进来 发送axjx 获取用户数据列表
    this.getUsersData();
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
