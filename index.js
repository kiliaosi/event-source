/*
 * @Author: kiliaosi
 * @Date: 2020-07-21 16:29:32
 * @LastEditors: kiliaosi
 * @LastEditTime: 2020-07-21 17:18:30
 * @Description:
 */

const { Readable, PassThrough } = require("stream");
const Koa = require("koa");
const Router = require("koa-router");
const { start } = require("repl");
const { promises } = require("fs")

const app = new Koa();

const router = new Router();

router.get("/se", (ctx) => {
  const ss = new PassThrough(); 
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"Content-Type"
  });
  ctx.body = ss;
  setInterval(()=>{
    const date = { date: `当前时间：北京时间${new Date().toLocaleTimeString()}` };
    const data = 'event: customEvent\n'+"data:"+JSON.stringify(date)+"" + "\n\n";
      ss.push(data);
  }, 1000)

});

app.use(router.routes());
app.listen(8080, ()=>{
    console.log('server is running')
})
