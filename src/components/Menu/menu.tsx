import classNames from "classnames";
import React, { FC, useState, createContext, CSSProperties, ReactNode } from 'react'
import { MenuItemProps } from './menuItem'


type MenuMode = "horizontal" | "vertical";
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  /**点击菜单项触发的回调函数 */
  onSelect?: (selectedIndex: string) => void;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
  children?: ReactNode;
}
interface IMenuContext {
    index: string ;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];  
  }
export const MenuContext=createContext<IMenuContext>({index:'0'})
const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode='horizontal',
    style,
    children,
    defaultIndex='0',
    onSelect,
    defaultOpenSubMenus=[],
  } = props;
  const [ currentActive, setActive ] = useState(defaultIndex)
  const handleClick=(index:string)=>{
    setActive(index)
  }
  const passedContext:IMenuContext={
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  //console.log(currentActive)
  const classes=classNames('may-menu',className,{
   'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const renderChildren=()=>{
    return React.Children.map(children,(child,index)=>{
       const childElement=child as React.FunctionComponentElement<MenuItemProps>
       const {displayName}=childElement.type
       if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    }) 
  }
  return <ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
    {renderChildren()}
    </MenuContext.Provider>
  </ul>;
};
export default Menu
