/* eslint-disable import/first */
import { Component } from "react";
import { RecoilRoot } from "recoil";
import "./app.scss";
// import "taro-ui/dist/style/index.scss";

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面

  render() {
    return <RecoilRoot>{this.props.children}</RecoilRoot>;
  }
}

export default App;
