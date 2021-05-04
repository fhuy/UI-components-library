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
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>();

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  console.log('children', children);

  const [currentActive, setActive] = useState(defaultIndex);
  console.log(`currentActive:${currentActive}, setActive:${setActive}`);

  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    console.log(`接收到的index：${index}`);

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
    console.log('react-children', React.Children);

    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      console.log('single-child', child);

      const { name } = childElement.type;
      console.log('name', name);

      if (name === 'MenuItem' || name === 'SubMenu') {
        console.log('clone-after', React.cloneElement(childElement));
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
