<template>
  <div class="login">
    <div class="form">
      
    </div>
  </div>
</template>

<script>
export default {};
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
  }
}
</style>

