import { atom } from "recoil";

export const address_store = atom({
  key: "addressId",
  default: {
    sendId: "",
    collectId: "",
  },
});
