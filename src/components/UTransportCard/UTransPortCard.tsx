/* eslint-disable jsx-quotes */
import { useRecoilState } from "recoil";
import Taro from "@tarojs/taro";
import { untake_order_store, token_order_store } from "../../store/order";
import { takeOrder, confirmOrder } from "../../api/order";
import "./UTransportCard.scss";

enum status {
  "待接单" = 0,
  "配送中" = 1,
  "已送达" = 2,
  "已撤销" = 3,
}
const TransportCard = ({ state, mailMsg, receiveMsg, orderId, style }) => {
  const [orderData, setOrderData] = useRecoilState(untake_order_store);
  const [tokenData, setTokenData] = useRecoilState(token_order_store);
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
    <view className="transportCardContainer">
      <view className="image"></view>
      <view className="msg">
        <view className="state">{status[state]}</view>
        <view className="mailMsg">{mailMsg}</view>
        <view className="receiveMsg">{receiveMsg}</view>
      </view>
      <view
        className="order"
        onClick={style == "take" ? catchOrder : tokenOrder}
      >
        {style == "take" ? "接单" : "送达"}
      </view>
    </view>
  );
};
export default TransportCard;
