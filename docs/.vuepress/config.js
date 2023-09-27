module.exports = {
  title: "zhousujuan",
  description: "我的个人空间",
  base: "./",
  locales: {
    //设置语言
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    sidebar: [
      {
        title: "第一章",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "第一节", path: "/" }],
      },
    ],
  },
};
