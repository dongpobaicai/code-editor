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
    <el-row>
      <el-col :span="8">
        <el-tree :data="fileTree"></el-tree>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
  </div>
</template>

<script>
import JsonItem from "./components/jsonItem";

export default {
  name: "App",
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
      fileTree: [
        {
          label: "json-options",
          type: "folder",
          children: [
            {
              label: "public",
              type: "folder",
              children: [
                {
                  label: "favicon.ico",
                  type: "img",
                },
                {
                  label: "index.html",
                  type: "html",
                },
              ],
            },
            {
              label: "src",
              type: "folder",
              children: [
                {
                  label: "components",
                  type: "folder",
                  children: [
                    {
                      label: "jsonItem.vue",
                      type: "html",
                    },
                  ],
                },
                {
                  label: "App.vue",
                  type: "html",
                },
                {
                  label: "main.js",
                  type: "js",
                },
              ],
            },
            {
              label: "package.json",
              type: "json",
            },
          ],
        },
      ],
      fileProps: {
        children: "children",
        label: "label",
      },
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

<style>
body {
  background-color: black;
}

.config-form {
  width: 500px;
  margin: 50px auto 0;
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
