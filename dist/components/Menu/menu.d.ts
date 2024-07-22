import React, { FC, CSSProperties, ReactNode } from 'react';
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
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: FC<MenuProps>;
export default Menu;
