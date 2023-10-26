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
      {text: "日志", link:"/日志/"},
      { text: "Gitee", link: "https://gitee.com/zhousujuan" },
      { text: "GitHub", link: "https://github.com/zhousujuan" },
    ],
    sidebar: [
      {
        title: "guide",
        path: "/guide/",
        collapsable: false, // 不折叠
      },
      {
        title: "问题集",
        path: "/questions/",
        collapsable: false, // 不折叠
      },
      {
        title: "性能优化",
        path: "/性能优化/",
        collapsable: false, // 不折叠
      },
      {
        title: "websoket",
        path: "/websoket/",
        collapsable: false, // 不折叠
        // children: [
        //   { title: "", path: "/websoket/" },
        // ],
      },
      {
        title: "Node",
        path: "/Node/",
        collapsable: false, // 不折叠
      },
      {
        title: "日志",
        path: "/日志/",
        collapsable: false, // 不折叠
      },
    ],
  },
};
