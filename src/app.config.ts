export default {
  pages: ["pages/index/index", "pages/Send/Send", "pages/Recruit/Recruit"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#8a8a8a",
    selectedColor: "#1296db",
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
        pagePath: "pages/Send/Send",
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
