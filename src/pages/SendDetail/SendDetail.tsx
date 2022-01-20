/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { Checkbox, Radio } from "@tarojs/components";
import "./SendDetail.scss";
import Header from "../../components/Header/Header";
import PeopleMsg from "../../components/PeopleMsg/PeopleMsg";
import { send_people, collect_people } from "../../utils/base64";

const SendDetail = () => {
  const handleCheckbox = (e) => {
    console.log(e);
  };
  const toMsgDetail = (e, name) => {
    if (name === "send") {
      Taro.navigateTo({
        url: `/pages/PeopleMsgDetail/PeopleMsgDetail?style=send`,
      });
    } else {
      Taro.navigateTo({
        url: `/pages/PeopleMsgDetail/PeopleMsgDetail?style=collect`,
      });
    }
  };
  return (
    <view className="sendDetailContainer">
      <Header title="寄快递"></Header>
      <view className="sendMsg">
        <PeopleMsg
          title="寄件人信息"
          url={send_people}
          address="点击填写寄件地址"
          name="send"
          onClick={toMsgDetail}
        ></PeopleMsg>
        <PeopleMsg
          title="收件人信息"
          url={collect_people}
          address="点击填写收件地址"
          name="collect"
          onClick={toMsgDetail}
        ></PeopleMsg>
      </view>
      <view className="dispose">
        <view className="dispose-item goods">
          <view className="title">物品信息</view>
          <view className="msg">
            请选择物品信息
            <view className="right"></view>
          </view>
        </view>
        <view className="dispose-item time">
          <view className="title">期望上门时间</view>
          <view className="msg">
            请选择上面信息
            <view className="right"></view>
          </view>
        </view>
        <view className="dispose-item message">
          <view className="title">给快递员留言</view>
          <view className="msg">
            选填
            <view className="right"></view>
          </view>
        </view>
        <view className="dispose-item price-protection">
          <view className="title">是否价保</view>
          {/* <view className="msg">
            选填
            <view className="right"></view>
          </view> */}
          <Checkbox
            onClick={handleCheckbox}
            value="选中"
            color="#12d4db"
            className="msg"
          ></Checkbox>
        </view>
      </view>
      <view className="confirm">立即下单</view>
    </view>
  );
};
export default SendDetail;
