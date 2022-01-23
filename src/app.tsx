/* eslint-disable import/first */
import { Component } from "react";
import Taro from "@tarojs/taro";
import { RecoilRoot } from "recoil";
import "./app.scss";
// import "taro-ui/dist/style/index.scss";

class App extends Component {
  componentDidMount() {
    if (!global.Window) {
      Object.defineProperty(global, "Window", {
        value: window.constructor,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面

  render() {
    return <RecoilRoot>{this.props.children}</RecoilRoot>;
  }
}

export default App;
