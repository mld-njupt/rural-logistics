/* eslint-disable jsx-quotes */
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { untake_order_store, token_order_store } from "../../store/order";
import { takeOrder, confirmOrder } from "../../api/order";
import "./TransportCard.scss";

enum status {
  "待接单" = 0,
  "配送中" = 1,
  "已送达" = 2,
  "已撤销" = 3,
}
const colorJson = {
  0: "#d84c4c",
  1: "#5a6fb2",
  2: "#17ae68",
  3: "#999999",
};
const TransportCard = ({ state, mailMsg, receiveMsg, orderId, style }) => {
  const [orderData, setOrderData] = useRecoilState(untake_order_store);
  const [tokenData, setTokenData] = useRecoilState(token_order_store);
  useEffect(() => {
    console.log(tokenData);
  }, [tokenData]);
  const catchOrder = () => {
    Taro.showModal({
      title: "提示",
      content: "确认接单？",
      success: function (res) {
        if (res.confirm) {
          takeOrder(orderId).then((takeRes) => {
            setOrderData((prev) => {
              return prev.filter((value: any) => {
                return value.order_id != orderId;
              });
            });
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  const tokenOrder = () => {
    Taro.showModal({
      title: "提示",
      content: "确认送达？",
      success: function (res) {
        if (res.confirm) {
          confirmOrder(orderId).then((takeRes) => {
            setTokenData((prev) => {
              return prev.filter((value: any) => {
                return value.order_id != orderId;
              });
            });
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  };
  return (
    <View className="detail-card">
      <View className="card-head">
        <View className="card-border"></View>
        <View className="card-id">{orderId}</View>
        <View
          className="card-state"
          style={{
            // color: `${colorJson[state]}`,
            color: "white",
            backgroundColor: `${colorJson[state]}`,
            border: `solid 1rpx ${colorJson[state]}`,
          }}
        >
          {status[state]}
        </View>
        <View
          className="card-operate"
          onClick={style == "take" ? catchOrder : tokenOrder}
        >
          {style == "take" ? "接单" : "送达"}
        </View>
      </View>

      <View className="card-item">
        <View className="item-label">发送地</View>
        <View className="item-content">{mailMsg}</View>
      </View>
      <View className="card-item">
        <View className="item-label">接收地</View>
        <View className="item-content">{receiveMsg}</View>
      </View>
    </View>
    // <view className="transportCardContainer">
    //   <view className="image"></view>
    //   <view className="msg">
    //     <view className="state">{status[state]}</view>
    //     <view className="mailMsg">{mailMsg}</view>
    //     <view className="receiveMsg">{receiveMsg}</view>
    //   </view>
    //   <view
    //     className="order"
    //     onClick={style == "take" ? catchOrder : tokenOrder}
    //   >
    //     {style == "take" ? "接单" : "送达"}
    //   </view>
    // </view>
  );
};
export default TransportCard;
