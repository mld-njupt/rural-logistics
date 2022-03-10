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
import { useRecoilState, RecoilRoot } from "recoil";
import Header from "../../components/Header/Header";
import { address } from "../../api/address";
import { send_people, collect_people } from "../../utils/base64";
import { send_people_store, collect_people_store } from "../../store/people";
import { address_store } from "../../store/address";
import { debounce } from "../../utils/debounce";
import "./PeopleMsgDetail.scss";

const PeopleMsgDetail = () => {
  const getPhoneNumber = (e) => {
    console.log(e.detail.code);
  };
  const [isDefault, setIsDefault] = useState("False");
  const [msgState, setMsgState] = useState(
    Taro.getCurrentInstance().router?.params.style
      ? Taro.getCurrentInstance().router?.params.style
      : "send"
  );
  const [sendPeople, setSendPeople] = useRecoilState(send_people_store);
  const [collectPeople, setCollectPeople] =
    useRecoilState(collect_people_store);
  const [addressId, setAddressId] = useRecoilState(address_store);
  const [people, setPeople] = useState({
    phone: "",
    name: "",
    address: "",
    region: [],
  });

  const handlePeopleMsg = debounce(handleInput, 500);
  function handleInput(e) {
    setPeople({ ...people, [e.mpEvent.target.id]: e.detail.value });
    // console.log(e);
  }
  const handleCheckbox = () => {
    setIsDefault((prev) => {
      return prev == "False" ? "True" : "False";
    });
  };
  const handleConfirm = () => {
    msgState === "send"
      ? setSendPeople({ ...people })
      : setCollectPeople({ ...people });
    address(
      "POST",
      null,
      isDefault,
      people.name,
      people.phone,
      people.region.toString(),
      people.address
    ).then((res) => {
      console.log(res.data);
      msgState === "send"
        ? setAddressId((prev) => {
            return { ...prev, sendId: res.data.address_id };
          })
        : setAddressId((prev) => {
            return { ...prev, collectId: res.data.address_id };
          });
      // setAddress(res.data.data.addressId);
      Taro.switchTab({
        url: `/pages/SendDetail/SendDetail`,
      });
    });
  };
  // useEffect(() => {
  //   console.log(addressId);
  // }, [addressId]);
  const isDefaultBoolean = isDefault == "False" ? false : true;
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
            checked={isDefaultBoolean}
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
