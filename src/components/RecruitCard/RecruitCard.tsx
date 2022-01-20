/* eslint-disable jsx-quotes */
import { useState } from "react";
import "./RecruitCard.scss";

const RecruitCard = ({ title, address, salary, name, from }) => {
  return (
    <view className="recruitCardContainer">
      <view className="card-line head">
        <view className="card-item title">{title}</view>
        <view className="card-item salary">{salary}/单</view>
      </view>
      <view className="card-line center">
        <view className="card-item from">{from} | 本科 | 无需经验</view>
        <view className="card-item address">{address}</view>
      </view>
      <view className="card-line bottom">
        <view className="card-item name">{name}</view>
        <view className="card-item link">立即联系</view>
      </view>
    </view>
  );
};
export default RecruitCard;
