/* eslint-disable jsx-quotes */
import { useEffect, useState } from "react";
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
import TransportCard from "../../components/TransportCard/TransPortCard";
import { untake_order_store, token_order_store } from "../../store/order";
import { released_order } from "../../api/order";
import "./RiderIndex.scss";

const RiderIndex = () => {
  const [orderData, setOrderData] = useRecoilState(untake_order_store);
  const [tokenData, setTokenData] = useRecoilState(token_order_store);
  const [showNo, setShowNo] = useState(0);
  useEffect(() => {
    released_order("1", "10", 0).then((res) => {
      setOrderData(res.data.data);
    });
    released_order("1", "10", 1).then((res) => {
      setTokenData(res.data.data);
    });
  }, [showNo]);
  const handleClickTab = (e) => {
    console.log(e);
    setShowNo(e);
  };
  return (
    <view>
      <Header title=""></Header>
      <view className="indexContainer">
        <Tabs defaultIndex={0}>
          <TabList onTabClick={handleClickTab}>
            <Tab>待接订单</Tab>
            <Tab>已接订单</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  {orderData.map((value: any, index) => {
                    return (
                      <TransportCard
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
                      ></TransportCard>
                    );
                  })}
                </view>
              </ScrollView>
            </TabPanel>
            <TabPanel>
              <ScrollView scrollY scrollWithAnimation scrollTop={0}>
                <view className="transportCardList">
                  {tokenData.map((value: any, index) => {
                    return (
                      <TransportCard
                        style="token"
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
                      ></TransportCard>
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
export default RiderIndex;
