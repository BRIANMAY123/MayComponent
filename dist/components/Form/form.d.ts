import { ReactNode } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator";
export type RenderProps = (form: FormState) => ReactNode;
export interface formProps {
    /**表单名称，会作为表单字段 id 前缀使用 */
    name?: string;
    children?: ReactNode | RenderProps;
    /**表单默认值，只有初始化以及重置时生效 */
    initialValues?: Record<string, any>;
    /**提交表单且数据验证成功后回调事件 */
    onFinish?: (values: Record<string, any>) => void;
    /**提交表单且数据验证失败后回调事件 */
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<formProps, 'initialValues'>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;
export declare const FormContext: import("react").Context<IFormContext>;
declare const Form: import("react").ForwardRefExoticComponent<formProps & import("react").RefAttributes<IFormRef>>;
export default Form;
