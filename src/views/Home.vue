<template>
  <div class="home">
    <router-link class="menu-item" to="/code">项目编辑器</router-link>
    <router-link class="menu-item" to="/vue">vue编辑器</router-link>
    <router-link class="menu-item" to="/form">表单生成器</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.menu-item {
  margin-right: 20px;
  color: #fff;
}
</style>
