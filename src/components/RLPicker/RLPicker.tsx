/* eslint-disable jsx-quotes */
import { useEffect, useState } from "react";
import { Picker } from "@tarojs/components";

const RLPicker = (props) => {
  const { range, handlePicker, style, children, id } = props;
  return (
    <Picker
      mode="selector"
      range={range}
      value={0}
      onChange={handlePicker}
      style={style}
      id={id}
    >
      {children}
    </Picker>
  );
};
export default RLPicker;
