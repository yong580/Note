window.$docsify = {
  name: "Tree", // 目录的标题
  repo: repoLink, // 右上角的挂件
  loadNavbar: "NAVIGATION.md",
  loadSidebar: "SUMMARY.md",
  alias: {
    "/.*/NAVIGATION.md": "/NAVIGATION.md",
  },
  subMaxLevel: 3, // 子目录最大层级, 有助于显示 markdown 的层级
  auto2top: true, // 自动跳转至顶部
  markdown: {
    renderer: {
      code: function (code, lang) {
        const trans = docsifyRender.code?.[lang];
        return trans === undefined
          ? this.origin.code.apply(this, arguments)
          : trans(code);
      },
    },
  },
  plugins: docsifyPlugins,
};
