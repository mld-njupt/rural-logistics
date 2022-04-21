/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { oneOrder } from "../../api/order";
import Header from "../../components/Header/Header";
import "./TransportDetail.scss";

function TransportDetail() {
  const [orderDetail,setOrderDetail]=useState<any>()
  useEffect(()=>{
    const orderId=Taro.getCurrentInstance().router?.params.id as string
    oneOrder(orderId).then((res)=>{
      setOrderDetail(()=>{
        return res.data.data
      })
    })
  },[])
  useEffect(()=>{
    console.log(orderDetail)
  },[orderDetail])
  return (
    <view>
      <Header title="详细信息"></Header>
      <View className="ApplicationForm">
        <View
          className="card"
          style={{
            // backgroundImage: `url(${cardBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "294rpx 334rpx",
            backgroundPosition: "bottom right",
          }}
        >
          <View className="card-top">
            <View className="card-title">订单信息</View>
          </View>
          <View className="card-item">
            <View className="item-label">姓名</View>
            <View className="item-content">{orderDetail&&orderDetail.receive_address[0]&&orderDetail.receive_address[0].name}</View>
          </View>
          <View className="card-item">
            <View className="item-label">地区</View>
            <View className="item-content">{orderDetail&&orderDetail.receive_address[0]&&orderDetail.receive_address[0].region}</View>
          </View>
          <View className="card-item">
            <View className="item-label">创建时间</View>
            <View className="item-content">2022-4-10  08:35</View>
          </View>
          <View className="card-item">
            <View className="item-label">电话号码</View>
            <View className="item-content">{orderDetail&&orderDetail.receive_address[0]&&orderDetail.receive_address[0].phone_number}</View>
          </View>
          <View className="card-item">
            <View className="item-label">详细地址</View>
            <View className="item-content">{orderDetail&&orderDetail.receive_address[0]&&orderDetail.receive_address[0].location}</View>
          </View>
        </View>
      </View>
    </view>
  );
}

export default TransportDetail;
