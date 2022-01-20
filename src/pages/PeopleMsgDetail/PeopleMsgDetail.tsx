/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { useState } from "react";
import { Input, Button, ScrollView, Textarea } from "@tarojs/components";
import Header from "../../components/Header/Header";
import { send_people, collect_people } from "../../utils/base64";

import "./PeopleMsgDetail.scss";

const PeopleMsgDetail = () => {
  const getPhoneNumber = (e) => {
    console.log(e.detail.code);
  };
  const [msgState, setMsgState] = useState(
    Taro.getCurrentInstance().router?.params.style
      ? Taro.getCurrentInstance().router?.params.style
      : "send"
  );
  return (
    <view>
      <Header
        title={msgState === "send" ? "寄件人信息" : "收件人信息"}
      ></Header>
      <view className="peopleMsgDetailContainer">
        <view className="head">
          <view
            className="icon"
            style={{
              width: 40,
              height: 40,
              background: `url('${
                msgState === "send" ? send_people : collect_people
              }')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%,100%",
              marginLeft: 10,
            }}
          ></view>
          <view className="title">
            {msgState === "send" ? "寄件人信息" : "收件人信息"}
          </view>
        </view>
        <view className="information">
          <view className="info-item">
            <view className="item-label">姓名</view>
            <view className="item-content">
              <Input
                placeholder="请输入姓名"
                placeholderStyle="color:#d8d6d6"
              ></Input>
            </view>
          </view>
          <view className="info-item">
            <view className="item-label">手机号</view>
            <view className="item-content item-phone">
              <Input
                placeholder="请输入手机号"
                placeholderStyle="color:#d8d6d6"
                maxlength={11}
              ></Input>
              <view className="getTel">
                <Button
                  plain
                  size="mini"
                  openType="getPhoneNumber"
                  onGetPhoneNumber={getPhoneNumber}
                  //   bindgetphonenumber="getPhoneNumber"
                >
                  获取手机号
                </Button>
              </view>
            </view>
          </view>
          <view className="info-item">
            <view className="item-label">地区</view>

            <view className="item-content"></view>
          </view>
          <view className="info-item address">
            <view className="item-label">详细地址</view>
            <view className="item-content">
              <Textarea
                placeholder="请输入详细地址"
                placeholderStyle="color:#d8d6d6"
                style="width:100%;min-height:80px;max-height:80px;line-height:0; "
              ></Textarea>
            </view>
          </view>
          {/* <view className="info-item">
            <view className="item-label"></view>
            <view className="item-content">清空当前信息</view>
          </view> */}
        </view>
        <view className="confirm">确认信息</view>
      </view>
    </view>
  );
};
export default PeopleMsgDetail;
