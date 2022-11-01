const Koa = require("koa2");
const Router = require("koa-router");
const koaBody = require("koa-body");
const path = require("path");
const fs = require("fs");
const app = new Koa();
const router = new Router();

router.get("/getFile/byName", (ctx) => {
  const { filename } = ctx.query;
  const fileUrl = path.join(__dirname, `../${filename}`);
  // 处理响应
  ctx.set("Content-Type", "application/json");

  if (fs.existsSync(fileUrl)) {
    const data = fs.readFileSync(fileUrl)
    ctx.body = JSON.stringify({
      code: 200,
      isExist: true,
      result: data.toString(),
      message: "请求成功",
    });
    return;
  }
  ctx.body = JSON.stringify({
    code: 200,
    isExist: false,
    result: null,
    message: "请求成功",
  });
});

// router.post("/mergeChunks", koaBody(), async (ctx) => {
//   const { filename, size } = ctx.request.body;
//   // 合并 chunks
//   await mergeFileChunk(path.join(outputPath, "_" + filename), filename, size);

//   // 处理响应
//   ctx.set("Content-Type", "application/json");
//   ctx.body = JSON.stringify({
//     data: {
//       code: 200,
//       filename,
//       size,
//     },
//     message: "merge chunks successful！",
//   });
// });

app.use(router.routes()).use(router.allowedMethods());
app.listen(8009);
console.info("app server listen at 8009");
