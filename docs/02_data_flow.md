# 数据流与 API 规范 (Data Flow & API)

## 1. 静态数据管理
由于这是一个纯前端为主的作品集项目，大部分数据（如文章列表、产品列表、播放列表）直接硬编码在各个组件的局部作用域中。
- **优点**: 加载极快，无需等待网络请求，SEO 友好。
- **扩展建议**: 若未来数据量变大，应抽取至单独的 `/src/data/*.ts` 文件中。

## 2. 本地持久化存储 (LocalStorage)
目前项目有两处依赖 `localStorage` 进行状态持久化：

### 2.1 作品图片自定义替换 (`worksCustomImages`)
- **存储结构**: `Record<number, string>` (索引 -> 图片 URL/Base64)
- **流程**: 
  1. 用户上传图片 -> `FileReader` 读取为 Base64。
  2. 调用本地/Vercel 代理接口尝试保存。
  3. 成功或失败都会更新组件状态，并同步写入 `localStorage`。
  4. 页面刷新时优先从 `localStorage` 读取。

### 2.2 留言板数据 (`shuo_guestbook`)
- **存储结构**: `Array<{id: number, name: string, content: string, date: string}>`
- **流程**: 
  1. 表单提交构建新对象，插入数组头部。
  2. 同步写入 `localStorage`。

## 3. 外部 API 交互

### 3.1 图片上传代理接口 (Serverless)
- **Endpoint**: `/api/upload/works/:idx`
- **Method**: `POST`
- **Payload**: `{ dataUrl: "base64_string" }`
- **说明**: 生产环境通过 Vercel Serverless Function 处理，开发环境通过 `server.ts` 和 Vite Proxy 转发到本地文件系统。

### 3.2 访客统计 API (CounterAPI)
- **Endpoint**: `https://api.counterapi.dev/v1/shuo_portfolio/visits/up`
- **Method**: `GET` (隐式触发计数增加)
- **处理机制**: 在 `SiteFooter` 组件挂载时触发，若请求失败则优雅降级（Fallback）显示预设的静态数字 `1337`。