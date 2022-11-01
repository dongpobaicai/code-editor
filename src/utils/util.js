
/**
 * 动态添加css
 * @param {*} attrs
 */
 export const loadLink = (attrs = {}) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");

  attrs = Object.assign({ rel: "stylesheet" }, attrs);
  const keys = Object.keys(attrs);
  for (let i = 0; i < keys.length; i++) {
    link[keys[i]] = attrs[keys[i]];
  }
  // 添加到
  head.appendChild(link);
};

/**
 * 加载脚本资源
 * @param {*} attrs
 */
export const loadScript = (attrs = {}) => {
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  attrs = Object.assign({ type: "text/javascript", async: "async" }, attrs);
  const keys = Object.keys(attrs);
  for (let i = 0; i < keys.length; i++) {
    script[keys[i]] = attrs[keys[i]];
  }
  // 添加到
  head.appendChild(script);
};