/* eslint-disable jsx-quotes */
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "../../components/Tab/Tabs";
import Header from "../../components/Header/Header";
import TransportCard from "../../components/TransportCard/TransPortCard";
import "./index.scss";

const Index = () => {
  return (
    <view>
      <Header title="首页"></Header>
      <view className="indexContainer">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>收件记录</Tab>
            <Tab>寄件记录</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  <TransportCard
                    state="运输中"
                    goodsMsg="天猫 | 【官方旗舰店】深入浅出Node.js朴灵原创Node.js开发实战详解"
                    transportMsg="圆通速递：北京是海淀区复兴路公司 已揽收"
                  ></TransportCard>
                </view>
              </ScrollView>
            </TabPanel>
            <TabPanel>TabContent 1</TabPanel>
          </TabPanels>
        </Tabs>
      </view>
    </view>
  );
};
export default Index;
