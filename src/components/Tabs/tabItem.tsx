import React, { useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';

export interface TabItemProps {
  index?: number;
  className?: string;
  label?: number | string;
  disabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { index, className, label, children, disabled } = props;

  const context = useContext(TabsContext);
  const contentRef = useRef();
  useEffect(() => {
    const height = contentRef.current.offsetHeight;
    height && context.getHeight(height);
  });

  const classes = classNames('tab-item', {
    'is-disabled': disabled,
    'is-active': context.index === index
  });

  const handleClick = () => {
    if (context?.onSelect && !disabled) {
      context.onSelect(index, children);
    }
  };

  return (
    // <TabsContext.Consumer>
    <div className={classes}>
      <div className="label" onClick={handleClick}>
        {label}
      </div>
      <div className="content" ref={contentRef}>
        {children}
      </div>
    </div>
    // </TabsContext.Consumer>
  );
};

export default TabItem;
