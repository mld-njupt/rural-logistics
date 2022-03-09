/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { useRecoilState } from "recoil";
import { Checkbox } from "@tarojs/components";
import { useState } from "react";
import { address_store } from "../../../src/store/address";
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
  const [isSelect, setIsSelect] = useState(false);
  const [addressId, setAddressId] = useRecoilState(address_store);
  const handleCheckbox = () => {
    setIsSelect((prev) => {
      return !prev;
    });
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
          style === "send"
            ? setAddressId((prev) => {
                return { ...prev, sendId: address_id };
              })
            : setAddressId((prev) => {
                return { ...prev, collectId: address_id };
              });
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
          <Checkbox
            checked={isSelect}
            value="选中"
            color="#12d4db"
            className="checkbox"
            onClick={handleCheckbox}
          ></Checkbox>
        </view>
        <view className="msg-wrap">
          <view className="name-phone">
            <view className="name">{name}</view>
            <view className="phone">{phone_number}</view>
            <view className="default-icon">默认</view>
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
          <view className="cover-item delete"></view>
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
