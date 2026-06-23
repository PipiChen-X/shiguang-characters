# Project Instructions

## Project Overview

This repository is for **Shiguang Characters / 拾光群像**, a public-facing virtual character showcase website.

The site is intended for general visitors. It introduces virtual characters through story, music atmosphere, representative works, and visual presentation.

This project is **not** an internal character asset system, not a vocal model archive, and not a technical documentation site.

## Core Direction

The first version of the site should feel like:

- a virtual character music project showcase;
- a public introduction page for fictional / virtual singers;
- cinematic, refined, low-saturation, literary, and modern;
- emotionally warm but not childish;
- artistic but clear enough for general visitors.

The site should **not** feel like:

- an internal asset management dashboard;
- a technical model library;
- a Suno prompt / AI generation rule archive;
- a generic corporate website;
- a heavy anime-style fan wiki.

## Deployment Target

The project should be suitable for **GitHub Pages** deployment.

Use a one-codebase, multi-deployment structure. GitHub Pages is the international preview target, and future mainland China cloud deployment should be able to reuse the same static build output when possible. Avoid hard-coding deployment paths unless a target explicitly requires it.

Use a static front-end approach.

Preferred stack:

- Vite
- React
- JavaScript
- CSS / CSS modules / simple styling approach

Use Vite + React. Prefer JavaScript for the first version unless TypeScript is clearly necessary.

Avoid server-dependent features.

## First Version Scope

The first version only includes four characters:

1. 苏晚诗
2. 苏晴栀
3. 江弈辰
4. 许念安

Do not include 乔曼宁 in the first version.

## Public-Facing Language Rules

Do not expose internal modeling terms on the public website.

Avoid these words or concepts in user-facing pages:

- 音色模型
- 适配边界
- 不适配方向
- 调用规则
- 反向提示词
- 相似度评估
- 生成风险
- Suno 参数
- 资产管理
- 内部正本

Use public-friendly language instead:

- 她 / 他是谁
- 她 / 他给人的感觉
- 她 / 他常唱什么样的歌
- 她 / 他的代表作品
- 可以在哪里听到 / 看到她或他

## Content Source Rule

Character content should be maintained in a dedicated data file, such as:

```text
src/data/characters.js
```

or:

```text
src/data/characters.ts
```

Do not hard-code all character content directly inside page components.

Each character record should support:

- id
- name
- tagline
- intro
- songTypes
- works
- visualMood
- image
- audio
- video

Media fields may be empty in the first version.

## Media Placeholder Rule

The first version does not require real images, audio, videos, or external work links.

If media or links are missing:

- do not create broken links;
- do not render a broken audio player;
- do not render a broken video player;
- do not create buttons that lead to 404 pages;
- show safe placeholder text such as:
  - 即将上线
  - 敬请期待
  - 内容准备中
  - 试听片段即将上线
  - 视频内容准备中

Placeholders should look intentional and designed, not like missing content or broken components.

The page structure should still reserve future areas for:

- character images;
- representative works;
- song preview / audio preview areas;
- video showcase areas.

## Feature Restrictions

Do not add:

- login;
- user accounts;
- backend admin panel;
- database;
- payment;
- comments;
- membership system;
- full music streaming platform;
- full video library;
- complex routing unless necessary;
- server-side API.

The first version should remain static, lightweight, and maintainable.

## Page Structure

The first version should include:

1. Hero section
2. About section
3. Character overview cards
4. Character detail sections
5. Representative works inside character sections
6. Media placeholder areas inside character sections
7. Footer

Single-page anchor navigation is preferred for the first version.

Avoid making the site feel empty by creating large standalone sections with no real content. Representative works and media placeholders can be placed inside each character detail section.

## Character Differentiation

The four characters must feel distinct.

Core public-facing impressions:

- 苏晚诗：夜色、回忆、低声叙述、克制遗憾
- 苏晴栀：日光、柔亮、生活感、轻梦感
- 江弈辰：温暖、明亮、可靠、一起向前
- 许念安：深夜、暖灯、治愈、陪伴

Do not make the four character sections feel like identical cards with only different names.

The layout may be consistent, but each character should have a different atmosphere, wording, and visual mood.

## Build Requirement

After any code change, ensure that the project can build successfully.

Expected commands should be documented in README.md, for example:

```text
npm install
npm run dev
npm run build
```

If deployment requires a specific GitHub Pages base path, document it clearly.

## README Requirement

The project README should explain:

1. project purpose;
2. how to install dependencies;
3. how to run locally;
4. how to build;
5. how to deploy to GitHub Pages;
6. where character data is stored;
7. how to replace placeholder images, audio, video, and work links later.

## Final Principle

Prioritize:

```text
public character appeal
> clear website structure
> future maintainability
> visual refinement
> technical complexity
```

This website should help visitors know and remember the characters, not understand the internal production system.
