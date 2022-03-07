/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { Checkbox } from "@tarojs/components";
import { useState } from "react";
import "./AddressItem.scss";

const AddressItem = () => {
  const [showCover, setShowCover] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const handleCheckbox = () => {
    setIsSelect((prev) => {
      return !prev;
    });
  };
  return (
    <view className="address-item-wrap">
      <view className="show-wrap">
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
            <view className="name">孟令东东</view>
            <view className="phone">18269757721</view>
            <view className="default-icon">默认</view>
          </view>
          <view className="location">谢谢谢谢、</view>
        </view>
        <view
          className="operate-wrap"
          onClick={() => {
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
            onClick={() => {
              setShowCover(false);
            }}
          ></view>
        </view>
      ) : null}
    </view>
  );
};
export default AddressItem;
