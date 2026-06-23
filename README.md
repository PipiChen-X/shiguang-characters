# 拾光群像

「拾光群像」是一个面向大众的虚拟人物音乐企划展示页，用于介绍以音乐、影像和故事逐渐生长的虚拟人物。第一版采用静态前端实现，当前 GitHub Pages 作为国际访问 / 第一版预览站；未来同一份代码和构建产物也可以部署到中国大陆云服务，作为大陆普通用户的稳定访问站。

## 第一版范围

第一版只展示四位人物：

- 苏晚诗
- 苏晴栀
- 江弈辰
- 许念安

页面不包含登录、后台、数据库、评论、会员系统，也不提供完整音乐流媒体或视频库。当前图片、试听片段、视频和作品链接均使用安全占位，不会生成空链接、404 链接或损坏播放器。

## 技术栈

- Vite
- React
- JavaScript
- CSS

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

启动后，根据终端输出访问本地开发地址，通常为 `http://localhost:5173/`。

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

## 部署

### GitHub Pages：国际预览部署

本仓库包含 GitHub Actions 自动部署配置：

```text
.github/workflows/deploy.yml
```

当 `main` 分支收到 push 时，workflow 会自动执行：

```bash
npm install
npm run build
```

随后将 `dist/` 作为 GitHub Pages 部署产物上传并发布。该 workflow 也支持在 GitHub Actions 页面通过 `workflow_dispatch` 手动触发。

GitHub 仓库的 Pages 设置建议选择：

```text
Settings → Pages → Build and deployment → Source: GitHub Actions
```

如果仓库作为项目站点部署，预期访问地址通常为：

```text
https://<用户名>.github.io/shiguang-characters/
```

如果仓库是用户或组织站点（例如 `<用户名>.github.io`），预期访问地址通常为：

```text
https://<用户名>.github.io/
```

### 多地部署兼容说明

当前 `vite.config.js` 使用：

```js
base: './'
```

这会让构建后的静态资源使用相对路径，避免把站点写死到 GitHub Pages 的 `/shiguang-characters/` 子路径。这样更适合“一份代码，多地部署”：同一份 `dist/` 既可以发布到 GitHub Pages 作为国际预览站，也可以在未来上传到中国大陆云服务的静态站点、对象存储或 CDN。

未来部署到中国大陆云服务时，通常复用以下内容即可：

- 源码与配置：`src/`、`public/`、`index.html`、`vite.config.js`、`package.json`；
- 构建命令：`npm install`、`npm run build`；
- 静态构建产物：`dist/`。

## 人物数据位置

人物资料统一维护在：

```text
src/data/characters.js
```

每个人物记录包含：

- `id`
- `name`
- `tagline`
- `intro`
- `songTypes`
- `works`
- `visualMood`
- `image`
- `audio`
- `video`

## 后续替换图片、试听片段和视频

1. 将真实素材放入 `public/` 目录，例如：
   - `public/images/su-wanshi.jpg`
   - `public/audio/su-wanshi-preview.mp3`
   - `public/video/su-wanshi-showcase.mp4`
2. 在 `src/data/characters.js` 中填入对应路径，例如：

```js
{
  image: './images/su-wanshi.jpg',
  audio: './audio/su-wanshi-preview.mp3',
  video: './video/su-wanshi-showcase.mp4',
}
```

3. 如果代表作品有真实外部链接，可在 `works` 中扩展链接字段，并同步更新页面渲染逻辑。没有真实链接时，请继续保留当前占位文案，避免空链接或 404。

## 内容维护原则

页面面向普通访问者介绍虚拟人物，不展示内部制作参数、生成规则或技术说明。后续扩展时，应优先保证人物气质清楚、页面稳定、素材入口安全。
