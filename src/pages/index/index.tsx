/* eslint-disable jsx-quotes */
import { useState } from "react";
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
                  <TransportCard></TransportCard>
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
