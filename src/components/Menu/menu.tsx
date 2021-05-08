import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertival';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  // onSelect?: (selectedIndex: number) => void;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>();

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;

  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      console.dir('kl', childElement.type);

      const { name } = childElement.type;

      if (name === 'MenuItem' || name === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        });

        // return child;
      } else {
        console.error('Warnig: Menu has a child which is not a MenuItem component');
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {/* {children} */}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
};

export default Menu;
