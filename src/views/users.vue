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
        <el-button type="success" plain @click="addFormVisible = true">添加用户</el-button>
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
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="editUsers(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="open(scope.row.id)"
          ></el-button>
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
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="70px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" autocomplete="off" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" autocomplete="off" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="tel" autocomplete="off" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form
        :model="editForm"
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" autocomplete="off" v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" autocomplete="off" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="text" autocomplete="off" v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 10,
      // 表格数据
      tableData: [],
      // 对话框参数
      addFormVisible: false, // 添加用户对话框 默认隐藏
      editFormVisible: false, // 编辑用户对话框 默认隐藏
      // 添加用户表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑用户表单数据
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
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
    },
    // 点击按钮 查询用户信息
    editUsers(id) {
      // 显示对话框
      this.editFormVisible = true;
      // 发请求
      http.editUsers(id).then(backData => {
        this.editForm = backData.data.data;
      });
    },
    // 添加用户 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证成功 发送ajax 添加用户
          http.addUsers(this.form).then(backData => {
            if (backData.data.meta.status == 201) {
              // 提示添加成功
              this.$message.success(backData.data.meta.msg);
              // 关闭对话框
              this.dialogFormVisible = false;
              // 更新页面数据
              this.getUsersData();
            } else {
              // 提示 未添加成功信息
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑用户 提交
    editSubmit() {
      // this.$message.success('修改成功');
      // 发送ajax 提交编辑后的用户信息
      const id = this.editForm.id;
      http.putEditUsers(id, this.editForm).then(backData => {
        if (backData.data.meta.status == 200) {
          // 提更新成功
          this.$message.success(backData.data.meta.msg);
          // 关闭对话框
          this.editFormVisible = false;
          // 更新页面数据
          this.getUsersData();
        } else {
          // 提示 未添加成功信息
          this.$message.error(backData.data.meta.msg);
        }
      });
    },
    // 删除单个用户信息
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送ajax请求 删除用户信息
          http.deleteUsers(id).then(backData => {
            if (backData.data.meta.status == 200) {
              //提示删除成功
              this.$message.success(backData.data.meta.msg);
              // 刷新页面
              this.getUsersData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
