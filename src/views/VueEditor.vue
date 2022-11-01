<template>
  <el-row class="d-custom">
    <el-col :span="18">
      <el-row class="d-custom-editor" :gutter="12">
        <el-col :span="8">
          <div class="d-custom-editor-code-title">template</div>
          <div class="d-custom-editor-content">
            <monaco-editor language="html" v-model="templateCode"></monaco-editor>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-custom-editor-code-title">js</div>
          <div class="d-custom-editor-content">
            <monaco-editor language="javascript" v-model="jsCode"></monaco-editor>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="d-custom-editor-code-title">css</div>
          <div class="d-custom-editor-content">
            <monaco-editor language="scss" v-model="cssCode"></monaco-editor>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" class="d-custom-render">
      <vue-render :option="option"></vue-render>
    </el-col>
    <el-button class="run-btn" type="primary" @click="refreshCode">运行</el-button>
  </el-row>
</template>
<script>
import MonacoEditor from "@/components/monaco-editor";
import vueRender from "@/components/vueRender";

export default {
  components: {
    MonacoEditor,
    vueRender,
  },
  data() {
    return {
      templateCode: "<template>\n<div>{{ message }}</div>\n</template>",
      jsCode: "export default { \ndata() { return { message: '我是' }\n}\n}",
      cssCode: "",
      option: {
        templateCode: "<template>\n<div>{{ message }}</div>\n</template>",
        jsCode: "export default { \ndata() { return { message: '我是' }\n}\n}",
        cssCode: "",
      },
    };
  },
  methods: {
    refreshCode() {
      this.option.templateCode = this.templateCode;
      this.option.jsCode = this.jsCode;
      this.option.cssCode = this.cssCode;
    },
  },
};
</script>
<style scoped>
.d-custom {
  position: relative;
}
.run-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}
.d-custom-editor {
  color: #2c3e50;
  background-color: #282c34;
}
.d-custom-editor-content {
  height: calc(100vh - 110px);
}
.d-custom-editor-code-title {
  background: #191c20;
  line-height: 28px;
  padding-left: 10px;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 1px 1px #000000;
  font-style: italic;
}
.d-custom-render {
  background-color: #fff;
  text-align: center;
  height: calc(100vh - 80px);
}
</style>
