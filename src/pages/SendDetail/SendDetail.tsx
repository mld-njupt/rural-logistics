/* eslint-disable jsx-quotes */
import "./SendDetail.scss";
import Header from "../../components/Header/Header";
import PeopleMsg from "../../components/PeopleMsg/PeopleMsg";
import { send_people, collect_people } from "../../utils/base64";

const SendDetail = () => {
  return (
    <view className="sendDetailContainer">
      <Header title="寄快递"></Header>
      <view className="sendMsg">
        <PeopleMsg
          title="寄件人信息"
          url={send_people}
          address="点击填写寄件地址"
        ></PeopleMsg>
        <view className="divide"></view>
        <PeopleMsg
          title="收件人信息"
          url={collect_people}
          address="点击填写收件地址"
        ></PeopleMsg>
      </view>
      <view className="goods">
        <view className="title">物品信息</view>
      </view>
    </view>
  );
};
export default SendDetail;
