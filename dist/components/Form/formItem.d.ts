import { FC, ReactNode } from "react";
import { CustomRule } from "./useStore";
export interface formItemProps {
    name: string;
    label?: string;
    children?: ReactNode;
    /**子节点的值的属性，如 checkbox 的是 'checked' */
    valuePropName?: string;
    /**设置收集字段值变更的时机 */
    trigger?: string;
    /**设置如何将 event 的值转换成字段值 */
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validateTrigger?: string;
}
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export declare const FormItem: FC<formItemProps>;
export default FormItem;
