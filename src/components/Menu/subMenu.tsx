import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className, mode }) => {
  const context = useContext(MenuContext);
  // 类型断言
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpen);

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  // mouseEnter\mouseLeave
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    timer && clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    });
  };
  // onClick\onMouseEnter
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick
        }
      : {};
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          }
        }
      : {};
  // 在菜单容器上绑定mouseEnter事件
  const hoverEnterEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          }
        }
      : {};
  // 在二级菜单上绑定mouseLeave事件
  const hoverLeaveEvents =
    context.mode !== 'vertical'
      ? {
          onMouseLeave: (e: React.mouseLeave) => {
            handleMouse(e, false);
          }
        }
      : {};
  const renderChildren = () => {
    console.log('222333');

    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.name === 'MenuItem') {
        // return childElement;
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warnig: SubMenu has a child which is not a MenuItem component');
      }
    });
    // return <ul className={subMenuClasses}>{childrenComponent}</ul>;
    return (
      <ul className={subMenuClasses} {...hoverLeaveEvents}>
        {childrenComponent}
      </ul>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEnterEvents}>
      {/* <li key={index} className={classes} {...hoverEvents}> */}
      {/* <div className="submenu-title" onClick={handleClick}>{title}</div> */}
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

export default SubMenu;
