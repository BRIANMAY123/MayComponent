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
      percent,
      strokeHeight=15,
      showText=true,
      styles,
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