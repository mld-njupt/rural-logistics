/* eslint-disable jsx-quotes */
import Header from "../../components/Header/Header";
import AddressItem from "../../components/AddressItem/AddressItem";
import "./AddressBook.scss";

const AddressBook = () => {
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
