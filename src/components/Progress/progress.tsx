import { FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
  }

  const Progress: FC<ProgressProps> = (props) => {
    const {
      //进度百分比，决定进度条的填充宽度
      percent,
      //进度条的高度，默认为15px
      strokeHeight=15,
      //是否显示进度文本，默认为true
      showText=true,
      //进度条的样式，默认为空
      styles,
      //进度条的主题颜色，默认为primary
      theme='primary',
    } = props
    return (
      <div className="may-progress-bar" style={styles}>
        <div className="may-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
          <div 
            className={`may-progress-bar-inner color-${theme}`}
            style={{width: `${percent}%`}}
          >
            {showText && <span className="inner-text">{`${percent}%`}</span>}
          </div>
        </div>
      </div>
    )
  }

  export default Progress