import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertival';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  // onSelect?: (selectedIndex: number) => void;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>();

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  console.log('children', children);

  const [currentActive, setActive] = useState(defaultIndex);
  console.log(`currentActive:${currentActive}, setActive:${setActive}`);

  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'veertical'
  });
  const handleClick = (index: number) => {
    console.log(`接收到的index：${index}`);

    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  };

  const renderChildren = () => {
    console.log('react-children', React.Children);

    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      console.log('single-child', child);

      const { name } = childElement.type;
      console.log('name', name);

      if (name === 'MenuItem') {
        console.log(
          'clone-after',
          React.cloneElement(childElement)
        );
        return React.cloneElement(childElement, {
          index
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
  defaultIndex: 0,
  mode: 'horizontal'
};

export default Menu;
