/* eslint-disable jsx-quotes */
import { useRecoilState } from "recoil";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { user_order_store } from "../../store/order";
import { deleteOrder, oneOrder } from "../../api/order";
import "./UTransportCard.scss";

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
const UDTransportCard = ({ state, mailMsg, receiveMsg, orderId, style }) => {
  const [orderData, setOrderData] = useRecoilState(user_order_store);
  // const [tokenData, setTokenData] = useRecoilState(token_order_store);
  const cancelOrder = (e) => {
    e.stopPropagation();
    Taro.showModal({
      title: "提示",
      content: "确认撤销？",
      success: function (res) {
        if (res.confirm) {
          deleteOrder(orderId).then((takeRes) => {
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
  return (
    <View
      className="detail-card"
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/TransportDetail/TransportDetail?id=${orderId}`,
        });
      }}
    >
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
          onClick={style == "take" ? cancelOrder : () => {}}
        >
          {style == "take" ? "撤销" : ""}
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
  );
};
export default UDTransportCard;
