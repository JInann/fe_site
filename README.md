# qt-mass2

## 启动

```bash
npm run dev
```

## 类型检查

```bash
npm run lint
```

## 打包

```bash
npm run pre 
npm run build
```

## 发布

```bash
npm run deploy
# 或者
gitlab > CI/CD > 运行流水线 > 选择分支 > 设置变量VITE_ENTRY=要发布的页面
```


## 文件目录

```
/dist #线上打包
	-page1
	-page2
		-assets
			page2[hash].js
			img.png
			...
		index.html
		favicon.ico
/pre #测试打包
	...
/public #公共文件
/src
	-assets #公共资源
		BddBridgeUtil.js
		SL-es.ts
	-pages
		-page1
			index.html #必须
			main.ts #必须
		-page2
			-dirName1 #自定义目录
			-dirName2
			index.html
			main.ts
	BddBridgeUtil.d.ts #步多多协议类型描述文件
	env.d.ts #环境类型描述文件
.env
.env.development
.env.pre
.env.production
deploy.js #发布脚本
vite.config.ts #打包配置 
```

# Vue 3 + Typescript + Vite + VueRouter + Pinia

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.