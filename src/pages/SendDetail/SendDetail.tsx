/* eslint-disable jsx-quotes */
import { useState } from "react";
import Taro from "@tarojs/taro";
import { Checkbox, Picker, Radio } from "@tarojs/components";
import { useRecoilState } from "recoil";
import Header from "../../components/Header/Header";
import PeopleMsg from "../../components/PeopleMsg/PeopleMsg";
import RLPicker from "../../components/RLPicker/RLPicker";
import { goods_option, time_option } from "../../utils/selector_options";
import { send_people_store, collect_people_store } from "../../store/people";
import { address_store } from "../../store/address";
import { order } from "../../api/order";
import { send_people, collect_people } from "../../utils/base64";
import "./SendDetail.scss";

const SendDetail = () => {
  const [sendPeople, setSendPeople] = useRecoilState(send_people_store);
  const [collectPeople, setCollectPeople] =
    useRecoilState(collect_people_store);
  const [addressId, setAddressId] = useRecoilState(address_store);
  const handleCheckbox = (e) => {
    console.log(e);
  };
  const [logistiConfig, setLogistiConfig] = useState({
    time: "",
    goods: "",
  });
  const handlePickerConfig = (e) => {
    if (e.mpEvent.target.id === "goods") {
      setLogistiConfig({
        ...logistiConfig,
        [e.mpEvent.target.id]: goods_option[e.detail.value],
      });
    } else {
      setLogistiConfig({
        ...logistiConfig,
        [e.mpEvent.target.id]: time_option[e.detail.value],
      });
    }
  };
  const handleSubmit = () => {
    order(addressId.sendId, addressId.collectId).then((res) => {
      console.log(res);
    });
  };
  const {
    phone: sPhone,
    name: sName,
    address: sAddress,
    region: sRegion,
  } = sendPeople;
  const {
    phone: cPhone,
    name: cName,
    address: cAddress,
    region: cRegion,
  } = collectPeople;
  const { goods, time } = logistiConfig;
  let sRegionString = sRegion.join("-");
  let cRegionString = cRegion.join("-");
  // regionString = region.toString();
  const toMsgDetail = (e, style) => {
    if (style === "send") {
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
          title={(sName && sPhone && `${sName} ${sPhone}`) || "寄件人信息"}
          url={send_people}
          address={(sRegionString && `${sRegionString}`) || "点击填写寄件地址"}
          style="send"
          onClick={toMsgDetail}
        ></PeopleMsg>
        <PeopleMsg
          title={(cName && cPhone && `${cName} ${cPhone}`) || "收件人信息"}
          url={collect_people}
          address={(cRegionString && `${cRegionString}`) || "点击填写收件地址"}
          style="collect"
          onClick={toMsgDetail}
        ></PeopleMsg>
      </view>
      <view className="dispose">
        <view className="dispose-item goods">
          <view className="title">物品信息</view>
          <RLPicker
            style={{ width: "200px", height: "48rpx" }}
            range={goods_option}
            handlePicker={handlePickerConfig}
            id="goods"
          >
            <view className="msg">
              <view>{goods ? goods : "请选择物品信息"}</view>
              <view className="right"></view>
            </view>
          </RLPicker>
        </view>
        <view className="dispose-item time">
          <view className="title">期望上门时间</view>
          <RLPicker
            style={{ width: "180px", height: "48rpx" }}
            range={time_option}
            handlePicker={handlePickerConfig}
            id="time"
          >
            <view className="msg">
              <view>{time ? time : "请选择时间段"}</view>
              <view className="right"></view>
            </view>
          </RLPicker>
        </view>
        <view className="dispose-item message">
          <view className="title">给快递员留言</view>
          <view className="msg">
            选填
            <view className="right"></view>
          </view>
        </view>
        <view className="dispose-item price-protection">
          <view className="title">是否保价</view>
          <Checkbox
            onClick={handleCheckbox}
            value="选中"
            color="#12d4db"
            className="msg"
          ></Checkbox>
        </view>
      </view>
      <view onClick={handleSubmit} className="confirm">
        立即下单
      </view>
    </view>
  );
};
export default SendDetail;
