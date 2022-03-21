/* eslint-disable jsx-quotes */
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { getOpenId, login } from "../../api/user";
import "./Login.scss";

const Login = () => {
  const [selected, setSelected] = useState({
    rider: true,
    customer: false,
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
  useEffect(() => {
    getOpenId();
  }, []);
  return (
    // <view className="login-wrap">
    //   <view className="title" style={{ letterSpacing: "3px" }}>
    //     请选择登录类型
    //   </view>
    //   <view className="options">
    //     <view
    //       className={admin ? "selected option" : "option"}
    //       onClick={handleSelect("admin")}
    //       style={
    //         !admin
    //           ? {
    //               background: "#f98981",
    //             }
    //           : {
    //               background: "#f53f3f",
    //             }
    //       }
    //     >
    //       管理员
    //     </view>
    //     <view
    //       className={rider ? "selected option" : "option"}
    //       onClick={handleSelect("rider")}
    //       style={
    //         !rider
    //           ? {
    //               background: "#4cd263",
    //             }
    //           : {
    //               background: "#00b42a",
    //             }
    //       }
    //     >
    //       骑手
    //     </view>
    //     <view
    //       className={customer ? "selected option" : "option"}
    //       onClick={handleSelect("customer")}
    //       style={
    //         !customer
    //           ? {
    //               background: "#6aa1ff",
    //             }
    //           : {
    //               background: "#165dff",
    //             }
    //       }
    //     >
    //       普通用户
    //     </view>
    //   </view>

    //   <view className="login" onClick={handleSubmit}>
    //     登录
    //   </view>
    // </view>
    <view className="login-wrap">
      <view className="login-title"></view>
      <view className="number">+86 182****7721</view>
      <view className="button-wrap">
        <view
          onClick={handleSelect("customer")}
          style={
            customer
              ? {}
              : {
                  background: "#ff5678",
                  color: "white",
                }
          }
          className="user-btn btn-item"
        >
          用户
        </view>
        <view
          onClick={handleSelect("rider")}
          style={
            rider
              ? {}
              : {
                  background: "#ff5678",
                  color: "white",
                }
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
