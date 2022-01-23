import { atom } from "recoil";

export const send_people_store = atom({
  key: "sendPeople", // unique ID (with respect to other atoms/selectors)
  default: {
    phone: "",
    name: "",
    address: "",
    region: [],
  }, // default value (aka initial value)
});
export const collect_people_store = atom({
  key: "collectPeople",
  default: {
    phone: "",
    name: "",
    address: "",
    region: [],
  },
});
