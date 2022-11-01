<script>
import Vue from "vue/dist/vue.esm";
import { loadLink, loadScript } from "@/utils/util";

export default {
  name: "vueRender",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      uuid: Math.random().toString(32).substr(2),
    };
  },
  render(h) {
    const { templateCode, jsCode, cssCode } = this.option;
    if (!templateCode || !jsCode) {
      return h("div", "暂无数据");
    }
    const regex = /<template>([\s\S]*?)<\/template>/g.exec(templateCode);
    const jsStr = jsCode.replace("export default", "");
    if (!regex) {
      return h("div", "模板不合法");
    }
    let dataJs = {};
    try {
      dataJs = eval("(" + jsStr + ")");
    } catch (err) {
      this.$message.error("js code 格式不正确");
      return false;
    }
    // 批量插入唯一标识
    const cssStr = cssCode.replace(
      /((.[^{^\s]+)+)\s+{/g,
      `.d-code-${this.uuid} $1 {`
    );
    const result = Vue.extend({
      template: regex[1],
      warnHandler: function(err, vm, info) {
        console.log(err, vm, info)
      },
      ...dataJs,
    });
    const innerStyle = () => {
      return h(
        "style",
        {
          attrs: {
            lang: "css",
            scoped: "scoped",
          },
        },
        [cssStr]
      );
    };
    return h("div", { style: { height: this.height + 'px' }, attrs: { class: `d-code-${this.uuid}` }, key: this.uuid }, [
      innerStyle(),
      h(result, { props: { parentClassName: `d-code-${this.uuid}` } }),
    ]);
  },
  created() {
    // 加载额外资源
    const { cssList = [], jsList = [] } = this.option
    cssList.forEach(item => {
      loadLink({
        href: item,
        className: "csspaths"
      })
    })
    jsList.forEach(item => {
      loadScript({
        src: item,
        className: "jspaths"
      })
    })
  }
};
</script>
<style scoped>
</style>