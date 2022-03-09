/* eslint-disable jsx-quotes */
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { useRecoilState } from "recoil";
import Header from "../../components/Header/Header";
import AddressItem from "../../components/AddressItem/AddressItem";
import { address_store } from "../../store/address";
import { getAllAddress } from "../../api/address";
import "./AddressBook.scss";

const AddressBook = () => {
  const [addressData, setAddressData] = useState<any[]>([]);
  const [addressId, setAddressId] = useRecoilState(address_store);
  const style = Taro.getCurrentInstance().router?.params.style;
  const address_id_style =
    style == "send" ? addressId.sendId : addressId.collectId;
  useEffect(() => {
    getAllAddress().then((res) => {
      setAddressData(res.data.data);
    });
  }, []);
  return (
    <view>
      <Header title="地址簿"></Header>
      <view className="address-book-wrap">
        {addressData &&
          addressData.map((value, index) => {
            const {
              is_default,
              address_id,
              name,
              phone_number,
              region,
              location,
            } = value;
            return (
              <AddressItem
                is_default={is_default}
                address_id={address_id}
                name={name}
                phone_number={phone_number}
                region={region}
                location={location}
                key={index}
                is_select={address_id == address_id_style}
                style={style}
              ></AddressItem>
            );
          })}
      </view>
    </view>
  );
};
export default AddressBook;
