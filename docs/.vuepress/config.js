module.exports = {
  title: "zhousujuan",
  description: "我的个人空间",
  base: "/studyNotes/",
  locales: {
    //设置语言
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "GitHub", link: "https://github.com/zhousujuan" },
    ],
    sidebar: [
      {
        title: "第一章",
        path: "/websoket",
        collapsable: false, // 不折叠
        children: [
          { title: "第一节", path: "/websoket/websoket.md" },
          { title: "第二节", path: "/websoke" },
        ],
      },
    ],
  },
};
