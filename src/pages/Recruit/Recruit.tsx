/* eslint-disable jsx-quotes */
import { ScrollView } from "@tarojs/components";
import { useState } from "react";
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "../../components/Tab/Tabs";
import Header from "../../components/Header/Header";
import RecruitCard from "../../components/RecruitCard/RecruitCard";
import "./Recruit.scss";

const Reruit = () => {
  return (
    <view>
      <Header title="招聘中心"></Header>
      <view className="recruitContainer">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>附近工作</Tab>
            <Tab>热门简职</Tab>
            <Tab>最新发布</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="recruitCardList">
                  <RecruitCard
                    title="鼓楼区派件"
                    address="栖霞区"
                    salary="10元"
                    name="王先生"
                    from="栖霞区乡村小站"
                  ></RecruitCard>
                </view>
              </ScrollView>
            </TabPanel>
            <TabPanel>TabContent 1</TabPanel>
            <TabPanel>TabContent 2</TabPanel>
          </TabPanels>
        </Tabs>
      </view>
    </view>
  );
};
export default Reruit;
