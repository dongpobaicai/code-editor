<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="css">
html, body {
  margin: 0;
  padding: 0;
}
.container {
  padding: 40px;;
  background-color: rgb(36, 36, 53);
}
</style>
