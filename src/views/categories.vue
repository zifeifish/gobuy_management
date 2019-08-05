<template>
  <div>
    <!-- 面包屑导航栏 -->
    <bread first="商品管理" second="商品分类"></bread>
    <el-button type="success" plain>添加分类</el-button>
    <!-- 表格栏 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="cat_id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="cat_name" label="分类名称" width="350"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="200">
        <template slot-scope="scope">{{scope.row.cat_level | formatLevel}}</template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="200">
        <template slot-scope="scope">{{scope.row.cat_deleted | formatDeleted}}</template>
      </el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="tag">
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5,10,15,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { http } from "../api/http.js";
export default {
  name: "categories",
  data() {
    return {
      // 树形表格数据
      tableData: [],
      // 分页数据
      pagesize: 5, // 每页条数
      pagenum: 1, // 当前页码
      total: 0 // 总条数
    };
  },
  // 过滤器
  filters: {
    formatLevel(value) {
      switch (value) {
        case 0:
          return "一级";
        case 1:
          return "二级";
        case 2:
          return "三级";
        default:
          return "四级";
      }
    },

    formatDeleted(value) {
      return value == false ? "有效" : "无效";
    }
  },
  methods: {
    // 封装 获取 商品数据列表
    getCategories() {
      http
        .get("categories", {
          params: {
            type: 3,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(bcakData => {
          // console.log(bcakData);
          this.tableData = bcakData.data.data.result;
          this.total = bcakData.data.data.total;
          this.pagesize = bcakData.data.data.pagesize;
          this.pagenum = bcakData.data.data.pagenum + 1;
        });
    },
    // 点击页码
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getCategories();
    },
    // 改变每页显示条数
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum;
      this.getCategories();
    }
  },
  created() {
    // 获取 商品数据列表
    this.getCategories();
  }
};
</script>

<style>
</style>
