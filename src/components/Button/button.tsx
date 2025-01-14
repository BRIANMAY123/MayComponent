import classNames from "classnames";
import React, { ButtonHTMLAttributes,AnchorHTMLAttributes, FC } from "react"

export type ButtonSize='lg' |'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'


export interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

 export const Button:FC<ButtonProps>=(props)=>{
    const { 
        btnType='default',
        className,
        disabled=false,
        size,
        children,
        href,
        ...restProps
      } = props;
      const classes=classNames('btn',className,{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
      })
    if(btnType==='link'&&href){
        return(
            <a 
            className={classes}
            href={href}
            {...restProps}>
                {children}
            </a>
        )
    }else {
        return(
            <button
            className={classes}
            disabled={disabled}
            {...restProps}
            >
            {children}
            </button>
        )
    }
}

export default Button