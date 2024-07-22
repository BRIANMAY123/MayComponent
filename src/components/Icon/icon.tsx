import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC } from "react";

export type ThemeProps='primary'| 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}

export const Icon:FC<IconProps>=(props)=>{
    const {className,theme,...restProps}=props;
    const classes=classNames('may-icon',className,{
        [`icon-${theme}`]:theme
    })
    return(
       <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon