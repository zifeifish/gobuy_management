<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="角色列表"></bread>
    <el-button @click="addFormVisible=true">添加角色</el-button>
    <!-- 展开行表格栏 -->
    <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="角色名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="角色描述">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="380"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="380"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click="openEdit(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            <!-- 修改 -->
            <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addFormVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" autocomplete="off" v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="text" autocomplete="off" v-model="form.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="editFormVisible">
      <el-form
        :model="editForm"
        :rules="editrules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" autocomplete="off" v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="text" autocomplete="off" v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitForm(editForm.roleId)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../api/http.js";
export default {
  data() {
    return {
      // 角色列表数据
      tableData: [],
      // 添加角色 表单数据
      form: {
        roleName: "",
        roleDesc: ""
      },
      // 添加角色 表单验证
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      addFormVisible: false, // 添加角色对话框 默认隐藏
      // 编辑角色 表单数据
      editForm: {
        roleName: "",
        roleDesc: ""
      },
      // 编辑角色 表单验证
      editrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      editFormVisible: false // 编辑角色对话框 默认隐藏
    };
  },
  methods: {
    // 封装获取角色列表 方法
    getRolesList() {
      http.rolesList().then(backData => {
        // console.log(backData);
        this.tableData = backData.data.data;
      });
    },

    // 添加角色 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证成功 发送ajax 添加角色
          http.post("roles", this.form).then(backData => {
            console.log(backData);

            if (backData.data.meta.status == 201) {
              // 提示添加成功
              this.$message.success(backData.data.meta.msg);
              // 关闭对话框
              this.addFormVisible = false;
              // 更新页面数据
              this.getRolesList();
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

    // 点击编辑按钮
    openEdit(id) {
      // 显示编辑角色对话框
      this.editFormVisible = true;
      // 获取角色信息
      http.get(`roles/${id}`).then(backData => {
        console.log(backData);
        // 获取编辑角色信息
        this.editForm = backData.data.data;
      });
    },

    // 编辑角色 表单提交
    editSubmitForm(id) {
      http.put(`roles/${id}`, this.editForm).then(backData => {
        console.log(backData);
        if (backData.data.meta.status == 200) {
          // 提示更新成功
          this.$message.success('编辑成功');
          // 关闭对话框
          this.editFormVisible = false;
          // 更新页面数据
          this.getRolesList();
        } else {
          // 提示 未添加成功信息
          this.$message.error(backData.data.meta.msg);
        }
      });
    }
  },
  created() {
    // 页面一进来 获取所有角色数据
    this.getRolesList();
  }
};
</script>

<style>
</style>
