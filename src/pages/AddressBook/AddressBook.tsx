/* eslint-disable jsx-quotes */
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import AddressItem from "../../components/AddressItem/AddressItem";
import { getAllAddress } from "../../api/address";
import "./AddressBook.scss";

const AddressBook = () => {
  useEffect(() => {
    getAllAddress().then((res) => {
      // console.log(res);
    });
  }, []);
  return (
    <view>
      <Header title="地址簿"></Header>
      <view className="address-book-wrap">
        <AddressItem></AddressItem>
      </view>
    </view>
  );
};
export default AddressBook;
