import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FC } from "react";
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
export declare const Icon: FC<IconProps>;
export default Icon;
