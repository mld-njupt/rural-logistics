/* eslint-disable jsx-quotes */
import "./TransportCard.scss";

const TransportCard = () => {
  return (
    <view className="transportCardContainer">
      <view className="image"></view>
      <view className="msg">
        <view className="state"></view>
        <view className="goodsMsg"></view>
        <view className="transportMsg"></view>
      </view>
    </view>
  );
};
export default TransportCard;
