import { atom } from "recoil";

//存放地址id
export const address_store = atom({
  key: "addressId",
  default: {
    sendId: "",
    collectId: "",
  },
});
//存放地址列表数据
export const address_data_store = atom({
  key: "addressData",
  default: [],
});
