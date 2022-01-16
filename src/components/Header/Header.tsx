/* eslint-disable jsx-quotes */

import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import "./Header.scss";

export default function Header(props: { title }) {
  const [sysTop, setSysTop] = useState([
    88, // 总高度
    44, // 状态栏高度
    44, // 标题栏高度
  ]);
  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setSysTop([
          res.statusBarHeight + (res.system.indexOf("iOS") === -1 ? 48 : 44),
          res.statusBarHeight,
          res.system.indexOf("iOS") === -1 ? 48 : 44,
        ]);
      },
    });
  }, []);
  return (
    <View
      className="Header"
      style={{
        height: String(sysTop[0] + 10) + "px",
        paddingTop: String(sysTop[1]) + "px",
      }}
    >
      <View
        className="userState"
        onClick={() => {
          // if (props.userState) {
          //   Taro.redirectTo({
          //     url: "../index/index",
          //   });
          // } else{}
          Taro.navigateBack();
        }}
      ></View>

      <View
        className="title"
        style={{
          height: String(sysTop[2]) + "px",
          lineHeight: String(sysTop[2]) + "px",
        }}
      >
        {props.title}
      </View>
      <View className="header-line"></View>
    </View>
  );
}
