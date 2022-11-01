<template>
  <div>
    <el-row>
      <el-col :span="6" class="left-file-tree">
        <div class="tree-header">
          <span>项目</span>
          <span v-if="showIcon"  class="document-icon">
            <i class="el-icon-folder-add" />
            <i class="el-icon-document-add" />
          </span>
        </div>
        <el-tree :data="fileTree" default-expand-all :render-content="renderContent" @node-click="onNodeClick"></el-tree>
      </el-col>
      <el-col :span="18" class="code-editor">
        <monaco-editor v-model="fileCode" :language="language" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MonacoEditor from '../components/monaco-editor'
import { getFileByName } from '@/api/common'

export default {
  name: "CodeEdit",
  components: {
    MonacoEditor
  },
  data() {
    return {
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
                  label: "index.html",
                  type: "html",
                  path: 'public/index.html'
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
                      path: 'src/components/jsonItem.vue'
                    },
                    {
                      label: "monaco-editor.js",
                      type: "javascript",
                      path: 'src/components/monaco-editor.js'
                    },
                    {
                      label: "vueRender.vue",
                      type: "html",
                      path: 'src/components/vueRender.vue'
                    },
                  ],
                },
                {
                  label: "App.vue",
                  type: "html",
                  path: 'src/App.vue'
                },
                {
                  label: "main.js",
                  type: "javascript",
                  path: 'src/main.js'
                },
              ],
            },
            {
              label: "package.json",
              type: "json",
              path: 'package.json'
            },
          ],
        },
      ],
      fileProps: {
        children: "children",
        label: "label",
      },
      showIcon: false,
      fileCode: '请选择左侧文件目录',
      language: 'plaintext'
    };
  },
  methods: {
    renderContent(h, { node, data }) {
      let nodeIcon = null;
      switch (data.type) {
        case "folder":
          nodeIcon = <i class="node-icon el-icon-folder" />;
          break;
        case "html":
          nodeIcon = <i class="node-icon el-icon-document" />;
          break;
        case "javascript":
          nodeIcon = <i class="node-icon el-icon-document" />;
          break;
        case "json":
          nodeIcon = <i class="node-icon el-icon-document" />;
          break;
      }
      return (
        <span class="custom-tree-node">
          <div class="node-left">
            {nodeIcon}
            <span>{node.label}</span>
          </div>
          <el-button size="mini" type="text" icon="el-icon-delete" on-click={(e) => this.removeNode(node, data, e)}></el-button>
        </span>
      );
    },
    removeNode(node, data, e) {
      e.stopPropagation()
      this.$message.success('删除文件')
    },
    onNodeClick(node) {
      this.showIcon = true
      if (node.type === 'folder') {
        return
      }
      getFileByName({ filename: node.path }).then(res => {
        if (res.isExist) {
          this.fileCode = res.result
          this.language = node.type
        }
      }).catch(() => {
        this.$message.error('请运行后端服务接口')
      })
    }
  },
};
</script>

<style lang="css" scoped>
.left-file-tree {
  background-color: rgb(3, 3, 7);
  padding: 0 0 20px;
}
.left-file-tree ::v-deep .el-tree {
  background-color: rgb(3, 3, 7);
}
.left-file-tree ::v-deep .custom-tree-node {
  color: #fff;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
}
.left-file-tree ::v-deep .custom-tree-node .node-left {
}
.left-file-tree ::v-deep .custom-tree-node .node-left .node-icon {
  margin-right: 8px;
}
.left-file-tree ::v-deep .custom-tree-node .el-icon-delete {
  display: none;
  color: rgb(113, 253, 246);
  font-size: 18px;
}
.left-file-tree ::v-deep .el-tree-node > .el-tree-node__content:hover {
  background-color: rgba(48, 105, 102, 0.5);
}
.left-file-tree ::v-deep .el-tree-node > .el-tree-node__content {
  background-color: transparent;
}
.left-file-tree ::v-deep .el-tree-node > .el-tree-node__content:hover .el-icon-delete {
  display: block;
}
.left-file-tree ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(48, 105, 102);
  color: #fff;
}
.left-file-tree ::v-deep .el-tree-node.is-current > .el-tree-node__content .el-icon-delete {
  display: block;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 20px;
  height: 40px;
}
.document-icon i {
  margin-left: 10px;
  cursor: pointer;
  font-size: 18px;
}
.code-editor {
  height: calc(100vh - 80px);
}
</style>
