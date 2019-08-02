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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatu(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="editUsers(scope.row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="open(scope.row.id)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="warning"
            icon="el-icon-check"
            plain
            size="mini"
            @click="getRoles(scope.row)"
          ></el-button>
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
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="rolesFormVisible">
      <el-form :model="rolesForm">
        <div class="my_roles">&nbsp;&nbsp;&nbsp;当前用户 &nbsp;&nbsp;{{rolesForm.username}}</div>
        <el-form-item label="请选择角色">
          <el-select v-model="rolesForm.role_name" placeholder="请选择对应的角色" ref="resel">
            <el-option :value="-1" label="请选择角色" disabled></el-option>
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRoleChange">确 定</el-button>
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
        pagesize: 5 // 每页条数
      },
      // 数据总条数
      total: 10,
      // 表格数据
      tableData: [],
      // 对话框参数
      addFormVisible: false, // 添加用户对话框 默认隐藏
      editFormVisible: false, // 编辑用户对话框 默认隐藏
      rolesFormVisible: false, // 角色分配对话框 默认隐藏
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
      // 定义变量保存 当前编辑行的数据
      rowData: {},
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
      },
      // 当前用户信息
      rolesForm: {
        username: "",
        role_name: "",
        rid: ""
      },
      //角色列表下拉框
      rolesList: []
    };
  },
  methods: {
    // 封装获取用户数据列表 方法
    getUsersData() {
      http.users(this.usersData).then(backData => {
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
    // 点击编辑按钮 查询用户信息
    editUsers(data) {
      // 显示对话框
      this.editFormVisible = true;
      // 显示数据
      this.editForm.username = data.username;
      this.editForm.email = data.email;
      this.editForm.mobile = data.mobile;
      this.editForm.id = data.id;
      // 保存当前行数据
      this.rowData = data;
    },
    // 用户状态改变
    changeStatu(id, type) {
      http.put(`users/${id}/state/${type}`).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 提示状态更新成功
          this.$message.success(backData.data.meta.msg);
          // 更新页面数据
          this.getUsersData();
        } else {
          // 提示 未添加成功信息
          this.$message.error(backData.data.meta.msg);
        }
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
              this.addFormVisible = false;
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
          // this.getUsersData();
          // 赋值(深拷贝) 不用再次请求数据
          this.rowData.username = this.editForm.username;
          this.rowData.email = this.editForm.email;
          this.rowData.mobile = this.editForm.mobile;
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
    },
    // 分配角色
    getRoles(data) {
      // 获取用户信息
      this.rolesForm = data;
      // 显示对话框
      this.rolesFormVisible = true;
      // 发送请求 获取角色列表
      http.rolesList().then(backData => {
        // console.log(backData);
        // 角色列表
        this.rolesList = backData.data.data;
      });
    },
    // 提交分配角色数据
    handleRoleChange() {
      // 获取
      let rid = this.$refs.resel.value;
      // 发请求 分配角色
      http.setRole(this.rolesForm.id, rid).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 提示分配成功
          this.$message.success(backData.data.meta.msg);
          // 隐藏对话框
          this.rolesFormVisible = false;
        } else {
          // 提示分配失败信息
          this.$message.error(backData.data.meta.msg);
        }
      });
    }
  },
  created() {
    // 页面一进来 发送axjx 获取用户数据列表
    this.getUsersData();
    // 发送请求 获取角色列表
    http.rolesList().then(backData => {
      // console.log(backData);
      // 角色列表
      this.rolesList = backData.data.data;
    });
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
.my_roles {
  margin-bottom: 30px;
}
</style>
