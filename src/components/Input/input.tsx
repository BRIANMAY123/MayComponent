import {
    ChangeEvent,
    FC,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import Icon from "../Icon/icon";
import { IconProp } from '@fortawesome/fontawesome-svg-core'//并非icon里面导入
import classNames from "classnames";

type InputSize = "sm" | "lg";
export interface inputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  /**便于父组件拿到e*/
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input=forwardRef<HTMLInputElement,inputProps>((props,ref)=>{
    const {
      //是否禁用 Input
        disabled,
        //设置 input 大小，支持 lg 或者是 sm
        size,
        //添加图标，在右侧悬浮添加一个图标，用于提示
        icon,
        //添加前缀 用于配置一些固定组合
        prepend,
        //添加后缀 用于配置一些固定组合
        append,
        //input 的样式
        style,
          ...restProps
      } = props
      const cnames = classNames('may-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
      })
      const fixControlledValue=(value:any)=>{
         if(typeof value==='undefined'||typeof value===null){
            return ''
         }else return value
      }//处理受控组件
      if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
      }//处理受控组件
    return(
        <div className={cnames} style={style}>
             {prepend && <div className="may-input-group-prepend">{prepend}</div>}
             {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
          <input {...restProps}  className="may-input-inner" disabled={disabled} ref={ref}/>  
          {append && <div className="may-input-group-append">{append}</div>}
        </div>
    )
}  )  
export default Input