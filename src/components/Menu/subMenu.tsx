import classNames from "classnames";
import React, { FC, FunctionComponentElement, ReactNode, useContext, useState } from "react";
import { MenuContext } from "./menu";
import MenuItem, { MenuItemProps } from './menuItem'
export interface SubMenuProps {
    index?: string;
    /**下拉菜单选项的文字 */
    title: string;
    /**下拉菜单选型的扩展类名 */
    className?: string;
    children?: ReactNode;
  }

  const SubMenu:FC<SubMenuProps>=({ index, title, children, className})=>{
    const context=useContext(MenuContext)
    const [menuOpen,setOpen]=useState<boolean>(true)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
      })
     const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()//阻止浏览器执行事件的默认动作
        setOpen(!menuOpen)
      }
     let timer:any
     const handleMouse=(e: React.MouseEvent, toggle: boolean)=>{
       clearTimeout(timer)
       e.preventDefault();
       timer = setTimeout(() => {
        setOpen(toggle)
      }, 300)
     }
     const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
      } : {}
     const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
      } : {}
      const renderChildren=()=>{
        const subMenuClasses=classNames('may-submenu',{
            'menu-opened': menuOpen
        })
        const childrenCompontent=React.Children.map(children,(child,i)=>{
            const childElement=child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName==='MenuItem'){
                return(
                    React.cloneElement(childElement,{
                         index: `${index}-${i}`
                    })
                )
            }else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
              }
        })
        return(
            <ul className={subMenuClasses}>
                {childrenCompontent}
            </ul>
        )
     }
     return(
        <ul className={classes} key={index} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </ul>
     )
  }
  SubMenu.displayName = 'SubMenu'
  export default SubMenu