/* eslint-disable jsx-quotes */
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { user_info_store } from "../../store/user";
import Header from "../../components/Header/Header";
import "./User.scss";

function User() {
  const [userInfo, setUserInfo] = useRecoilState(user_info_store);
  useEffect(() => {
    console.log(userInfo);
  });
  return (
    <View className="user-wrap">
      <Header title="个人中心"></Header>
      <View className="head-wrap">
        <View className="avatar-wrap">
          <View
            className="avatar"
            style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}
          ></View>
        </View>
        <View className="function-wrap">
          <View
            className="function-item"
            onClick={() => {
              Taro.navigateTo({
                url: "../AddressBook/AddressBook",
              });
            }}
          >
            <View className="icon-wrap">
              <View className="item-inner inner1"></View>
            </View>
            <View className="item-title">地址</View>
          </View>
          <View className="function-item">
            <View className="icon-wrap">
              <View className="item-inner inner2"></View>
            </View>
            <View className="item-title">电话</View>
          </View>
          <View className="function-item">
            <View className="icon-wrap">
              <View className="item-inner inner3"></View>
            </View>
            <View
              className="item-title"
              onClick={() => {
                Taro.switchTab({
                  url: "pages/index/index",
                });
              }}
            >
              订单
            </View>
          </View>
          <View className="function-item">
            <View className="icon-wrap">
              <View className="item-inner inner4"></View>
            </View>
            <View className="item-title">招聘</View>
          </View>
        </View>
      </View>
      <View className="bottom-wrap">
        <View className="bottom-item">
          <View className="item-icon icon1"></View>
          <View className="item-msg">
            <View className="msg-detail">帮助与反馈</View>
            <View className="msg-left"></View>
          </View>
        </View>
        <View className="bottom-item">
          <View className="item-icon icon2"></View>
          <View className="item-msg">
            <View className="msg-detail">关于我们</View>
            <View className="msg-left"></View>
          </View>
        </View>
        <View className="bottom-item">
          <View className="item-icon icon3"></View>
          <View className="item-msg">
            <View className="msg-detail">更新日志</View>
            <View className="msg-left"></View>
          </View>
        </View>
      </View>
      <view
        className="submit"
        onClick={() => {
          Taro.navigateTo({
            url: "../Login/Login",
          });
        }}
      >
        退出登陆
      </view>
    </View>
  );
}

export default User;
