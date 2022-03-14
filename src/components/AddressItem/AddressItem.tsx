/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { useRecoilState } from "recoil";
import { Checkbox } from "@tarojs/components";
import { useState } from "react";
import { address, getSingleAddress } from "../../../src/api/address";
import { send_people_store, collect_people_store } from "../../store/people";
import { address_store, address_data_store } from "../../../src/store/address";

import "./AddressItem.scss";

interface address {
  is_default: string;
  address_id: string;
  name: string;
  phone_number: string;
  region: string;
  location: string;
  is_select: Boolean;
  style: string | undefined;
}
const AddressItem = (props: address) => {
  const [showCover, setShowCover] = useState(false);
  // const [isSelect, setIsSelect] = useState(false);
  const [addressId, setAddressId] = useRecoilState(address_store);
  const [addressData, setAddressData] = useRecoilState(address_data_store);
  const [sendPeople, setSendPeople] = useRecoilState(send_people_store);
  const [collectPeople, setCollectPeople] =
    useRecoilState(collect_people_store);
  // const handleCheckbox = () => {
  //   setIsSelect((prev) => {
  //     return !prev;
  //   });
  // };
  const handleAddress = (type) => {
    return () => {
      setAddressId((prev) => {
        return { ...prev, [type]: address_id };
      });
      getSingleAddress(address_id).then((res) => {
        const { location, region, name, phone_number } = res.data.data;
        const regionResult = region.split(",");
        type == "sendId"
          ? setSendPeople({
              phone: phone_number,
              region: regionResult,
              name: name,
              address: location,
            })
          : setCollectPeople({
              phone: phone_number,
              region: regionResult,
              name: name,
              address: location,
            });
      });
    };
  };
  const {
    is_default,
    address_id,
    name,
    phone_number,
    region,
    location,
    is_select,
    style,
  } = props;
  return (
    <view className="address-item-wrap">
      <view
        className="show-wrap"
        onClick={() => {
          // console.log("zx");
          style === "send"
            ? handleAddress("sendId")()
            : handleAddress("collectId")();
          Taro.switchTab({ url: "/pages/SendDetail/SendDetail" });
        }}
        style={
          is_select
            ? {
                background: "#e8f3ff",
              }
            : {}
        }
      >
        <view className="checkbox-wrap">
          {/* <Checkbox
            checked={isSelect}
            value="选中"
            color="#12d4db"
            className="checkbox"
            onClick={handleCheckbox}
          ></Checkbox> */}
        </view>
        <view className="msg-wrap">
          <view className="name-phone">
            <view className="name">{name}</view>
            <view className="phone">{phone_number}</view>
            {is_default == "True" ? (
              <view className="default-icon">默认</view>
            ) : null}
          </view>
          <view className="location">
            {region}
            {location}
          </view>
        </view>
        <view
          className="operate-wrap"
          onClick={(e) => {
            e.stopPropagation();
            setShowCover(true);
          }}
        ></view>
      </view>
      {showCover ? (
        <view className="cover-wrap">
          <view
            onClick={() => {
              Taro.navigateTo({
                url: "../ChangeAddress/ChangeAddress",
              });
            }}
            className="cover-item edit"
          ></view>
          <view
            className="cover-item delete"
            onClick={() => {
              Taro.showModal({
                title: "提示",
                content: "确认删除？",
                success: function (res) {
                  if (res.confirm) {
                    address("DELETE", address_id).then(() => {
                      //@ts-ignore
                      setAddressData((prev) => {
                        return prev.filter((value: any) => {
                          return value.address_id != address_id;
                        });
                      });
                    });
                    setShowCover(false);
                  } else if (res.cancel) {
                    console.log("用户点击取消");
                  }
                },
              });
            }}
          ></view>
          <view
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              setShowCover(false);
            }}
          ></view>
        </view>
      ) : null}
    </view>
  );
};
export default AddressItem;
