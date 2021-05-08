import React, { useState, createContext, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem';

type content = number | string;
// type content = number;
type SelectCallback = (selectedIndex: number, content: content) => void;

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  type?: string;
  onSelect?: SelectCallback;
}

interface ITabsContext {
  index: number;
  type?: string;
  onSelect: SelectCallback;
  getHeight?: SelectCallback;
}

export const TabsContext = createContext<ITabsContext>();

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, className, type, onSelect, children } = props;

  const [currentActive, setActive] = useState(defaultIndex);
  const [isAdded, setAdded] = useState(false);
  const classes = classNames('viking-tabs', {
    card: type === 'card',
    default: !type
  });

  const handleClick = (index: number, content: content) => {
    setActive(index);
    if (onSelect) {
      onSelect(content);
    }
  };

  const tabsRef = useRef();
  const getHeight = (height) => {
    if (!isAdded) {
      const totalHeight = tabsRef.current.offsetHeight + height;
      tabsRef.current.style.height = totalHeight + 'px';
      setAdded(true);
    }
  };
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const passedContext: ITabsContext = {
    index: currentActive ? currentActive : 0,
    type,
    onSelect: handleClick,
    getHeight
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>;
      const { name } = childElement.type;
      if (name === 'TabItem') {
        return React.cloneElement(childElement, { index });
      } else {
        console.error('Warnig: Tabs has a child which is not a TabItem component');
      }
    });
  };

  return (
    <TabsContext.Provider value={passedContext}>
      <div className={classes} ref={tabsRef}>
        {renderChildren()}
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
