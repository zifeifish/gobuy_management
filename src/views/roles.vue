<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="权限管理" second="角色列表"></bread>
    <el-button @click="addFormVisible=true">添加角色</el-button>
    <!-- 展开行表格栏 -->
    <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="item in scope.row.children" :key="item.id">
              <!-- 一级菜单 -->
              <el-col :span="6">
                <el-tag closable @close="delRoleRight(scope.row,item)">{{item.authName}}</el-tag>
                <span class="el-icon-arrow-right"></span>
              </el-col>

              <el-col :span="18">
                <!-- 二级菜单 -->
                <el-row v-for="level2 in item.children" :key="level2.id">
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="delRoleRight(scope.row,level2)"
                    >{{ level2.authName }}</el-tag>
                    <span class="el-icon-arrow-right"></span>
                  </el-col>

                  <!-- 三级菜单 -->
                  <el-col :span="18">
                    <el-tag
                      class="my_tag"
                      closable
                      type="warning"
                      v-for="level3 in level2.children"
                      :key="level3.id"
                      @close="delRoleRight(scope.row,level3)"
                    >{{ level3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="380"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="380"></el-table-column>
        <el-table-column label="操作">
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
            <!-- 权限分配 -->
            <el-button
              type="warning"
              icon="el-icon-check"
              plain
              size="mini"
              @click="getRolesRight(scope.row)"
            ></el-button>
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
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
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
    <!-- 权限分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="setRoleRights">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkKeyList"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleRights = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../api/http.js";
export default {
  name: "roles",
  data() {
    return {
      // 角色id
      roleId: 0,
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
      editFormVisible: false, // 编辑角色对话框 默认隐藏
      setRoleRights: false, // 权限分配对话框 默认隐藏
      // 数形控件 绑定的数据
      data: [],
      // 默认勾选的节点的 key 的数组
      checkKeyList: [],
      defaultProps: {
        // 指定子节点 为对象的哪个属性值
        children: "children",
        // 指定要显示的文字 用哪个属性的值
        label: "authName"
      }
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
        // console.log(backData);
        // 获取编辑角色信息
        this.editForm = backData.data.data;
      });
    },

    // 编辑角色 表单提交
    editSubmitForm(id) {
      http.put(`roles/${id}`, this.editForm).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          // 提示更新成功
          this.$message.success("编辑成功");
          // 关闭对话框
          this.editFormVisible = false;
          // 更新页面数据
          this.getRolesList();
        } else {
          // 提示 未添加成功信息
          this.$message.error(backData.data.meta.msg);
        }
      });
    },

    // 标签页 删除角色指定权限
    delRoleRight(role, right) {
      // 提示是否真的删除
      this.$confirm("即将删除此项权限, 是否继续?", "温馨提示")
        .then(() => {
          // 根据角色id和权限id 发送请求
          http.delRoleRight(role.id, right.id).then(backData => {
            // console.log(backData);
            // 删除成功
            if (backData.data.meta.status == 200) {
              // 弹框提示
              this.$message.success(backData.data.meta.msg);
              // 更新页面数据
              role.children = backData.data.data;
            }
          });
        })
        .catch(() => {
          this.$message.info("已终止删除~");
        });
    },

    // 获取所有权限数据列表
    getRolesRight(row) {
      this.roleId = row.id;
      // 显示权限分配对话框
      this.setRoleRights = true;

      // 保存原来的树形数据
      let tmp = this.data.concat();

      // 清空树形数据
      this.data = [];

      // 还原数据，根据数据重新生成
      this.data = tmp;

      // 递归 遍历当前行数据 将权限id 添加到默认勾选节点 key的数组中
      let list = [];
      function getRolesRight(row) {
        if (row.children) {
          // row.children 里有该角色拥有的权限
          for (let i = 0; i < row.children.length; i++) {
            // list.push(row.children[i].id);
            getRolesRight(row.children[i]);
          }
        } else {
          // 最后一级 加进去就可以了
          list.push(row.id);
        }
      }
      getRolesRight(row);
      this.checkKeyList = list;
    },

    // 设置角色权限
    setRole() {
      
      // 获取到所有选中的权限id
      let keys = this.$refs.tree.getCheckedKeys();
      // 拿到所有半选择的权限id
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();
      // 用逗号分隔数组每一项 以 `,` 分割的权限 ID 列表
      let rids = keys.concat(halfKeys).toString();
      // 发请求 分配权限
      http.setRoleRight({ roleId: this.roleId, rids: rids }).then(backData => {
        // console.log(backData);
        // 更新成功
        if (backData.data.meta.status == 200) {
          // 隐藏对话框
          this.setRoleRights = false;
          // 提示消息
          this.$message.success("分配权限成功");
          // 更新页面数据
          this.getRolesList();
        }else{
          // 更新失败提示信息
          this.$message.error(backData.data.meta.msg);
        }
      });
    }
  },
  created() {
    // 页面一进来 获取所有角色数据
    this.getRolesList();
    // 发请求 获取所有权限数据
    http.get("rights/tree").then(backData => {
      // console.log(backData);
      this.data = backData.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.my_tag {
  margin-top: 10px;
  margin-right: 20px;
}
</style>
