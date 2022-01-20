export default {
  pages: [
    "pages/index/index",
    "pages/SendDetail/SendDetail",
    "pages/Recruit/Recruit",
    "pages/PeopleMsgDetail/PeopleMsgDetail",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    color: "#8a8a8a",
    selectedColor: "#12d4db",
    list: [
      {
        pagePath: "pages/index/index",
        text: "收件",
        // 未点击时显示的图片
        iconPath: "assets/collect.png",
        // 点击后显示的图片
        selectedIconPath: "assets/collect_selected.png",
      },
      {
        pagePath: "pages/SendDetail/SendDetail",
        text: "寄件",
        iconPath: "assets/send.png",
        selectedIconPath: "assets/send_selected.png",
      },
      {
        pagePath: "pages/Recruit/Recruit",
        text: "招聘中心",
        iconPath: "assets/recruit.png",
        selectedIconPath: "assets/recruit_selected.png",
      },
    ],
  },
};
