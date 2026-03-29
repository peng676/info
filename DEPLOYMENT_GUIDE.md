# Vercel 部署指南

## 📋 前提条件

1. 已将代码推送到 GitHub
2. 已在 Vercel 上连接 GitHub 仓库
3. 需要一个云数据库服务（推荐 PlanetScale 或 Supabase）

---

## 🗄️ 方案一：使用 PlanetScale（推荐，免费）

### 1. 注册 PlanetScale

访问：https://planetscale.com/

### 2. 创建数据库

1. 点击 "New Database"
2. 选择免费计划
3. 选择离您最近的区域
4. 数据库名称：`guestbook`

### 3. 获取连接信息

1. 进入数据库
2. 点击 "Connect"
3. 选择 "General" → "Node.js"
4. 复制连接字符串（格式类似：`mysql://user:password@host/database`）

### 4. 配置 Vercel 环境变量

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加以下变量：

```
MYSQL_HOST=your-planetscale-host
MYSQL_PORT=3306
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=guestbook
```

4. 点击 "Save"

### 5. 重新部署

在 Vercel 中点击 "Redeploy"

---

## 🗄️ 方案二：使用 Supabase（免费，PostgreSQL）

### 1. 注册 Supabase

访问：https://supabase.com/

### 2. 创建项目

1. 点击 "New Project"
2. 填写项目信息
3. 等待项目创建完成（约2分钟）

### 3. 获取连接信息

1. 进入项目
2. 点击 "Settings" → "Database"
3. 找到 "Connection String"
4. 选择 "Node.js" 模式

### 4. 配置 Vercel 环境变量

添加以下变量：

```
MYSQL_HOST=your-supabase-host
MYSQL_PORT=5432
MYSQL_USER=postgres
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=postgres
```

注意：Supabase 使用 PostgreSQL，我们的代码已兼容。

---

## 🚀 部署步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 推送到 GitHub

```bash
git add .
git commit -m "Add Vercel Serverless Functions"
git push
```

### 3. Vercel 自动部署

Vercel 会自动检测到新的提交并开始部署。

### 4. 验证部署

访问您的 Vercel 域名，测试留言功能。

---

## 🔧 本地开发

本地开发时，继续使用您的本地 MySQL：

```bash
# 启动后端
npm run server

# 启动前端
npm run dev
```

---

## 📝 注意事项

1. **环境变量**：Vercel 环境变量需要重新部署后才生效
2. **SSL连接**：云数据库通常需要 SSL 连接，代码已配置
3. **回退机制**：如果数据库连接失败，会使用演示数据
4. **免费额度**：PlanetScale 和 Supabase 都有 generous 免费额度

---

## ❓ 常见问题

### Q: 部署后还是显示"网络错误"？

A: 检查：
1. 环境变量是否正确配置
2. 是否重新部署了
3. 浏览器控制台的错误信息

### Q: 如何查看 Serverless Functions 日志？

A: 在 Vercel 项目中：
1. 点击 "Functions"
2. 选择 `/api/messages`
3. 查看实时日志

### Q: 可以使用其他云数据库吗？

A: 可以！只要支持 MySQL 或 PostgreSQL 协议都可以，比如：
- Aiven MySQL
- TiDB Cloud
- AWS RDS
- Google Cloud SQL
