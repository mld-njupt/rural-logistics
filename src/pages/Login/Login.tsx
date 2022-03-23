/* eslint-disable jsx-quotes */
import { useCallback, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { useRecoilState } from "recoil";
import { user_info_store } from "../../store/user";
import { getOpenId, login } from "../../api/user";
import "./Login.scss";

const Login = () => {
  const [userInfo,setUserInfo]=useRecoilState(user_info_store)
  const [selected, setSelected] = useState({
    rider: false,
    customer: true,
  });
  
  const handleSelect = (userType: "rider" | "customer") => {
    return () => {
      setSelected((prev) => {
        return {
          rider: false,
          customer: false,
          [userType]: !prev[userType],
        };
      });
    };
  };
  const { rider, customer } = selected;
  const handleSubmit = () => {
    getUserInfo()
    const selectdOption = Object.entries(selected)
      .filter(([key, value]) => {
        return value;
      })
      .map((e) => e[0]);
    if (selectdOption.length == 0) {
      Taro.showToast({
        title: "请先选择用户",
        icon: "none",
        duration: 2000,
      });
    } else {
      login(selectdOption[0]);
    }
  };
  const getUserInfo=useCallback(()=>{
    Taro.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        setUserInfo(res.userInfo )
      }
    })
  },[])
  useEffect(() => {
    getOpenId();
  }, []);
  return (
    <view className="login-wrap">
      <view className="login-title"></view>
      <view className="number">+86 182****7721</view>
      <view className="button-wrap">
        <view
          onClick={handleSelect("customer")}
          style={
            customer
              ? {
                background: "#ff5678",
                color: "white"
              }
              : {}
          }
          className="user-btn btn-item"
        >
          用户
        </view>
        <view
          onClick={handleSelect("rider")}
          style={
            rider
              ? {
                background: "#ff5678",
                color: "white",
              }
              : {}
          }
          className="rider-btn btn-item"
        >
          骑手
        </view>
        <view onClick={handleSubmit} className="submit">
          登陆
        </view>
      </view>
    </view>
  );
};
export default Login;
