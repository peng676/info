# UI 组件与模块规范 (Components & Modules)

## 1. 设计语言 (Neo-Brutalism)
所有新开发的组件必须遵循以下视觉规范：
- **边框**: 纯黑，粗边框 (`border-4 border-black`)
- **阴影**: 无模糊半径的实体阴影 (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- **颜色**: 仅使用高饱和度品牌色（`bg-brand-yellow`, `bg-brand-pink`, `bg-brand-blue`）或黑白灰。
- **排版**: 字体加粗 (`font-black`), 英文强制大写 (`uppercase`)。
- **交互反馈**: 点击时阴影消失并产生位移 (`active:translate-x-1 active:translate-y-1 active:shadow-none`)。

## 2. 核心模块划分

### 2.1 导航模块 (Navigation)
- **位置**: `src/App.tsx -> <nav>`
- **状态**: 依赖根组件的 `activeTab` 状态。
- **响应式**: 桌面端居中显示，移动端隐藏部分文本并支持横向滚动 (`hide-scrollbar`)。

### 2.2 音乐播放器模块 (MusicPlayer)
- **位置**: 全局右下角悬浮 (`z-[90]`)。
- **职责**: 管理 `HTMLAudioElement` 的播放状态，维护播放列表索引。
- **动效**: 播放时图标旋转 (`animate-[spin_4s_linear_infinite]`)，点击时宽度展开显示歌曲信息 (`Framer Motion layout`)。

### 2.3 内容展示区块 (Sections)
- **HomeSection**: 主页个人简介与联系入口。
- **AboutSection**: 履历与技能点。
- **ArticlesSection**: 文章列表与全屏阅读弹窗 (Prose 排版)。
- **WorksSection**: 作品画廊，包含本地图片替换逻辑与 Lightbox 放大功能。
- **GuestbookSection**: 留言板表单与列表渲染。

### 3. 组件开发原则
- **单一职责**: 一个组件只做一件事。例如 `EmailModal` 只负责展示联系方式和复制功能。
- **属性传递**: 父组件向下传递状态和回调函数（如 `setShowEmailModal`），子组件内部不应直接修改父组件状态。