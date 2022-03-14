import { atom } from "recoil";

export const untake_order_store = atom({
  key: "untakeOrder",
  default: [],
});
export const token_order_store = atom({
  key: "tokenOrder",
  default: [],
});
export const user_order_store = atom({
  key: "userOrder",
  default: [],
});
