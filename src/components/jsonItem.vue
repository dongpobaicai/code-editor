<template>
  <el-form-item :label="item.label">
    <avue-input v-if="item.type === 'input'" @input="onInput" />
  </el-form-item>
</template>

<script>
export default {
  name: "JsonItem",
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    onInput(current) {
      this.$emit('change', current)
    }
  }
};
</script>

<style></style>
