/* eslint-disable jsx-quotes */
import { useRecoilState } from "recoil";
import Taro from "@tarojs/taro";
import { user_order_store } from "../../store/order";
import { deleteOrder } from "../../api/order";
import "./UTransportCard.scss";

enum status {
  "待接单" = 0,
  "配送中" = 1,
  "已送达" = 2,
  "已撤销" = 3,
}
const UDTransportCard = ({ state, mailMsg, receiveMsg, orderId, style }) => {
  const [orderData, setOrderData] = useRecoilState(user_order_store);
  // const [tokenData, setTokenData] = useRecoilState(token_order_store);
  const cancelOrder = () => {
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
    <view className="transportCardContainer">
      <view className="head-wrap">
        <view className="order-wrap">
          <view className="order-title"></view>
          <view className="order-id"></view>
        </view>
        <view className="state-btn"></view>
        <view className="order"></view>
      </view>
      <view className="msg">
        <view className="state">{status[state]}</view>
        <view className="mailMsg">{mailMsg}</view>
        <view className="receiveMsg">{receiveMsg}</view>
      </view>
      {/* <view className="order" onClick={style == "take" ? cancelOrder : () => {}}>
        {style == "take" ? "撤销" : ""}
      </view> */}
    </view>
  );
};
export default UDTransportCard;
