# 项目全局架构指南 (Architecture)

## 1. 项目概述
本项目是一个基于“新粗野主义”风格的个人多功能数字作品集网站。
主要目标：展示个人作品、文章、提供音乐播放体验以及简单的访客互动（留言板）。

## 2. 技术栈
- **核心框架**: React 19 + TypeScript
- **构建工具**: Vite v6
- **样式引擎**: Tailwind CSS v4 (Oxide Engine)
- **动效库**: Framer Motion (`motion/react`)
- **图标库**: Lucide React
- **部署平台**: Vercel

## 3. 目录结构规范
项目遵循 Feature-Sliced (按功能划分) 的简化版原则。未来的扩展应当遵循以下结构：

```text
/src
  /assets        # 静态资源 (图片、全局 CSS 等)
  /components    # 全局复用的 UI 组件 (按钮、弹窗等)
  /features      # 按业务划分的模块 (如文章、作品、留言板)
  /hooks         # 自定义 Hooks
  /types         # 全局 TypeScript 类型定义
  App.tsx        # 根组件及路由(状态)管理
  main.tsx       # 挂载点
/docs            # AI 辅助开发文档集
/public          # 绝对路径静态资源 (如 /music)
```

## 4. 状态管理策略
- **局部 UI 状态**: 使用 `useState` (如弹窗的开关、当前选中的 Tab)。
- **持久化状态**: 使用 `localStorage` 配合 `useEffect` (如更换后的作品图片、留言板数据)。
- **DOM 引用**: 涉及到实际音频播放控制等，使用标准 DOM API (`getElementById`) 结合 React 生命周期。

## 5. 开发工作流 (AI 协作规范)
1. **需求分析**: 任何新需求必须先在 `docs` 目录中找到对应模块文档，或创建新文档。
2. **文档先行**: 更新文档中的“待办事项”或“接口契约”。
3. **Prompt 注入**: 在让 AI 编写代码前，必须引用对应的文档。例如：“请参考 `docs/01_components.md` 中的 Navbar 规范，为我新增一个语言切换按钮”。
4. **代码实现**: AI 仅修改当前讨论的单一模块。
5. **构建验证**: 每次修改后必须运行 `npm run lint` 和 `npm run build`。
