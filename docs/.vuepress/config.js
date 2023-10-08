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
    displayAllHeaders: true, // 默认值：false
    nav: [
      { text: "Home", link: "/" },
      { text: "Gitee", link: "https://gitee.com/zhousujuan" },
      { text: "GitHub", link: "https://github.com/zhousujuan" },
    ],
    sidebar: [
      {
        title: "guide",
        path: "/guide/",
        collapsable: false, // 不折叠
        children: [
          { title: "前言", path: "/guide/" },
        ],
      },
      {
        title: "websoket",
        path: "/websoket/",
        collapsable: false, // 不折叠
        children: [
          { title: "", path: "/websoket/" },
        ],
      },
      {
        title: "Node",
        path: "/Node/",
        collapsable: false, // 不折叠
      },
    ],
  },
};
