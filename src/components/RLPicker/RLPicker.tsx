/* eslint-disable jsx-quotes */
import { useEffect, useState } from "react";
import { Picker } from "@tarojs/components";

const RLPicker = (props) => {
  const { range, handlePicker, style, children } = props;
  console.log(props);
  return (
    <Picker
      mode="selector"
      range={range}
      value={0}
      onChange={handlePicker}
      style={style}
    >
      {children}
    </Picker>
  );
};
export default RLPicker;
