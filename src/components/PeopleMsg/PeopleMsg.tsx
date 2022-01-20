/* eslint-disable jsx-quotes */

import "./PeopleMsg.scss";

const PeopleMsg = ({ url, title, address }) => {
  return (
    <view className="peopleMsgContainer">
      <view
        className="icon"
        style={{
          width: 40,
          height: 40,
          background: `url('${url}')`,
          margin: "0 20px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%,100%",
        }}
      ></view>
      <view className="msgDetail">
        <view className="title">{title}</view>
        <view className="address">
          <view className="text">{address}</view>
          <view className="right"></view>
        </view>
      </view>
    </view>
  );
};
export default PeopleMsg;
