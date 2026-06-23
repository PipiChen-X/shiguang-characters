# 拾光群像

「拾光群像」是一个面向大众的虚拟人物音乐企划展示页，用于介绍以音乐、影像和故事逐渐生长的虚拟人物。第一版采用静态前端实现，适合部署到 GitHub Pages。

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

## 部署到 GitHub Pages

### 方式一：部署到用户或组织站点

如果仓库名是 `<用户名>.github.io`，通常无需修改 Vite 配置，直接部署 `dist/` 即可。

### 方式二：部署到项目站点

如果仓库作为项目站点部署，例如访问路径为：

```text
https://<用户名>.github.io/shiguang-characters/
```

请在需要时新增或调整 `vite.config.js`，设置：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/shiguang-characters/',
})
```

随后运行：

```bash
npm run build
```

并将 `dist/` 目录作为 GitHub Pages 的发布内容。也可以使用 GitHub Actions 在每次推送后自动构建并发布 `dist/`。

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
  image: '/images/su-wanshi.jpg',
  audio: '/audio/su-wanshi-preview.mp3',
  video: '/video/su-wanshi-showcase.mp4',
}
```

3. 如果代表作品有真实外部链接，可在 `works` 中扩展链接字段，并同步更新页面渲染逻辑。没有真实链接时，请继续保留当前占位文案，避免空链接或 404。

## 内容维护原则

页面面向普通访问者介绍虚拟人物，不展示内部制作参数、生成规则或技术说明。后续扩展时，应优先保证人物气质清楚、页面稳定、素材入口安全。
