/* eslint-disable jsx-quotes */
import React, { useState, useMemo, useContext, useEffect } from "react";
import "./Tabs.scss";

interface contextInterface {
  selectedIndex?: any;
  setSelectedIndex?: any;
}
interface childrenInterface {
  children?: any;
  isSelected?: any;
  onClick?: any;
}
const TabsContext = React.createContext<contextInterface>({});
export const Tabs = ({ children, defaultIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    typeof defaultIndex === "number" ? defaultIndex : 0
  );
  const context = useMemo(
    () => ({ selectedIndex, setSelectedIndex }),
    [selectedIndex, setSelectedIndex]
  );
  return (
    <view className="tabs">
      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </view>
  );
};
export const TabList = ({ children, onTabClick }) => {
  const context = useContext(TabsContext);
  useEffect(() => {
    console.log(context.selectedIndex);
    console.log(onTabClick);
    onTabClick(context.selectedIndex);
  }, [context.selectedIndex]);
  return (
    <view className="tablist">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => {
            context.setSelectedIndex(index);
          },
          isSelected: index === context.selectedIndex,
        });
      })}
    </view>
  );
};
export const Tab = ({ onClick, children, isSelected }: childrenInterface) => {
  const className = (
    isSelected ? ["tab-list-item"].concat("selected") : ["tab-list-item"]
  ).join(" ");

  return (
    <view className={className} onClick={onClick}>
      {children}
    </view>
  );
};
export const TabPanels = ({ children }) => {
  const context = useContext(TabsContext);

  return (
    <view className="tabpanels">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isSelected: index === context.selectedIndex,
        });
      })}
    </view>
  );
};

export const TabPanel = ({ children, isSelected }: childrenInterface) => {
  if (!isSelected) return null;
  return <view className="tab-panel-item">{children}</view>;
};
