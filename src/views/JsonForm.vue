<template>
  <div>
    <el-form ref="form" :model="formData" label-position="left" label-width="80px" class="config-form">
      <el-collapse accordion>
        <template v-for="config in configs">
          <el-collapse-item v-if="config.type === 'array'" :title="config.label" :key="config.prop">
            <json-item
              v-for="subItem in config.children"
              :key="subItem.prop"
              :item="subItem"
              @change="(val) => changeItem(subItem.prop, val)"
            />
          </el-collapse-item>
          <json-item v-else :key="config.prop" :item="config" @change="(val) => changeItem(config.prop, val)" />
        </template>
      </el-collapse>
      <el-button type="primary" style="margin-top: 10px" @click="onSave">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import JsonItem from "../components/jsonItem";

export default {
  name: "JsonForm",
  components: {
    JsonItem,
  },
  data() {
    return {
      formData: {},
      configs: [
        {
          label: "输入框",
          prop: "input",
          type: "input",
        },
        {
          label: "数值",
          prop: "showLabel",
          type: "array",
          children: [
            {
              label: "名称",
              prop: "name",
              type: "input",
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeItem(prop, val) {
      this.formData[prop] = val;
    },
    onSave() {
      console.log("this.formData", this.formData);
    },
  },
};
</script>

<style lang="css" scoped>
.config-form {
  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  padding: 20px 30px 20px 20px;
}
.config-form .el-collapse {
  border-top: none;
}
.el-collapse-item__header {
  position: relative;
  padding-left: 30px;
}
.el-collapse-item__header .el-collapse-item__arrow {
  position: absolute;
  left: 10px;
}
.el-form--label-left .el-form-item__label {
  padding-left: 16px;
}
</style>
