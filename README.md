# DeepWiki Jumper

## 简介

DeepWiki Jumper 是一个浏览器扩展，旨在帮助用户在 GitHub 和 DeepWiki 页面之间快速跳转。无论您是在 GitHub 上浏览代码，还是在 DeepWiki 上查阅文档，这个扩展都能提供一个便捷的浮动按钮，让您一键切换到对应平台的页面。

## 功能

- **快速跳转**: 在 GitHub 页面显示“跳转到 DeepWiki”按钮，在 DeepWiki 页面显示“跳转到 GitHub”按钮。
- **智能匹配**: 尝试根据当前页面的 URL 智能匹配并跳转到 DeepWiki 或 GitHub 上的对应仓库或页面。
- **直观的用户界面**: 浮动按钮设计简洁，易于识别和使用。

## 安装

由于这是一个浏览器扩展，您需要手动加载它到您的浏览器中。

### Chrome 浏览器

1.  下载或克隆此仓库到您的本地计算机。
2.  打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` 并回车，或者点击菜单图标（三个点）-> 更多工具 -> 扩展程序。
3.  打开右上角的“开发者模式”开关。
4.  点击“加载已解压的扩展程序”按钮。
5.  选择您下载或克隆的 `DeepWikiJump` 文件夹。
6.  扩展程序将会被加载并显示在您的扩展程序列表中。

## 使用方法

安装完成后，当您访问以下网站时，浮动按钮会自动出现在页面的右下角：

-   `https://github.com/*/*` (任何 GitHub 仓库页面)
-   `https://deepwiki.com/*/*` (任何 DeepWiki 页面)
-   `https://deepwiki.com/search*` (DeepWiki 搜索结果页面)

-   **在 GitHub 页面**: 点击浮动按钮，将跳转到对应的 DeepWiki 页面。
-   **在 DeepWiki 页面**: 点击浮动按钮，将尝试跳转到对应的 GitHub 仓库页面。

## 开发

如果您想对这个扩展进行开发或修改，您可以：

1.  克隆此仓库。
2.  修改 `content.js` 或 `manifest.json` 文件。
3.  在浏览器中重新加载扩展程序以查看您的更改。
