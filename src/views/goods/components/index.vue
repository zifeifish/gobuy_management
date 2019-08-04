<template>
  <div>
    <!-- 搜索框 -->
    <el-col>
      <!-- layout布局 -->
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="$router.push('/goods/addGoods')">添加商品</el-button>
      </el-col>
    </el-col>
    <!-- 表格栏 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="480"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）" width="140"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{scope.row.add_time | dateformat}}</template>
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
      :current-page="data.pagenum"
      :page-sizes="[20, 50, 100,200]"
      :page-size="data.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { http } from "../../../api/http.js";
export default {
  name: "good_index",
  data() {
    return {
      // 请求商品列表参数
      data: {
        query: "",
        pagenum: 1,
        pagesize: 20
      },
      // 总条数
      total: 5,
      // 表格数据
      tableData: []
    };
  },
  methods: {
    // 封装获取 商品列表数据方法
    getGoods() {
      http.get("goods", { params: this.data }).then(backData => {
        // console.log(backData);
        // 表格数据
        this.tableData = backData.data.data.goods;
        // 总条数
        this.total = backData.data.data.total;
      });
    },
    // 每页条数改变
    handleSizeChange(pagesize) {
      this.data.pagesize = pagesize;
      this.getGoods();
    },
    // 当前页码数改变
    handleCurrentChange(pagenum) {
      this.data.pagenum = pagenum;
      this.getGoods();
    }
  },
  created() {
    // 页面一进来 获取商品列表数据
    this.getGoods();
  }
};
</script>

<style>
</style>
