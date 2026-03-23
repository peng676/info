# 巨无霸电商平台 (MegaMall) - 核心架构与 AI 开发指南

## 1. 项目愿景
本项目是一个面向 C 端用户的全品类电商平台。包含商品浏览、购物车、订单结算、支付回调、用户中心等核心模块。
为了应对高并发和复杂的业务逻辑，前端采用 Next.js (App Router) 进行服务端渲染 (SSR)，后端采用微服务架构。

## 2. 技术栈选型
- **框架**: Next.js 14 (React 18, Server Components)
- **语言**: TypeScript (严格模式)
- **状态管理**: 
  - 全局 UI 状态: Zustand
  - 服务端状态/缓存: React Query (TanStack Query)
- **样式**: Tailwind CSS + Shadcn UI
- **表单与校验**: React Hook Form + Zod
- **支付集成**: Stripe API / WeChat Pay API
- **监控与埋点**: Sentry

## 3. 目录结构规范 (Feature-Sliced Design)
大型项目严禁将所有组件堆在 `components` 目录下。必须按业务领域划分：

```text
/src
  /app                   # Next.js 路由层 (页面入口)
    /(shop)/[productId]  # 商品详情页
    /cart                # 购物车页
    /checkout            # 结算页
  /entities              # 核心业务实体 (独立于 UI)
    /product             # 商品相关 (类型、通用格式化工具)
    /order               # 订单相关
  /features              # 具体业务功能 (包含 UI 和 逻辑)
    /AddToCartButton     # 加入购物车按钮 (含请求逻辑)
    /ProductFilter       # 商品筛选器
  /shared                # 全局共享基建
    /api                 # Axios 实例与拦截器
    /ui                  # 纯 UI 组件 (Button, Modal, Input)
    /utils               # 日期、货币格式化工具
```

## 4. 数据流与状态管理契约

### 4.1 购物车状态 (Cart State)
- **原则**: 购物车数据必须与服务端保持最终一致性，但前端需实现“乐观更新 (Optimistic UI)”。
- **流转**: 
  1. 用户点击“加入购物车” -> Zustand 立即更新本地状态，右上角徽标 +1。
  2. 异步发送 `POST /api/v1/cart`。
  3. 若请求失败 -> Zustand 回滚状态，弹出 Toast 错误提示。

### 4.2 鉴权机制 (Auth)
- 采用 JWT (JSON Web Token) 机制。
- Access Token 存在内存中，Refresh Token 存在 `HttpOnly Cookie` 中防 XSS 攻击。
- `shared/api/axios.ts` 中必须实现请求拦截器，在 Token 过期时自动调用刷新接口。

## 5. AI 辅助开发 (Cursor/Trae) 注入规范

**当分配任务给 AI 时，必须在 Prompt 中附带以下上下文指令：**

### 模块 A：开发“商品详情页”
> **Prompt 示例**: "请开发商品详情页。参考 `docs/ecommerce_arch.md`。
> 1. 页面放在 `app/(shop)/[productId]/page.tsx`。
> 2. 使用 Server Components 抓取商品基础数据以利于 SEO。
> 3. 价格和库存等动态数据，抽离成 Client Component 并使用 React Query 轮询。
> 4. UI 组件只能从 `shared/ui` 中引入。"

### 模块 B：开发“结算表单”
> **Prompt 示例**: "请开发订单结算表单。
> 1. 位于 `features/CheckoutForm`。
> 2. 必须使用 `React Hook Form` 配合 `Zod` 进行验证。
> 3. 字段包括：收货地址、联系电话（需正则校验）、支付方式。
> 4. 提交时需展示全屏 Loading 遮罩。"

## 6. 性能与安全红线 (AI 必须遵守)
1. **禁止**在 Client Components 中直接使用敏感环境变量 (如 `process.env.STRIPE_SECRET_KEY`)，必须放在 Server 端。
2. 任何图片必须使用 Next.js 的 `<Image>` 组件，并配置 `sizes` 属性以优化 LCP。
3. 货币计算必须使用专门的库（如 `dinero.js`）或在后端完成，前端严禁直接用浮点数相加减（避免 `0.1 + 0.2 !== 0.3` 问题）。