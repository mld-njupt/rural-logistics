/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro, { navigateTo } from "@tarojs/taro";
import { useRecoilState } from "recoil";
import { ScrollView } from "@tarojs/components";
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "../../components/Tab/Tabs";
import Header from "../../components/Header/Header";
import UTransportCard from "../../components/uTransportCard/UTransPortCard";
import { user_order_store } from "../../store/order";
import { userOrder } from "../../api/order";
import "./index.scss";

const Index = () => {
  const [orderData, setOrderData] = useRecoilState(user_order_store);
  const [showNo, setShowNo] = useState(0);
  useEffect(() => {
    showNo == 0 &&
      userOrder("0").then((res) => {
        setOrderData(res.data.data);
      });
    showNo == 1 &&
      userOrder("1").then((res) => {
        setOrderData(res.data.data);
      });
    showNo == 2 &&
      userOrder("2").then((res) => {
        setOrderData(res.data.data);
      });
  }, [showNo]);
  return (
    <view>
      <Header title="首页"></Header>
      <view className="indexContainer">
        <view className="tags-wrap">
          <view className="collect-tag tag-item">
            <view className="item-inner">
              <view className="item-header">
                <view className="item-title">取件</view>
                <view className="item-right"></view>
              </view>
              <view className="item-text">查看已送达的包裹哟~</view>
            </view>
          </view>
          <view
            onClick={() => {
              navigateTo({
                url: "../SendDetail/SendDetail",
              });
            }}
            className="send-tag tag-item"
          >
            <view className="item-inner">
              <view className="item-header">
                <view className="item-title">寄件</view>
                <view className="item-right"></view>
              </view>
              <view className="item-text">快速寄件，先人一步</view>
            </view>
          </view>
        </view>
        <Tabs defaultIndex={0}>
          <TabList
            onTabClick={(e) => {
              setShowNo(e);
            }}
          >
            <Tab>待接单</Tab>
            <Tab>配送中</Tab>
            <Tab>已送达</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  {orderData.map((value: any, index) => {
                    return (
                      <UTransportCard
                        style="take"
                        key={index}
                        state={value.order_status}
                        orderId={value.order_id}
                        mailMsg={
                          value.mail_address[0] &&
                          value.mail_address[0].location
                        }
                        receiveMsg={
                          value.receive_address[0] &&
                          value.receive_address[0].location
                        }
                      ></UTransportCard>
                    );
                  })}
                </view>
              </ScrollView>
            </TabPanel>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  {orderData.map((value: any, index) => {
                    return (
                      <UTransportCard
                        style=""
                        key={index}
                        state={value.order_status}
                        orderId={value.order_id}
                        mailMsg={
                          value.mail_address[0] &&
                          value.mail_address[0].location
                        }
                        receiveMsg={
                          value.receive_address[0] &&
                          value.receive_address[0].location
                        }
                      ></UTransportCard>
                    );
                  })}
                </view>
              </ScrollView>
            </TabPanel>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  {orderData.map((value: any, index) => {
                    return (
                      <UTransportCard
                        style=""
                        key={index}
                        state={value.order_status}
                        orderId={value.order_id}
                        mailMsg={
                          value.mail_address[0] &&
                          value.mail_address[0].location
                        }
                        receiveMsg={
                          value.receive_address[0] &&
                          value.receive_address[0].location
                        }
                      ></UTransportCard>
                    );
                  })}
                </view>
              </ScrollView>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </view>
    </view>
  );
};
export default Index;
