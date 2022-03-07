/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import {
  Input,
  Button,
  View,
  Textarea,
  Picker,
  Checkbox,
} from "@tarojs/components";
import Header from "../../components/Header/Header";
import { address } from "../../api/address";
import { debounce } from "../../utils/debounce";
import "./ChangeAddress.scss";

const PeopleMsgDetail = () => {
  const getPhoneNumber = (e) => {
    console.log(e.detail.code);
  };
  const [isDefault, setIsDefault] = useState(false);
  const [people, setPeople] = useState({
    phone: "",
    name: "",
    address: "",
    region: [],
  });
  const handlePeopleMsg = debounce(handleInput, 500);
  function handleInput(e) {
    setPeople({ ...people, [e.mpEvent.target.id]: e.detail.value });
  }
  const handleCheckbox = () => {
    setIsDefault((prev) => {
      return !prev;
    });
  };
  const handleConfirm = () => {
    address(
      "PATCH",
      isDefault,
      people.name,
      people.phone,
      people.region.toString(),
      people.address
    );
    // Taro.navigateTo({
    //   url: `/pages/Address/Address`,
    // });
  };

  return (
    <view>
      <Header title="修改地址"></Header>
      <view className="peopleMsgDetailContainer">
        <view className="information">
          <view className="info-item">
            <view className="item-label">姓名</view>
            <view className="item-content">
              <Input
                id="name"
                placeholder="请输入姓名"
                placeholderStyle="color:#d8d6d6"
                onInput={handlePeopleMsg}
              ></Input>
            </view>
          </view>
          <view className="info-item">
            <view className="item-label">手机号</view>
            <view className="item-content item-phone">
              <Input
                id="phone"
                placeholder="请输入手机号"
                placeholderStyle="color:#d8d6d6"
                maxlength={11}
                onInput={handlePeopleMsg}
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

            <view className="item-content">
              <Picker
                id="region"
                mode="region"
                onChange={handlePeopleMsg}
                value={[]}
                style={{
                  height: "50%",
                  marginTop: "10px",
                  color: "#d8d6d6",
                  width: "400rpx",
                }}
                // disabled={props.disabled}
              >
                {people.region[0] && people.region[1] && people.region[2] ? (
                  <>
                    <View
                      style={{
                        display: "inline",
                      }}
                    >
                      {people.region[0]}
                    </View>
                    -
                    <View
                      style={{
                        display: "inline",
                      }}
                    >
                      {people.region[1]}
                    </View>
                    -
                    <View
                      style={{
                        display: "inline",
                      }}
                    >
                      {people.region[2]}
                    </View>
                  </>
                ) : (
                  "请选择目的地区"
                )}
              </Picker>
            </view>
          </view>
          <view className="info-item address">
            <view className="item-label">详细地址</view>
            <view className="item-content">
              <Textarea
                id="address"
                placeholder="请输入详细地址"
                placeholderStyle="color:#d8d6d6"
                style="width:100%;min-height:80px;max-height:80px;line-height:0; "
                onInput={handlePeopleMsg}
              ></Textarea>
            </view>
          </view>
          {/* <view className="info-item">
            <view className="item-label"></view>
            <view className="item-content">清空当前信息</view>
          </view> */}
        </view>
        <view className="is-default">
          <Checkbox
            checked={isDefault}
            onClick={handleCheckbox}
            value="选中"
            color="#12d4db"
            className="msg"
          ></Checkbox>
          <view>设为默认地址</view>
        </view>
        <view className="confirm" onClick={handleConfirm}>
          确认信息
        </view>
      </view>
    </view>
  );
};
export default PeopleMsgDetail;
