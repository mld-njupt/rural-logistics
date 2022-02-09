/* eslint-disable jsx-quotes */
import "./TransportCard.scss";

const TransportCard = ({ state, goodsMsg, transportMsg }) => {
  return (
    <view className="transportCardContainer">
      <view className="image"></view>
      <view className="msg">
        <view className="state">{state}</view>
        <view className="goodsMsg">{goodsMsg}</view>
        <view className="transportMsg">{transportMsg}</view>
      </view>
    </view>
  );
};
export default TransportCard;
