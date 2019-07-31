<template>
  <div class="login">
    <div class="form">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn_sub">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入 抽取的axios  名字导出的要用{}
import { http } from "../api/http";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        // 用户验证规则  required
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        // 密码验证规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单规则验证成功后执行
        if (valid) {
          // 发送ajax验证登录
          http.login(this.ruleForm).then(backData => {
            if (backData.data.meta.status == 200) {
              // 登录成功
              this.$message.success(backData.data.meta.msg);
              // 将token存储到localStorage
              window.localStorage.setItem('token',backData.data.data.token);
              // 编程式导航到首页
              this.$router.push("/index");
            } else {
              // 登录失败
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style lang='less' scoped>
// 样式私有化（模块化），不对全局造成污染，
// 可以在style标签上添加scoped属性以表示它的只属于当下的模块

.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  // 主轴对齐方式
  justify-content: center;
  // 次轴对齐方式
  align-items: center;
  .form {
    width: 580px;
    height: 440px;
    border-radius: 10px;
    background-color: #fff;
    padding: 40px;
    h2 {
      margin-bottom: 30px;
    }
    .btn_sub {
      width: 100%;
    }
  }
}
</style>

