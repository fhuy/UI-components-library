import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  console.log('context2', context);
  console.log('xx', MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  };

  return (
    <MenuContext.Consumer>
      {(context) => (
        <li className={classes} style={style} onClick={handleClick}>
          {/* {context.index} */}
          {children}
        </li>
      )}
    </MenuContext.Consumer>
  );
};

export default MenuItem;

/**
 * 父组件provider value(include index&&onSelect)
 * 子组件consumer && onClick(自定义handleClick，传递index给父组件的onSelect)
 * 父组件的onSelect也是个自定义的handleClick，传递index给父组件上的onSelect属性 && setActive
 * setActive改变currentActive，改变passedContext -> index
 */