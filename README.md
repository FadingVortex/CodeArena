# CodeArena

> 一个基于 Vue 的刷题管理系统，支持 Markdown 编辑、PDF 上传、JWT 身份验证和增删改查操作，主题颜色切换，登录注册等功能。

## 功能概览

- **Markdown 编辑器**
	使用 [Editor.md](https://pandao.github.io/editor.md/) 实现实时 Markdown 题目编辑和预览，提供丰富的工具栏支持，便于编写题目内容。

- **JWT 身份验证**

	- 登录后从后端获取 `token`，实现用户会话管理。
	- `token` 超时自动失效，确保安全性。
	- 后端代码仓库：[CodeArena-backend](https://github.com/FadingVortex/CodeArena-backend)。

- **PDF 上传与实时显示**

	- 支持拖拽上传 PDF 文件，实时显示内容。
	- 点击保存后将 PDF 转换为字符串存储到数据库中。

- **增删改查功能**

	- 数据库设计以题目为核心，基本表结构如下：

		```javascript
		const formData = ref({
		  id: '',        // 题号
		  LMC: '',       // 分区
		  title: '',     // 题目标题
		  content: '',   // 内容详情
		  pdfString: '', // PDF 内容字符串
		});
		```

	- 其他表格用于支持更多数据管理，项目中提供数据备份功能。

- **主题切换**

	- 多种颜色主题方案可供切换，提升用户体验。

<p align="center">   <img src="src\assets\Fresh-Mint.png" alt="Fresh-Mint" width="400"/>   <img src="src\assets\Warm-Apricot.png" alt="Warm-Apricot" width="400"/>   <img src="src\assets\Calm-Blue.png" alt="Calm-Blue" width="400"/> <img src="src\assets\Elegant-Lavender.png" alt="Elegant-Lavender" width="400"/> <img src="src\assets\Warm-Earth.png" alt="Warm-Earth" width="400"/> </p>

## 技术栈

### 前端

- 框架：Vue 3 + Vite

- 主要依赖：

	```json
	"dependencies": {
	  "axios": "^1.7.7",
	  "editor.md": "^1.5.0",
	  "element-plus": "^2.8.1",
	  "jquery": "^3.7.1",
	  "mockjs": "^1.1.0",
	  "pdfjs-dist": "^4.10.38",
	  "scriptjs": "^2.5.9",
	  "vue": "^3.4.37",
	  "vue-router": "^4.5.0",
	  "vuex": "^4.0.2",
	  "zepto": "^1.2.0"
	}
	```

- 开发工具依赖：

	```json
	"devDependencies": {
	  "@vitejs/plugin-vue": "^5.1.2",
	  "unplugin-auto-import": "^0.18.2",
	  "unplugin-vue-components": "^0.27.4",
	  "vite": "^5.4.1"
	}
	```

### 后端

- 使用 **Spring Boot** 编写后端服务。
- 数据库：MySQL。

## 项目结构

```csharp
CodeArena/
├── src/
│   ├── assets/
│   │   └── theme/         # 自定义多种颜色主题
│   ├── axios/             # 封装的请求相关模块
│   ├── components/        # 复用组件，包括 Editor.vue 等
│   ├── plugins/           # 插件代码，如 editor.js
│   ├── store/             # Vuex 状态管理
│   ├── views/             # 页面文件
│   ├── router/            # 路由定义
│   └── App.vue            # 主入口组件
├── public/                # 静态资源文件夹
├── package.json           # 项目依赖与脚本
└── README.md              # 项目说明
```

## 安装与运行

### 前端环境搭建

1. 克隆前端代码：

	```bash
	git clone https://github.com/FadingVortex/CodeArena.git
	cd CodeArena
	```

2. 安装依赖：

	```bash
	npm install
	```

3. 启动开发服务器：

	```bash
	npm run dev
	```

### 后端环境搭建

1. 克隆后端代码：

	```bash
	git clone https://github.com/FadingVortex/CodeArena-backend.git
	```

2. 配置数据库连接：

	- 修改 `application.yml` 文件中的数据库配置。

3. 启动后端服务：

	- 使用 IDE（如 IntelliJ IDEA）运行 Spring Boot 项目。

### 数据库初始化

1. 创建 MySQL 数据库。
2. 导入 SQL 脚本（如 `database/backup.sql`）以初始化表结构和基础数据。

## 使用截图

### Markdown 编辑器

![](src/assets/editor.png)

### PDF 拖拽上传

![](src/assets/pdf.png)

### 数据管理

![](src/assets/data.png)

### 权限管理

![](src/assets/token.png)

### 登录界面

![](src/assets/loginview.png)


## 贡献指南

欢迎为 CodeArena 贡献代码！以下是参与步骤：

1. Fork 本仓库。

2. 创建新分支：

	```bash
	git checkout -b feature/your_new_feature
	```

3. 提交代码：

	```bash
	git commit -m "describe your feature"
	```

4. 推送到你的仓库：

	```bash
	git push origin feature/your_new_feature
	```

5. 提交 Pull Request。

## 许可证

本项目采用 MIT License。详细信息请参阅许可证文件。