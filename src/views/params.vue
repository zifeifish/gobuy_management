<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="商品管理" second="分类参数"></bread>
    <el-alert
      class="el-icon-warning alert_msg"
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      :closable="false"
    ></el-alert>
    <!-- 级联选择器 -->
    <div class="my_sel">
      <span>请选择商品分类:</span>&nbsp;
      <el-cascader
        v-model="selectedOptions"
        :options="options"
        expandTrigger="hover"
        :props="{label: 'cat_name', value: 'cat_id' }"
        placeholder="请选择商品分类"
        :show-all-levels="false"
        @change="handleChange"
      ></el-cascader>
    </div>
    <!-- 标签tab栏 -->
    <el-tabs v-model="activeName" class="my_tag" @tab-click="tagChange">
      <el-tab-pane label="动态数据" name="first">
        <el-button type="primary" :disabled="dynaData.length>0?false:true" class="not_btn">添加动态参数</el-button>
        <!-- 动态数据表格栏 -->
        <el-table :data="dynaData" stripe border style="width: 100%">
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!-- 标签 -->
              <el-tag
                :key="index"
                v-for="(tag,index) in (scope.row.attr_vals.split(','))"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,index)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态数据" name="second">
        <el-button type="primary" :disabled="staticData.length>0?false:true" class="not_btn">添加静态参数</el-button>
        <!-- 静态数据表格栏 -->
        <el-table :data="staticData" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="480"></el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { http } from "../api/http";
export default {
  name: "params",
  data() {
    return {
      // 动态参数数据
      dynaData: [],
      // 静态参数数据
      staticData: [],
      // 标签数据
      tagLists: ["aa", "bb", "cc"],
      inputVisible: false,
      // 添加标签
      inputValue: "",
      // 标签页
      activeName: "first", // 默认显示动态数据
      value: [],
      // 级联选择器 渲染数据
      options: [],
      // 选择数据
      selectedOptions: [],
      // 动态数据
      selName: "many"
    };
  },
  methods: {
    // 获取商品参数
    getTagTable() {
      // tab为动态参数
      if (this.activeName == "first") {
        http
          .get(`categories/${this.selectedOptions[2]}/attributes`, {
            params: {
              sel: "many"
            }
          })
          .then(backData => {
            // console.log(backData);
            // 动态参数数据
            this.dynaData = backData.data.data;
          });
      } else {
        http
          .get(`categories/${this.selectedOptions[2]}/attributes`, {
            params: {
              sel: "only"
            }
          })
          .then(backData => {
            // console.log(backData);
            // 静态参数数据
            this.staticData = backData.data.data;
          });
      }
    },
    // 点击切换 tab栏
    tagChange() {
      this.getTagTable();
    },
    handleClose(row, index) {
      const arr = row.attr_vals.split(",");
      arr.splice(index, 1);
      const postData = {};
      postData.attr_name = row.attr_name;
      postData.attr_sel = row.attr_sel;
      postData.attr_vals = arr.join(",");
      const url = `/categories/${row.cat_id}/attributes/${row.attr_id}`;
      http.put(url, postData).then(backData => {
        console.log(backData);
        if (backData.data.meta.status === 200) {
          this.$message.success("更新成功");
        } else {
          this.$message.error("更新失败");
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(row) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tagLists.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 级联选择 下拉框改变
    handleChange() {
      // 获取商品参数
      this.getTagTable();
    }
  },
  created() {
    // 获取 商品数据列表
    http
      .get("categories", {
        params: {
          type: 3
        }
      })
      .then(bcakData => {
        // console.log(bcakData);
        this.options = bcakData.data.data;
      });
  }
};
</script>

<style lang='less' scoped>
.alert_msg {
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.my_sel {
  margin-bottom: 20px;
}
// 添加动态参数
.not_btn {
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0;
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
