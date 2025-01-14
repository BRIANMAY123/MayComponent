import { FC, ReactElement } from "react";
import { inputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<inputProps, "onSelect" | "onChange"> {
    /**
     * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 点击选中建议项时触发的回调*/
    onSelect?: (item: DataSourceType) => void;
    /** 文本框发生改变的时候触发的事件*/
    onChange?: (value: string) => void;
    /**支持自定义渲染下拉项，返回 ReactElement */
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
