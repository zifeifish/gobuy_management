<template>
  <div>
    <!-- alert提示框 -->
    <el-alert title="消息提示的文案" type="info" center show-icon class="my_alert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="+active" finish-status="success" align-center class="my_steps">
      <el-step title="基本信息"></el-step>
      <el-step title="商品总数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <template>
      <el-tabs v-model="active" tab-position="left" style="height: 200px;" class="my_tabs">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品总数" name="1">商品总数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <!-- 上传图片 -->
          <el-upload
            class="upload-demo"
            :headers="headers"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0,
      fileList: [],
      headers: {
        // 请求头的键：值
        Authorization: window.localStorage.getItem("token")
      }
    };
  },
  methods: {
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // file 删除的文件
      // fileList 剩余的的文件
      // console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      // 上传成功的文件
      // console.log(file);
    },
    // 文件上传成功时的钩子
    uploadSuccess() {
      this.$message.success("图片上传成功");
    }
  }
};
</script>

<style lang="less" scoped>
.my_alert {
  margin: 20px auto;
}
.my_steps {
  margin-bottom: 30px;
}
.my_tabs {
  overflow: unset;
}
</style>
