import React, { useState, createContext } from 'react';
import classNames from 'classnames';

// 模式——水平/垂直
type MenuMode = 'horizontal' | 'vertical';
// 形参number类型，无返回值
type SelectCallback = (selectedIndex: number) => void;

// 属性——默认索引/类名/模式样式/选择函数
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

// context数据模型
interface IMenuContext {
  index: number;
  onSelect: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>();

// <MenuProps>是React.FC的形参类型
const Menu1: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;

  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  });
  const [currentActive, setActive] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // context类型
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  };

  
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu1;
