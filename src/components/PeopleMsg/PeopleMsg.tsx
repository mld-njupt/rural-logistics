/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import "./PeopleMsg.scss";

const PeopleMsg = ({ url, title, address, onClick, style }) => {
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
        <view className="title-wrap">
          <view className="title">{title}</view>
          <view
            onClick={() => {
              Taro.navigateTo({
                url: "../AddressBook/AddressBook",
              });
            }}
            className="address-book"
          >
            地址簿
          </view>
        </view>
        <view
          onClick={(e) => {
            onClick(e, style);
          }}
          className="address"
        >
          <view className="text">{address}</view>
          <view className="right"></view>
        </view>
      </view>
    </view>
  );
};
export default PeopleMsg;
